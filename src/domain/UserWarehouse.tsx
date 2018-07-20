import { User } from './User';
import { UserDataProvider } from './UserDataProvider';
import { computed, observable } from 'mobx';

export class UserWarehouse {
   
    dataProvider: UserDataProvider;
    @observable loggedInUser: User;

    constructor(mydataProvider: UserDataProvider) {
        this.dataProvider = mydataProvider;
    }

    @computed
    get users() {
        return this.dataProvider.users;
    }

    setLoggedInUser( userName: string, userPassword: string ) {
        // loop through the users collection and find one with the same name
        // if you do, take the one from the collection and make it loggedInUser. 
        // you want to use the same object with the id from the data provider.

        let successfulLogin = false;

        this.users.forEach((myUser: User) => {
            if (userName === myUser.name && userPassword === myUser.password ) {
                this.loggedInUser = myUser;
                successfulLogin = true;
            }
        });

        return successfulLogin;
    }
    
}