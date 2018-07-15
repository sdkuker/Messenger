import * as React from 'react';
import { Message } from '../domain/Message';

interface PropValues {
    message: Message;
}

class MessageComponent extends React.Component<PropValues, {}> {

    constructor(props: PropValues) {
        super(props);
    }

    public render() {
        return (
            <li>
                <span>{this.props.message.sender} - </span>
                <span>{this.props.message.text}</span>
            </li>
        );
    }
}

export default MessageComponent;
