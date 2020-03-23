import * as React from 'react';
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

@observer
class Nav extends React.Component<PropValues,  StateValues> {

  constructor(props: PropValues) {
    super(props);
    this.state = {
      last50MessagesOnlySelected: true
    };
  }

  public render() {

    var whiteFontStyle = {
      color: 'white'
    };

    // tslint:disable-next-line
    let loggedInUserElements: any = [];
    // tslint:disable-next-line
    let partnerElements: any = [];
    let selectedUserName = '';

    if (this.props.userWarehouse.loggedInUser) {
      let myString = this.props.userWarehouse.loggedInUser.name + ' chatting with ';
      loggedInUserElements.push(<div style={whiteFontStyle}>{myString}</div>);
      this.props.userWarehouse.users.forEach((myUser: User) => {
        partnerElements.push(<option>{myUser.name}</option>);
      });

      if ( this.props.userWarehouse.partnerUser ) {
        selectedUserName = this.props.userWarehouse.partnerUser.name;
      }
    }

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
        <span className="navbar-brand">Messenger</span>
        {loggedInUserElements}
        <select  
            value={selectedUserName} 
            className="form-control" 
            id="partnerSelect" 
            onChange={e => this.partnerSelected(e)}
        >
          {partnerElements}
        </select>
        <div className="radio">
          <label style={whiteFontStyle}>
            <input 
              type="radio" 
              value="last50MessagesRadioOption" 
              checked={this.state.last50MessagesOnlySelected} 
              onChange={e => this.handleRadioButonOptionChange(e)
                       }
            />
            Last 50 Messages Only
            </label>
        </div>
        <div className="radio">
          <label style={whiteFontStyle}>
            <input 
              type="radio" 
              value="allMessagesRadioOption" 
              checked={! this.state.last50MessagesOnlySelected} 
              onChange={e => this.handleRadioButonOptionChange(e)
                       }
            />
            All Messages
            </label>
        </div>
      </nav>
    );
  }

  partnerSelected(event: React.FormEvent<HTMLSelectElement>) {
    let selectedUserName = event.currentTarget.value;
    this.props.conversationPartnerChanged(selectedUserName);
  }

  handleRadioButonOptionChange(event: React.ChangeEvent<HTMLInputElement>) {

    let newStateIs50Messages = true;

    if (event.target.value === 'last50MessagesRadioOption') {
      newStateIs50Messages = true;
    } else {
      newStateIs50Messages = false;
    }
    this.setState({ last50MessagesOnlySelected: newStateIs50Messages });
    this.props.numberOfMessagesToDisplay('last50');
  }
}

export default Nav;
