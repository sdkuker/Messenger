import { Message } from './Message';
import { Conversation } from './Conversation';
import { MessageDataProvider } from './MessageDataProvider';
import { computed } from 'mobx';

export class MessageWarehouse {
   
    dataProvider: MessageDataProvider;

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
        this.dataProvider.setConversation(aConversation);
    }

}