import { Message } from './Message';

export interface MessageDataProvider {
     messages: Array<Message>;
     add(aMessage: Message): void;
} 
