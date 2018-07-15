import * as React from 'react';
import Footer from './Footer';
import { Message } from '../domain/Message';
import { StaticMessageDataProvider } from '../domain/StaticMessageDataProvider';
import MessageList from './MessageList';
import { MessageWarehouse } from '../domain/MessageWarehouse';
import Nav from './Nav';
import { observer } from 'mobx-react';

@observer
class App extends React.Component {

  myMessageWarehouse: MessageWarehouse;
  myMessages: Array<Message>;

  constructor() {
    super({});
    this.myMessageWarehouse = new MessageWarehouse(new StaticMessageDataProvider(null));
    this.myMessages = this.myMessageWarehouse.messages;
  }

  public render() {
    return (
        <div>
          <Nav />
          <MessageList messages={this.myMessages}/>
          <Footer />
        </div>
    );
  }
}

export default App;
