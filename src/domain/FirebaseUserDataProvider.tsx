import firebase from './firebase';
import { UserDataProvider } from './UserDataProvider';
import { User } from './User';
import { observable } from 'mobx';

export class FirebaseUserDataProvider implements UserDataProvider {

    @observable users = Array<User>();
    database: firebase.database.Database;
    usersReference: firebase.database.Reference;
    idLoginAttemptsReference: firebase.database.Reference;

    constructor() {
        this.userAddedFromDatabase = this.userAddedFromDatabase.bind(this);
        this.database = firebase.database();
        this.usersReference = this.database.ref('users');
        this.usersReference.on('child_added', this.userAddedFromDatabase);
        this.idLoginAttemptsReference = this.database.ref('id-loginAttempts');
    }

    getUsersForUserOfCategory = async (aUser: User) => {

        let theReturn = new Array<User>();

        let myQuery = this.database.ref('users').orderByChild('category').equalTo(aUser.category);
        await myQuery.once('value').then(function (snapshot: firebase.database.DataSnapshot) {
            snapshot.forEach(function (childSnapshot: firebase.database.DataSnapshot) {
                if (aUser.id !== childSnapshot.key) {
                    var myUser = new User(  childSnapshot.key,
                                            childSnapshot.val().name,
                                            null,
                                            childSnapshot.val().category,
                                            childSnapshot.val().emailAddress,
                                            childSnapshot.val().phoneNumber);
                    theReturn.push(myUser);
                }
            });
        });

        return theReturn;
    }

    // tslint:disable-next-line
    userAddedFromDatabase = (data: any) => {
        this.users.push(new User(data.key, data.val().name, data.val().password, data.val().category, data.val().emailAddress, data.val().phoneNumber));
    }

    getUserForId = async (id: string) => {
        let myUser = new User('Placeholder', 'Placeholder', null, '999', null, null);
        let myQuery = this.database.ref('users').orderByKey().equalTo(id);
        await myQuery.once('value').then(function (snapshot: firebase.database.DataSnapshot) {
            snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
                myUser = new User(childSnapshot.key, childSnapshot.val().name, null, childSnapshot.val().category, childSnapshot.val().emailAddress, childSnapshot.val().phoneNumber);
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

    recordLoginAttempt = async (aUserId: string, aPassword: string, isValid: boolean) => {
        let recordSuccessful = true;

        const newLoginAttemptRef = this.idLoginAttemptsReference.push();
        // tslint:disable-next-line
        await newLoginAttemptRef.set({ userId: aUserId, password: aPassword, wasSuccessfull: isValid, attemptDateTime: new Date().toLocaleString() }, function (error: any) {
            if (error) {
                recordSuccessful = false;
            }
        });

        return recordSuccessful;
    }
}