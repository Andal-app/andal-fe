import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// styling
// import 'bulma/css/bulma.css';
// import './styles/style2.css';
// import './styles/style.css';

// axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
