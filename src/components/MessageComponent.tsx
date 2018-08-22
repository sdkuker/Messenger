import * as React from 'react';
import { Message } from '../domain/Message';

interface PropValues {
    message: Message;
    previousMessageDate: Date;
}

class MessageComponent extends React.Component<PropValues, {}> {

    displayDateInterval = 20 * 60 * 1000; /* 20 mins in ms */

    constructor(props: PropValues) {
        super(props);
    }

    public render() {

        // tslint:disable-next-line
        let myHtml: any = [];
        // tslint:disable-next-line
        var content: any = [];
        if (this.props.message.type === 'image') {
            content.push((
                <div>
                    <img 
                         width={this.props.message.width} 
                         height={this.props.message.height} 
                         src={this.props.message.text}
                    />;
                    <br />
                </div>
            ));
        } else {
            content.push(<span>{this.props.message.text}</span>);
        }

        if ((this.props.message.creationDate.getTime() - this.props.previousMessageDate.getTime()) >
            this.displayDateInterval) {
            myHtml.push((
                <div>
                    <br />
                    <span className="small">{this.props.message.creationDate.toDateString() + ' - ' +
                        this.props.message.creationDate.toLocaleTimeString()}</span>
                    <br />
                    <span>{this.props.message.sender + ' - '}
                        {content}
                    </span>
                </div>
            ));
        } else {
            myHtml.push((
                <div>
                    <span>{this.props.message.sender + ' - '}
                        {content}
                    </span>
                </div>
            ));
        }

        return (

            <li className="list-unstyled">
                {myHtml}
            </li>
        );
    }
}

export default MessageComponent;
