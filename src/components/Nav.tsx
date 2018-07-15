import * as React from 'react';

class Nav extends React.Component {
  public render() {
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
