import { Message } from './Message';
import { Conversation } from './Conversation';
import { MessageDataProvider } from './MessageDataProvider';
import { computed, observable } from 'mobx';

export class MessageWarehouse {
   
    dataProvider: MessageDataProvider;

    @observable myConversation: Conversation;

    constructor(mydataProvider: MessageDataProvider) {
        this.dataProvider = mydataProvider;
    }

    @computed
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