import * as React from 'react';
import Footer from './Footer';
import { FirebaseUserDataProvider } from '../domain/FirebaseUserDataProvider';
import { FirebaseMessageDataProvider } from '../domain/FirebaseMessageDataProvider';
import LoginComponent from './LoginComponent';
import MessageList from './MessageList';
import { MessageWarehouse } from '../domain/MessageWarehouse';
import Nav from './Header';
import { observer } from 'mobx-react';
import { UserWarehouse } from '../domain/UserWarehouse';
import { AwsSMSWarehouse } from '../domain/AwsSMSWarehouse';
// @ts-ignore
import  snsConfigObject from '../snsConfig.json';


class App extends React.Component {

  myMessageWarehouse: MessageWarehouse;
  myUserWarehouse: UserWarehouse;
  myAwsSMSWarehouse: AwsSMSWarehouse;

  constructor() {
    super({});
    // this.myUserWarehouse = new UserWarehouse(new StaticUserDataProvider(null));
    this.myUserWarehouse = new UserWarehouse(new FirebaseUserDataProvider());
    // this.myMessageWarehouse = new MessageWarehouse(new StaticMessageDataProvider(null));
    this.myMessageWarehouse =
      new MessageWarehouse(new FirebaseMessageDataProvider('messages/'));
    this.myAwsSMSWarehouse = new AwsSMSWarehouse(snsConfigObject.accessKey, snsConfigObject.secretAccessKey);
  }

  public render() {

    // tslint:disable-next-line
    let myHtml: any = [];

    if (this.myUserWarehouse.loggedInUser) {
      myHtml.push((
              <Nav 
                userWarehouse={this.myUserWarehouse}
                conversationPartnerChanged={this.conversationPartnerChanged} 
                numberOfMessagesToDisplay={this.numberOfMessagesToDisplay}
              />));
      myHtml.push(<MessageList messages={this.myMessageWarehouse.messages} />);
      myHtml.push((
              <Footer 
                messageWarehouse={this.myMessageWarehouse} 
                loggedInUser={this.myUserWarehouse.loggedInUser}
                userWarehouse={this.myUserWarehouse}
                awsSMSWarehouse={this.myAwsSMSWarehouse}
              />));
    } else {
      myHtml.push((
            <Nav 
              userWarehouse={this.myUserWarehouse} 
              conversationPartnerChanged={this.conversationPartnerChanged} 
              numberOfMessagesToDisplay={this.numberOfMessagesToDisplay}
            />));
      myHtml.push(<LoginComponent userWarehouse={this.myUserWarehouse} 
                    messageWarehouse={this.myMessageWarehouse}
                    awsSMSWarehouse={this.myAwsSMSWarehouse}
                  />);
    }
    return (
      <div>
        {myHtml}
      </div>
    );
  }

  conversationPartnerChanged = async (partnerName: string) => {
    await this.myUserWarehouse.setConversationPartner(partnerName);
    this.myMessageWarehouse.conversationPartnerChanged(this.myUserWarehouse.conversation);
  }

  numberOfMessagesToDisplay = (numberOfMessagesToDisplay: string) => {
    this.myMessageWarehouse.numberOfMessagesToDisplay(numberOfMessagesToDisplay);
  }
}

export default observer(App);
