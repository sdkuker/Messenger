import { User } from './User';
import { UserDataProvider } from './UserDataProvider';
import { computed, observable } from 'mobx';
import { Conversation } from './Conversation';

export class UserWarehouse {

    dataProvider: UserDataProvider;
    @observable loggedInUser: User;
    @observable partnerUser: User;
    @observable conversation: Conversation;
    @observable users = new Array<User>();

    constructor(mydataProvider: UserDataProvider) {
        this.dataProvider = mydataProvider;
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
            console.log('got an error setting the logged in user: ' + error);
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