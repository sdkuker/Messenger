import { User } from './User';
import { UserDataProvider } from './UserDataProvider';
import { computed, observable } from 'mobx';
import { Conversation } from './Conversation';

export class UserWarehouse {

    dataProvider: UserDataProvider;
    @observable loggedInUser: User;
    @observable partnerUser: User;
    @observable conversation: Conversation;

    constructor(mydataProvider: UserDataProvider) {
        this.dataProvider = mydataProvider;
    }

    @computed
    get users() {
        if (this.loggedInUser) {
            return this.dataProvider.getUsersForUserOfCategory(this.loggedInUser);
        } else {
            return this.dataProvider.users;
        }
    }

    setLoggedInUser = (userName: string, userPassword: string) => {
        // loop through the users collection and find one with the same name
        // if you do, take the one from the collection and make it loggedInUser. 
        // you want to use the same object with the id from the data provider.

        let successfulLogin = false;

        this.users.forEach((myUser: User) => {
            if (userName === myUser.name && userPassword === myUser.password) {
                this.loggedInUser = myUser;
                successfulLogin = true;
                let myUsers = this.getUsersForLoggedInUser();
                if (myUsers && myUsers.length > 0) {
                    this.partnerUser = myUsers[0];
                    this.conversation = new Conversation(this.loggedInUser, this.partnerUser);
                } else {
                    this.conversation = new Conversation(this.loggedInUser, null);
                }
            }
        });

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
}