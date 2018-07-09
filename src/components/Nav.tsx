import * as React from 'react';

class Nav extends React.Component {
  public render() {
    return (
      <header>
        <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <span className="navbar-brand">Messenger</span>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Active</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Nav;
