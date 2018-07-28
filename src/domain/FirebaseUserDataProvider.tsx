import firebase from './firebase';
import { UserDataProvider } from './UserDataProvider';
import { User } from './User';
import { observable } from 'mobx';

export class FirebaseUserDataProvider implements UserDataProvider {

    @observable users = Array<User>();
    database: firebase.database.Database;
    usersReference: firebase.database.Reference;
    idPasswordsReference: firebase.database.Reference;

    constructor() {
        this.userAddedFromDatabase = this.userAddedFromDatabase.bind(this);
        this.database = firebase.database();
        this.usersReference = this.database.ref('users');
        this.usersReference.on('child_added', this.userAddedFromDatabase);
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

    getUserForId = async (id: string) => {
        let myUser = new User('Placeholder', 'Placeholder', null, '999');
        let myQuery = this.database.ref('users').orderByKey().equalTo(id);
        await myQuery.once('value').then(function(snapshot: firebase.database.DataSnapshot) {
            snapshot.forEach( (childSnapshot: firebase.database.DataSnapshot) => {
                myUser = new User(childSnapshot.key, childSnapshot.val().name, null, childSnapshot.val().category);
            });
        });
        return myUser;

    }

    validateLogin = async (id: string, password: string) => {
        let isValidLogin = false;
        let myQuery = this.database.ref('id-passwords').orderByChild('id-password').equalTo(id + '-' + password);
        await myQuery.once('value').then(function (snapshot: firebase.database.DataSnapshot) {
            snapshot.forEach(function (childSnapshot: firebase.database.DataSnapshot) {
                // as long as we find one we're good :)
                isValidLogin = true;
                // console.log('child snap key is Steve: ' + childSnapshot.key);
                // childSnapshot.forEach(function(grandchildSnapshot: firebase.database.DataSnapshot) {
                //     console.log('grandchild snapshot key is id-password: ' + grandchildSnapshot.key);
                //     console.log('grandchild value is Steve-password: ' + grandchildSnapshot.val());
                // });
            });
        });
        return isValidLogin;
    }
}