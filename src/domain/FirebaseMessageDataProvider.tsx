import messengerDatabase from './firebase';
import { Database, DatabaseReference, ref, onValue, query, get, push, set, orderByChild, DataSnapshot, equalTo, orderByKey, onChildAdded, limitToLast, Query } from 'firebase/database';
import { MessageDataProvider } from './MessageDataProvider';
import { Conversation } from './Conversation';
import { Message } from './Message';
import { observable, makeObservable } from 'mobx';

export class FirebaseMessageDataProvider implements MessageDataProvider {

    messages = Array<Message>();
    database: Database;
    allMessagesRef: DatabaseReference;
    allMessagesQuery: Query;
    last50MessagesQuery: Query;
    conversation: Conversation;
    basePath: string;
    np: string;
    allMessages = Array<Message>();
    last50Messages = Array<Message>();
    numberOfMessagesToDisplayDescription: string;
    messagesRetrievedForConversation: boolean;

    constructor(path: string) {
        makeObservable(this, {
            messages: observable
        });

        this.database = messengerDatabase;
        this.basePath = path;
        this.messagesRetrievedForConversation = false;
    }
    add = (aMessage: Message) => {

        const newMessageRef = push(this.allMessagesRef);
        // tslint:disable-next-line
        set(newMessageRef, {
            sender: aMessage.sender, text: aMessage.text, type: aMessage.type, width: aMessage.width, height: aMessage.height, creationDate: aMessage.creationDate.toJSON() }, 
        );
        // const newPostRef = this.allMessagesReference.push();
        // // tslint:disable-next-line
        // newPostRef.set({ sender: aMessage.sender, text: aMessage.text, type: aMessage.type, width: aMessage.width, height: aMessage.height, creationDate: aMessage.creationDate.toJSON() }, function (error: any) {
        // });
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
                //this.last50MessagesReference = this.database.ref(baseQuery).limitToLast(50);
                this.last50MessagesQuery = query(ref(this.database, baseQuery), limitToLast(50));
                onChildAdded(this.last50MessagesQuery, this.last50MessageAddedToDatabase)
                //this.last50MessagesReference.on('child_added', this.last50MessageAddedToDatabase);
            }
           // this.allMessagesReference = this.database.ref(baseQuery);
           // this.allMessagesReference.on('child_added', this.allMessageAddedToDatabase);
           this.allMessagesRef = ref(this.database, baseQuery);
           this.allMessagesQuery = query(ref(this.database, baseQuery));
            onChildAdded(this.allMessagesQuery, this.allMessageAddedToDatabase)
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