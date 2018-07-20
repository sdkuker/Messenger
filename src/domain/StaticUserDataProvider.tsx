import { UserDataProvider } from './UserDataProvider';
import { User } from './User';
import { observable } from 'mobx';

export class StaticUserDataProvider implements UserDataProvider {

    @observable users: Array<User>;

    constructor(myUsers: Array<User> | null) {
        if (myUsers) {
            this.users = myUsers;
        } else {
            const staticUsers = Array<User>();
            staticUsers.push(new User('1', 'Steve', 'password'));
            staticUsers.push(new User('2', 'Michelle', 'password'));
            this.users = staticUsers;
        }
    }
}