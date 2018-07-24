import * as React from 'react';
import { User } from '../domain/User';
import { UserWarehouse } from '../domain/UserWarehouse';
import { observer } from 'mobx-react';

interface PropValues {
  userWarehouse: UserWarehouse;
  conversationPartnerChanged: Function;
}

@observer
class Nav extends React.Component<PropValues, {}> {

  selectedUserName: string;

  constructor(props: PropValues) {
    super(props);
  }

  public render() {

    var whiteFontStyle = {
      color: 'white'
    };

    // tslint:disable-next-line
    let loggedInUserElements: any = [];
    // tslint:disable-next-line
    let partnerElements: any = [];

    if (this.props.userWarehouse.loggedInUser) {
      let myString = this.props.userWarehouse.loggedInUser.name + ' chatting with ';
      loggedInUserElements.push(<div style={whiteFontStyle}>{myString}</div>);
      this.props.userWarehouse.getUsersForLoggedInUser().forEach((myUser: User) => {
        partnerElements.push(<option>{myUser.name}</option>);
      });
      if (! this.selectedUserName) {
        let selectedUser = this.props.userWarehouse.getUsersForLoggedInUser()[0];
        this.selectedUserName = selectedUser.name;
        // this.props.userWarehouse.setConversationPartner(selectedUser.name);
        this.props.conversationPartnerChanged(selectedUser.name);
      }
    }

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
        <span className="navbar-brand">Messenger</span>
        {loggedInUserElements}
        <select  
            value={this.selectedUserName} 
            className="form-control" 
            id="partnerSelect" 
            onChange={e => this.partnerSelected(e)}
        >
          {partnerElements}
        </select>
      </nav>
    );
  }

  partnerSelected(event: React.FormEvent<HTMLSelectElement>) {
    this.selectedUserName = event.currentTarget.value;
   //  this.props.userWarehouse.setConversationPartner(event.currentTarget.value);
    this.props.conversationPartnerChanged(this.selectedUserName);
  }
}

export default Nav;
