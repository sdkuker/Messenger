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
            staticUsers.push(new User('1', 'Steve', 'password', '1'));
            staticUsers.push(new User('2', 'Michelle', 'password', '1'));
            staticUsers.push(new User('3', 'Category 2 User 1', 'password', '2'));
            staticUsers.push(new User('4', 'Category 2 User 2', 'password', '2'));
            this.users = staticUsers;
        }
    }

    getUsersForUserOfCategory = (aUser: User)  => {

        let theReturn = new Array<User>();

        this.users.forEach((myUser: User) => {
            if (aUser.category === myUser.category && aUser !== myUser ) {
                theReturn.push(myUser);
            }
        });

        return theReturn;

    }
}