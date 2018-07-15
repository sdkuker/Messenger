import * as React from 'react';

class MessageList extends React.Component {
    public render() {
        return (
            <div  className="special-container">
                
                    <ul className="list-group">
                        <li className="list-group-item"><span>first</span></li>
                        <li className="list-group-item"><span>second</span></li>
                        <li className="list-group-item"><span>third</span></li>
                        <li className="list-group-item"><span>fourth</span></li>
                        <li className="list-group-item"><span>fifth</span></li>
                        <li className="list-group-item"><span>sixth</span></li>
                        <li className="list-group-item"><span>seventh</span></li>
                        <li className="list-group-item"><span>eighth</span></li>
                       
                    </ul>
                </div>
            
        );
    }
}

export default MessageList;
