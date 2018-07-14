import { Message } from './Message';
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
    
}