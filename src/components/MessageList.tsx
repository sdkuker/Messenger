import * as React from 'react';
import { Message } from '../domain/Message';
import   MessageComponent  from './MessageComponent';
import { observer } from 'mobx-react';

interface PropValues {
    messages: Array<Message>;
}

@observer
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
