import * as React from 'react';

class MessageList extends React.Component {
    public render() {
        return (
            <div className="pre-scrollable">
                <ul>
                    <li><span>first</span></li>
                    <li><span>second</span></li>
                </ul>
            </div>
        );
    }
}

export default MessageList;
