import * as React from 'react';
import Footer from './Footer';
import MessageList from './MessageList';
import Nav from './Nav';

class App extends React.Component {
  public render() {
    return (
      <body>
        <div className="container">
          <Nav />
          <MessageList />
          <Footer />
        </div>
      </body>
    );
  }
}

export default App;
