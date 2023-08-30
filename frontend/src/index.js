import React from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
// import axios from 'axios';

// styling
import 'bulma/css/bulma.css';
import './styles/style2.css';
import './styles/style.css';
import 'bulma-extensions/bulma-timeline/dist/css/bulma-timeline.min.css';

// axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
