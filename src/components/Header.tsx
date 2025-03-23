import * as React from 'react';
import  HeaderControlsComponent from './HeaderControlsComponent';
import { User } from '../domain/User';
import { UserWarehouse } from '../domain/UserWarehouse';
import { observer } from 'mobx-react';

interface PropValues {
  userWarehouse: UserWarehouse;
  conversationPartnerChanged: Function;
  numberOfMessagesToDisplay: Function;

}

interface StateValues {
  last50MessagesOnlySelected: boolean;
}

class Header extends React.Component<PropValues,  StateValues> {

  constructor(props: PropValues) {
    super(props);
  }

  public render() {

    let headerControlsComponentElements: any = [];

    if (this.props.userWarehouse.loggedInUser) {
      headerControlsComponentElements.push(<HeaderControlsComponent
        userWarehouse={this.props.userWarehouse}
        conversationPartnerChanged={this.props.conversationPartnerChanged}
        numberOfMessagesToDisplay={this.props.numberOfMessagesToDisplay}
      />);
    }

    return (
      <header>
        <div>
          <div className="bg-primary text-white fixed-top">
            <div className="d-flex ml-3 justify-content-center h3">
              <span>Messenger</span>
            </div>
            {headerControlsComponentElements}
          </div>
          </div>
      </header>
    );
  }
 
}

export default observer(Header);
