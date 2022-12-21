import { MessageDataProvider } from './MessageDataProvider';
import { Message } from './Message';
import { Conversation } from './Conversation';
import { observable, makeObservable } from 'mobx';

export class StaticMessageDataProvider implements MessageDataProvider {

    messages: Array<Message>;

    constructor(myMessages: Array<Message> | null) {
        makeObservable(this, {
            messages: observable
        });

        if (myMessages) {
            this.messages = myMessages;
        } else {
            const staticMessages = Array<Message>();
            staticMessages.push(new Message('1', 'Steve', 'Steves first message', 'text', null, null, null));
            staticMessages.push(new Message('2', 'Michelle', 'Michelles first message', 'text', null, null, null));
            this.messages = staticMessages;
        }
    }
    add = (aMessage: Message) => {
        this.messages.push(aMessage);
    }

    setConversation = (aConversation: Conversation) => {
        // console.log('not sure what to do here');
    }

    setNumberOfMessagesToDisplay = (numberOfMessagesToDisplayDescription: string) => {
        // console.log('not sure what to do here either');
    }
}