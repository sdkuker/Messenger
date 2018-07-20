import * as React from 'react';
import { User } from '../domain/User';

interface PropValues {
  loggedInUser: User | null;
}

class Nav extends React.Component<PropValues, {}> {

  constructor(props: PropValues) {
    super(props);
  }

  public render() {

    // tslint:disable-next-line
    let loggedInUserElements: any = [];
    if ( this.props.loggedInUser ) {
      loggedInUserElements.push(<span>{this.props.loggedInUser.name}</span>);
    }

    return (
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark fixed-top">
        <span className="navbar-brand">Messenger</span>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Active</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
