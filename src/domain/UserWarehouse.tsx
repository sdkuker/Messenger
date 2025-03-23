import { User } from './User';
import { UserDataProvider } from './UserDataProvider';
import { observable, makeObservable } from 'mobx';
import { Conversation } from './Conversation';

export class UserWarehouse {

    dataProvider: UserDataProvider;
    loggedInUser: User;
    partnerUser: User;
    partnerUserLastLoginDate: Date;
    conversation: Conversation;
    users = new Array<User>();

    constructor(mydataProvider: UserDataProvider) {
        makeObservable(this, {
            loggedInUser: observable,
            partnerUser: observable,
            partnerUserLastLoginDate: observable,
            conversation: observable,
            users: observable
        });

        this.dataProvider = mydataProvider;
    }

    recordLoginAttempt = async (id: string, password: string, isValid: boolean) => {

        try {
            await this.dataProvider.recordLoginAttempt(id, password, isValid);
        } catch (error) {
            // eslint-disable-next-line
            alert('got an error recording the login attempt: ' + error);

        }
    }

    setLoggedInUser = async (id: string) => {

        let successfulLogin = false;

        try {
            successfulLogin = true;
            this.loggedInUser = await this.dataProvider.getUserForId(id);
            let myUsers = await this.getUsersForLoggedInUser();
            this.users.push(... myUsers);
            if (this.users.length > 0) {
                this.partnerUser = this.users[0];
                this.conversation = new Conversation(this.loggedInUser, this.partnerUser);
            } else {
                this.conversation = new Conversation(this.loggedInUser, null);
            }
        } catch (error) {
            // eslint-disable-next-line
            alert('got an error setting the logged in user: ' + error);
        }

        return successfulLogin;
    }

    getUsersForLoggedInUser = () => {
        if (this.loggedInUser) {
            return this.dataProvider.getUsersForUserOfCategory(this.loggedInUser);
        } else {
            return new Array<User>();
        }
    }

    setConversationPartner = (partnerName: string) => {

        this.users.forEach((myUser: User) => {
            if (partnerName === myUser.name) {
                this.partnerUser = myUser;
                if (this.conversation) {
                    this.conversation.participantTwo = this.partnerUser;
                } else {
                    this.conversation = new Conversation(this.loggedInUser, this.partnerUser);
                }
            }
        });
    }

    validateLogin = async (id: string, password: string) => {
        let isValid = await this.dataProvider.validateLogin(id, password);
        return isValid;
    }
}