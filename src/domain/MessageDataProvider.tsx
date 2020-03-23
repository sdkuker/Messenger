import { Message } from './Message';
import { Conversation } from './Conversation';

export interface MessageDataProvider {
     messages: Array<Message>;
     add(aMessage: Message): void;
     setConversation(aConversation: Conversation): void;
     setNumberOfMessagesToDisplay(numberOfMessagesToDisplayDescription: string): void;
} 
