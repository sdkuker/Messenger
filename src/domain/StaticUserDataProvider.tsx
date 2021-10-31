import { UserDataProvider } from './UserDataProvider';
import { User } from './User';
import { observable, computed } from 'mobx';

export class StaticUserDataProvider implements UserDataProvider {

    @observable users: Array<User>;

    constructor(myUsers: Array<User> | null) {
        if (myUsers) {
            this.users = myUsers;
        } else {
            const staticUsers = Array<User>();
            staticUsers.push(new User('1', 'Steve', 'password', '1', 'emailAddress1'));
            staticUsers.push(new User('2', 'Michelle', 'password', '1', 'emailAddress2'));
            staticUsers.push(new User('3', 'Beth', 'password', '1', 'emailAddress3'));
            staticUsers.push(new User('4', 'Category 2 User 1', 'password', '2', 'emailAddress4'));
            staticUsers.push(new User('5', 'Category 2 User 2', 'password', '2', 'emailAddress5'));
            this.users = staticUsers;
        }
    }

    getUsersForUserOfCategory = async (aUser: User)  => {

        let theReturn = new Array<User>();

        this.users.forEach((myUser: User) => {
            if (aUser.category === myUser.category && aUser !== myUser ) {
                theReturn.push(myUser);
            }
        });

        return theReturn;
    }

    getUserForId = async (id: string) => {
        let theReturn = new User('Placeholder', 'Placeholder', null, '999', 'emailAddress1');
        this.users.forEach((myUser: User) => {
            if (id === myUser.id ) {
                theReturn = myUser;
            }
        });
        return theReturn;

    }

    validateLogin = async (id: string, password: string) => {
        let isValidLogin = false;

        this.users.forEach((myUser: User) => {
            if (id === myUser.id && password === myUser.password ) {
                isValidLogin = true;
            }
        });

        return isValidLogin;
    }
}