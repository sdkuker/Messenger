import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import  * as Modal from 'react-modal';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sticky-footer-navbar.css';

Modal.setAppElement('#root');

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
