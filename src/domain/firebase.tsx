import { initializeApp} from 'firebase/app';
import { getDatabase } from 'firebase/database';
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
const app = initializeApp(config);
const messengerDatabase = getDatabase(app);

export default messengerDatabase;