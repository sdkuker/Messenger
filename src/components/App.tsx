import * as React from 'react';
import Footer from './Footer';
import MessageList from './MessageList';
import Nav from './Nav';

class App extends React.Component {
  public render() {
    return (
        <div className="container">
          <Nav />
          <MessageList />
          <Footer />
        </div>
    );
  }
}

export default App;
