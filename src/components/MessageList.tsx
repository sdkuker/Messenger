import * as React from 'react';
import { Message } from '../domain/Message';
import   MessageComponent  from './MessageComponent';

interface PropValues {
    messages: Array<Message>;
}

class MessageList extends React.Component<PropValues, {}> {

    constructor(props: PropValues) {
        super(props);
    }

    public render() {

        // tslint:disable-next-line
        let messageComponents: any = [];
        this.props.messages.forEach((aMessage: Message) => {
            messageComponents.push(
                <MessageComponent message={aMessage} />
            );
        });
        return (
            <div className="special-container">
                <ul className="list-group">
                    {messageComponents}
                </ul>
            </div>
        );
    }
}

export default MessageList;
