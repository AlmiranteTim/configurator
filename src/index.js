import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom'


import App from './App'
import stores from './store'

import './styles/reset.css'
import './styles/styles.css'
import './styles/fontawesome-all.css'


import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();