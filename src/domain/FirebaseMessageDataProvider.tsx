import firebase from './firebase';
import { MessageDataProvider } from './MessageDataProvider';
import { Message } from './Message';
import { observable } from 'mobx';

export class FirebaseMessageDataProvider implements MessageDataProvider {

    @observable messages = Array<Message>();
    database: firebase.database.Database;
    reference: firebase.database.Reference;

    constructor(path: string) {
        this.database = firebase.database();
        this.reference = this.database.ref(path);
        this.reference.on('child_added', this.messageAddedToDatabase);
    }
    add = (aMessage: Message) => {
        const newPostRef = this.reference.push();
        console.log('new post ref is: ' + newPostRef);
        // tslint:disable-next-line
        newPostRef.set({sender: aMessage.sender, text: aMessage.text}, function(error: any) {
            if (error) {
                console.log('the set failed');
            } else {
                console.log('the set succeeded');
            }
        });
    }

    // tslint:disable-next-line
    messageAddedToDatabase = (data: any) => {
        console.log('message added to the database: key: ' + data.key + ' sender: ' + 
            data.val().sender + ' text: ' + data.val().text);
        this.messages.push(new Message(data.key, data.val().sender, data.val().text));
    }
}