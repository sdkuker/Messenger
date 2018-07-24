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
        console.log('value: ' + data.val().name);
        this.users.push(new User(data.key,  data.val().name, data.val().password, data.val().category));
        // let myUsers = snapshot.val();
        // for (let aUser in myUsers) {
        //     this.users.push(new User(aUser, myUsers[aUser].name, myUsers[aUser].password, myUsers[aUser].category))
        // }

        // let self = this;
        // // tslint:disable-next-line
        // snapshot.forEach(function(childSnapshot: any ) {
        //     let childKey = childSnapshot.key;
        //     let childData = childSnapshot.val();
        //    // self.users.push(new User(childSnapshot.key, myUsers[aUser].name, 
        //    // myUsers[aUser].password, myUsers[aUser].category))
        // });
    }
}