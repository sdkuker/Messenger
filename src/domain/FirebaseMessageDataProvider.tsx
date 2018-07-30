import firebase from './firebase';
import { MessageDataProvider } from './MessageDataProvider';
import { Conversation } from './Conversation';
import { Message } from './Message';
import { observable } from 'mobx';

export class FirebaseMessageDataProvider implements MessageDataProvider {

    @observable messages = Array<Message>();
    database: firebase.database.Database;
    reference: firebase.database.Reference;
    conversation: Conversation;
    basePath: string;

    constructor(path: string ) {
        this.database = firebase.database();
        this.basePath = path;
    }
    add = (aMessage: Message) => {
        const newPostRef = this.reference.push();
        // tslint:disable-next-line
        newPostRef.set({sender: aMessage.sender, text: aMessage.text, creationDate: aMessage.creationDate.toJSON()}, function(error: any) {
            // if (error) {
            //     console.log('the set failed');
            // } else {
            //     console.log('the set succeeded');
            // }
        });
    }

    setConversation = (aConversation: Conversation) => {
        this.conversation = aConversation;
        this.messages.length = 0;
        this.reference = this.database.ref(this.basePath + aConversation.key());
        this.reference.on('child_added', this.messageAddedToDatabase);
    }
    // tslint:disable-next-line
    messageAddedToDatabase = (data: any) => {
        this.messages.push(new Message( data.key, data.val().sender, 
                                        data.val().text, new Date(data.val().creationDate)));
    }
}