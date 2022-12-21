import { Message } from './Message';
import { Conversation } from './Conversation';
import { MessageDataProvider } from './MessageDataProvider';
import { computed, observable, makeObservable } from 'mobx';

export class MessageWarehouse {
   
    dataProvider: MessageDataProvider;

    myConversation: Conversation;

    constructor(mydataProvider: MessageDataProvider) {
        makeObservable(this, {
            myConversation: observable,
            messages: computed
        });

        this.dataProvider = mydataProvider;
    }

    get messages() {
        return this.dataProvider.messages;
    }
    
    add = (aMessage: Message) => {
        this.dataProvider.add(aMessage);
    }

    conversationPartnerChanged = (aConversation: Conversation) => { 
        this.myConversation = aConversation;
        this.dataProvider.setConversation(aConversation);
    }

    numberOfMessagesToDisplay = (numberOfMessagesToDisplay: string) => {
        this.dataProvider.setNumberOfMessagesToDisplay(numberOfMessagesToDisplay);
    }

}