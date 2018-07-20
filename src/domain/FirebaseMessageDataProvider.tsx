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
        this.messages.push(new Message(data.key, data.val().sender, data.val().text));
    }
}