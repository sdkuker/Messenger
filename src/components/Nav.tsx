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
    let selectedUserLastLoggedInDateElements: any = [];

    if (this.props.userWarehouse.loggedInUser) {
      let myString = this.props.userWarehouse.loggedInUser.name + ' chatting with: ';
      loggedInUserElements.push(<span>{myString}</span>);
      this.props.userWarehouse.users.forEach((myUser: User) => {
        partnerElements.push(<option>{myUser.name}</option>);
      });

      if ( this.props.userWarehouse.partnerUser ) {
        selectedUserName = this.props.userWarehouse.partnerUser.name;
        let lastLoggedInString = 'Last logged in: ' + this.props.userWarehouse.partnerUserLastLoginDate;
        selectedUserLastLoggedInDateElements.push(<div className="ml-3">{lastLoggedInString}</div>);
      }
    }

    return (
      <header>
        <div>
          <div>
            <div className="d-flex m-3">
              <span>Messenger</span>
            </div>
            <div className="d-flex m-3">
              {loggedInUserElements}
              <select
                className="ml-1"
                value={selectedUserName}
                id="partnerSelect"
                onChange={e => this.partnerSelected(e)}
              >
                {partnerElements}
              </select>
              {selectedUserLastLoggedInDateElements}
              <div className="form-check form-check-inline">
                <label className="form-check-label ml-5" htmlFor="last50Radio">Last 50 Messages Only</label>
                <input className="form-check-input ml-2" type="radio" id="last50Radio" value="last50MessagesRadioOption"
                  checked={this.state.last50MessagesOnlySelected}
                  onChange={e => this.handleRadioButonOptionChange(e)}
                />
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label ml-3" htmlFor="allRadio">All Messages</label>
                <input className="form-check-input ml-2" type="radio" id="allRadio" value="allMessagesRadioOption"
                  checked={!this.state.last50MessagesOnlySelected}
                  onChange={e => this.handleRadioButonOptionChange(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
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

    if (newStateIs50Messages) {
      this.props.numberOfMessagesToDisplay('last50');
    } else {
      this.props.numberOfMessagesToDisplay('all');
    }
  }
}

export default observer(Nav);
