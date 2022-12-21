import * as React from 'react';
import { Message } from '../domain/Message';
import   MessageComponent  from './MessageComponent';
import { observer } from 'mobx-react';

interface PropValues {
    messages: Array<Message>;
}

class MessageList extends React.Component<PropValues, {}> {

    private messageListRef = React.createRef<HTMLDivElement>();

    constructor(props: PropValues) {
        super(props);
    }

    public render() {

        let previousMessageDate = new Date();

        // tslint:disable-next-line
        let messageComponents: any = [];
        this.props.messages.forEach((aMessage: Message) => {
            messageComponents.push(
                <MessageComponent message={aMessage} previousMessageDate={previousMessageDate} key={aMessage.key} />
            );
            previousMessageDate = aMessage.creationDate;
        });
        
        return (
            <div className="special-container" ref={this.messageListRef}>
                <ul className="list-group">
                    {messageComponents}
                </ul>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.messageListRef.current) {
            // this.messageListRef.current.scrollTop = this.messageListRef.current.scrollHeight;
            this.messageListRef.current.scrollIntoView(false);
        }
        
    }
}

export default observer(MessageList);
