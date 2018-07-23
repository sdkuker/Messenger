import * as React from 'react';
import { User } from '../domain/User';
import { UserWarehouse } from '../domain/UserWarehouse';

interface PropValues {
  userWarehouse: UserWarehouse;
  conversationPartnerChanged: Function;
}

class Nav extends React.Component<PropValues, {}> {

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
        if (this.props.userWarehouse.getUsersForLoggedInUser().length === 1) {
          this.props.userWarehouse.setConversationPartner(myUser.name);
          this.props.conversationPartnerChanged();
        }
      });
    }

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
        <span className="navbar-brand">Messenger</span>
        {loggedInUserElements}
        <select className="form-control" id="partnerSelect" onChange={e => this.partnerSelected(e)}>
          {partnerElements}
        </select>
      </nav>
    );
  }

  partnerSelected(event: React.FormEvent<HTMLSelectElement>) {
    this.props.userWarehouse.setConversationPartner(event.currentTarget.value);
    this.props.conversationPartnerChanged();
  }
}

export default Nav;
