import firebase from './firebase';
import { UserDataProvider } from './UserDataProvider';
import { User } from './User';
import { observable } from 'mobx';

export class FirebaseUserDataProvider implements UserDataProvider {

    @observable users = Array<User>();
    database: firebase.database.Database;
    reference: firebase.database.Reference;

    constructor() {
        this.userAddedFromDatabase = this.userAddedFromDatabase.bind(this);
        this.database = firebase.database();
        this.reference = this.database.ref('users');
        this.reference.on('child_added', this.userAddedFromDatabase);
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

    // tslint:disable-next-line
    userAddedFromDatabase = (data: any) => {
        this.users.push(new User(data.key,  data.val().name, data.val().password, data.val().category));
    }
}