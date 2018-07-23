import * as React from 'react';
import Footer from './Footer';
import { Message } from '../domain/Message';
import { FirebaseMessageDataProvider } from '../domain/FirebaseMessageDataProvider';
import { StaticMessageDataProvider } from '../domain/StaticMessageDataProvider';
import LoginComponent from './LoginComponent';
import MessageList from './MessageList';
import { MessageWarehouse } from '../domain/MessageWarehouse';
import Nav from './Nav';
import { observer } from 'mobx-react';
import { StaticUserDataProvider } from '../domain/StaticUserDataProvider';
import { User } from '../domain/User';
import { UserWarehouse } from '../domain/UserWarehouse';

@observer
class App extends React.Component {

  myMessageWarehouse: MessageWarehouse;
  myUserWarehouse: UserWarehouse;

  constructor() {
    super({});
    this.myUserWarehouse = new UserWarehouse(new StaticUserDataProvider(null));
    // this.myMessageWarehouse = new MessageWarehouse(new StaticMessageDataProvider(null));
    this.myMessageWarehouse =
      new MessageWarehouse(new FirebaseMessageDataProvider('messages/'));
  }

  public render() {

    // tslint:disable-next-line
    let myHtml: any = [];

    if (this.myUserWarehouse.loggedInUser) {
      myHtml.push((
              <Nav 
                userWarehouse={this.myUserWarehouse}
                conversationPartnerChanged={this.conversationPartnerChanged} 
              />));
      myHtml.push(<MessageList messages={this.myMessageWarehouse.messages} />);
      myHtml.push((
              <Footer 
                messageWarehouse={this.myMessageWarehouse} 
                loggedInUser={this.myUserWarehouse.loggedInUser}
              />));
    } else {
      myHtml.push((
            <Nav 
              userWarehouse={this.myUserWarehouse} 
              conversationPartnerChanged={this.conversationPartnerChanged} 
            />));
      myHtml.push(<LoginComponent userWarehouse={this.myUserWarehouse} />);
    }
    return (
      <div>
        {myHtml}
      </div>
    );
  }

  conversationPartnerChanged = () => {
    this.myMessageWarehouse.conversationPartnerChanged(this.myUserWarehouse.conversation);
  }
}

export default App;
