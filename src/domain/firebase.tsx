import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyCYYpvIId1uatqodFV2aNn6U0skogqefcE',
    authDomain: 'steviewaremessenger.firebaseapp.com',
    databaseURL: 'https://steviewaremessenger.firebaseio.com',
    projectId: 'steviewaremessenger',
    storageBucket: 'steviewaremessenger.appspot.com',
    messagingSenderId: '212286266725'
};
firebase.initializeApp(config);

export default firebase;