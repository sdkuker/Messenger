import messengerDatabase from './firebase';
import { Database, DatabaseReference, ref, onValue, query, get, push, set, orderByChild, DataSnapshot, equalTo, orderByKey } from 'firebase/database';
import { UserDataProvider } from './UserDataProvider';
import { User } from './User';
import { observable, makeObservable } from 'mobx';

export class FirebaseUserDataProvider implements UserDataProvider {

    users = Array<User>();
    database: Database;
    usersReference: DatabaseReference;
    idLoginAttemptsReference: DatabaseReference;

    constructor() {
        makeObservable(this, {
            users: observable
        });

        this.userAddedFromDatabase = this.userAddedFromDatabase.bind(this);
        this.database = messengerDatabase;
        this.usersReference = ref(this.database, 'users');
        onValue(this.usersReference, this.userAddedFromDatabase);
        //this.usersReference.on('child_added', this.userAddedFromDatabase);
        this.idLoginAttemptsReference = ref(this.database, 'id-loginAttempts');
    }

    getUsersForUserOfCategory = async (aUser: User) => {

        let theReturn = new Array<User>();

        let myQuery = query(ref(this.database, 'users'), orderByChild('category'), equalTo(aUser.category));

        const userListSnapshot = await get(myQuery);

        // onValue(myQuery, userListSnapshot => {
        userListSnapshot.forEach(function (childSnapshot: DataSnapshot) {
                    if (aUser.id !== childSnapshot.key) {
                        var myUser = new User(  childSnapshot.key,
                                                childSnapshot.val().name,
                                                null,
                                                childSnapshot.val().category,
                                                childSnapshot.val().emailAddress,
                                                childSnapshot.val().phoneNumber,
                                                childSnapshot.val().notifyAdminUponLogin,
                                                childSnapshot.val().nofifyConversationParterOfUpdate);
                        theReturn.push(myUser);
                    }
                });
       // })
        //let myQuery = this.usersReference.orderByChild('category').equalTo(aUser.category);
        //
        // await myQuery.once('value').then(function (snapshot: DataSnapshot) {
        //     snapshot.forEach(function (childSnapshot: DataSnapshot) {
        //         if (aUser.id !== childSnapshot.key) {
        //             var myUser = new User(  childSnapshot.key,
        //                                     childSnapshot.val().name,
        //                                     null,
        //                                     childSnapshot.val().category,
        //                                     childSnapshot.val().emailAddress,
        //                                     childSnapshot.val().phoneNumber,
        //                                     childSnapshot.val().notifyAdminUponLogin,
        //                                     childSnapshot.val().nofifyConversationParterOfUpdate);
        //             theReturn.push(myUser);
        //         }
        //     });
        // });

        return theReturn;
    }

    // tslint:disable-next-line
    userAddedFromDatabase = (data: any) => {
        this.users.push(new User(data.key, data.val().name, data.val().password, data.val().category, 
                        data.val().emailAddress, data.val().phoneNumber, data.val().notifyAdminUponLogin, data.val().nofifyConversationParterOfUpdate));
    }

    getUserForId = async (id: string) => {
        let myUser = new User('Placeholder', 'Placeholder', null, '999', null, null, null, null);

        let myQuery = query(ref(this.database, 'users'), orderByKey(), equalTo(id));
        const userListSnapshot = await get(myQuery);
        if (userListSnapshot) {
            userListSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    myUser = new User(childSnapshot.key, childSnapshot.val().name, null, childSnapshot.val().category, 
                    childSnapshot.val().emailAddress, childSnapshot.val().phoneNumber, childSnapshot.val().notifyAdminUponLogin,
                    childSnapshot.val().nofifyConversationParterOfUpdate);
            });
        }
        // let myQuery = this.database.ref('users').orderByKey().equalTo(id);
        // await myQuery.once('value').then(function (snapshot: firebase.database.DataSnapshot) {
        //     snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
        //         myUser = new User(childSnapshot.key, childSnapshot.val().name, null, childSnapshot.val().category, 
        //                 childSnapshot.val().emailAddress, childSnapshot.val().phoneNumber, childSnapshot.val().notifyAdminUponLogin,
        //                 childSnapshot.val().nofifyConversationParterOfUpdate);
        //     });
        // });
        return myUser;

    }

    validateLogin = async (id: string, password: string) => {
        let isValidLogin = false;

        let myQuery = query(ref(this.database, 'id-passwords'), orderByChild('id-password'), equalTo(id + '-' + password));
        const userListSnapshot = await get(myQuery);
        if (userListSnapshot) {
            userListSnapshot.forEach((childSnapshot: DataSnapshot) => {
                // as long as we find one we're good :)
                isValidLogin = true;
            });
        }
        return isValidLogin;
        // let myQuery = this.database.ref('id-passwords').orderByChild('id-password').equalTo(id + '-' + password);
        // await myQuery.once('value').then(function (snapshot: firebase.database.DataSnapshot) {
        //     snapshot.forEach(function (childSnapshot: firebase.database.DataSnapshot) {
        //         // as long as we find one we're good :)
        //         isValidLogin = true;
        //         // console.log('child snap key is Steve: ' + childSnapshot.key);
        //         // childSnapshot.forEach(function(grandchildSnapshot: firebase.database.DataSnapshot) {
        //         //     console.log('grandchild snapshot key is id-password: ' + grandchildSnapshot.key);
        //         //     console.log('grandchild value is Steve-password: ' + grandchildSnapshot.val());
        //         // });
        //     });
        // });
    }

    recordLoginAttempt = async (aUserId: string, aPassword: string, isValid: boolean) => {
        let recordSuccessful = true;

        // const newLoginAttemptRef = this.idLoginAttemptsReference.push();
        const newLoginAttemptRef = push(this.idLoginAttemptsReference);
        // tslint:disable-next-line
        await set(newLoginAttemptRef, {
            userId: aUserId, password: aPassword, wasSuccessfull: isValid, attemptDateTime: new Date().toLocaleString() }, 
        );
        
        // await newLoginAttemptRef.set({ userId: aUserId, password: aPassword, wasSuccessfull: isValid, attemptDateTime: new Date().toLocaleString() }, function (error: any) {
        //     if (error) {
        //         recordSuccessful = false;
        //     }
        // });

        return recordSuccessful;
    }
}