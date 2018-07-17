import * as React from 'react';
import * as Firebase from 'firebase';
import Footer from './Footer';
import { Message } from '../domain/Message';
import { FirebaseMessageDataProvider } from '../domain/FirebaseMessageDataProvider';
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
    //  this.myMessageWarehouse = new MessageWarehouse(new StaticMessageDataProvider(null));
    this.myMessageWarehouse = new MessageWarehouse(new FirebaseMessageDataProvider('steve'));
    this.myMessages = this.myMessageWarehouse.messages;
  }

  public render() {
    return (
      <div>
        <Nav />
        <MessageList messages={this.myMessageWarehouse.messages} />
        <Footer messageWarehouse={this.myMessageWarehouse} />
      </div>
    );
  }
}

export default App;
