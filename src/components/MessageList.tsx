import * as React from 'react';

class MessageList extends React.Component {
    public render() {
        return (
            <main role="main" className="container">
            <div className="pre-scrollable">
                <ul>
                    <li><span>first</span></li>
                    <li><span>second</span></li>
                    <li><span>third</span></li>
                    <li><span>fourth</span></li>
                    <li><span>fifth</span></li>
                    <li><span>sixth</span></li>
                    <li><span>seventh</span></li>
                    <li><span>eighth</span></li>
                    <li><span>ninth</span></li>
                </ul>
            </div>
            </main>
        );
    }
}

export default MessageList;
