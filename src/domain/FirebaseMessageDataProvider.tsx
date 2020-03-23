import firebase from './firebase';
import { MessageDataProvider } from './MessageDataProvider';
import { Conversation } from './Conversation';
import { Message } from './Message';
import { observable } from 'mobx';

export class FirebaseMessageDataProvider implements MessageDataProvider {

    @observable messages = Array<Message>();
    database: firebase.database.Database;
    allMessagesReference: firebase.database.Reference;
    last50MessagesReference: firebase.database.Reference;
    conversation: Conversation;
    basePath: string;
    np: string;
    allMessages = Array<Message>();
    last50Messages = Array<Message>();
    numberOfMessagesToDisplayDescription: string;
    messagesRetrievedForConversation: boolean;

    constructor(path: string) {
        this.database = firebase.database();
        this.basePath = path;
        this.messagesRetrievedForConversation = false;
    }
    add = (aMessage: Message) => {
        const newPostRef = this.allMessagesReference.push();
        // tslint:disable-next-line
        newPostRef.set({ sender: aMessage.sender, text: aMessage.text, type: aMessage.type, width: aMessage.width, height: aMessage.height, creationDate: aMessage.creationDate.toJSON() }, function (error: any) {
            // if (error) {
            //     console.log('the set failed');
            // } else {
            //     console.log('the set succeeded');
            // }
        });
    }

    setConversation = (aConversation: Conversation) => {
        this.conversation = aConversation;
        this.messagesRetrievedForConversation = false;
        this.getMessages();
    }

    setNumberOfMessagesToDisplay = (newNumberOfMessagesToDisplayDescription: string) => {
        if (this.numberOfMessagesToDisplayDescription !== newNumberOfMessagesToDisplayDescription) {
            this.numberOfMessagesToDisplayDescription = newNumberOfMessagesToDisplayDescription;
            if (this.messagesRetrievedForConversation) {
                this.messages.length = 0;
                if (this.numberOfMessagesToDisplayDescription === 'last50') {
                    this.last50Messages.forEach(aMessage => {
                        this.messages.push(aMessage);
                    });
                } else {
                    this.allMessages.forEach(aMessage => {
                        this.messages.push(aMessage);
                    });
                }
            } else {
                this.getMessages();
            }
        }
    }

    getMessages = () => {
        if (this.conversation != null && this.numberOfMessagesToDisplayDescription != null) {
            this.messagesRetrievedForConversation = true;
            this.messages.length = 0;
            let baseQuery = this.basePath + this.conversation.key();
            if (this.numberOfMessagesToDisplayDescription === 'last50') {
                // @ts-ignore
                this.last50MessagesReference = this.database.ref(baseQuery).limitToLast(50);
                this.last50MessagesReference.on('child_added', this.last50MessageAddedToDatabase);
            }
            this.allMessagesReference = this.database.ref(baseQuery);
            this.allMessagesReference.on('child_added', this.allMessageAddedToDatabase);
        }
    }

    // tslint:disable-next-line
    last50MessageAddedToDatabase = (data: any) => {
        this.messageAddedToDatabase(data, this.last50Messages);
    }

    // tslint:disable-next-line
    allMessageAddedToDatabase = (data: any) => {
        this.messageAddedToDatabase(data, this.allMessages);
    }

    // tslint:disable-next-line
    messageAddedToDatabase = (data: any, arrayToAddMessagesTo: Array<Message>) => {
        var type = 'text';
        if (data.val().type) {
            type = data.val().type;
        }
        arrayToAddMessagesTo.push(new Message( data.key, data.val().sender,
                                               data.val().text, type, data.val().width, data.val().height,
                                               new Date(data.val().creationDate)));
        if (this.numberOfMessagesToDisplayDescription === 'last50' && arrayToAddMessagesTo === this.last50Messages) {
            this.messages.push(new Message( data.key, data.val().sender,
                                            data.val().text, type, data.val().width, data.val().height,
                                            new Date(data.val().creationDate)));
        } else {
            if (this.numberOfMessagesToDisplayDescription !== 'last50' && 
                arrayToAddMessagesTo !== this.last50Messages) {
                    this.messages.push(new Message( data.key, data.val().sender,
                                                    data.val().text, type, data.val().width, data.val().height,
                                                    new Date(data.val().creationDate)));
            }
        }
    }
}