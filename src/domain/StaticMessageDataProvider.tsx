import { MessageDataProvider } from './MessageDataProvider';
import { Message } from './Message';
import { observable } from 'mobx';

export class StaticMessageDataProvider implements MessageDataProvider {

    @observable messages: Array<Message>;

    constructor(myMessages: Array<Message> | null) {
        if (myMessages) {
            this.messages = myMessages;
        } else {
            const staticMessages = Array<Message>();
            staticMessages.push(new Message('1', 'Steve', 'Steves first message'));
            staticMessages.push(new Message('2', 'Michelle', 'Michelles first message'));
            this.messages = staticMessages;
        }
    }
    add = (aMessage: Message) => {
        this.messages.push(aMessage);
    }
}