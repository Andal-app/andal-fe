import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';
// import { store } from './app/store';
import store from './redux/store';
import App from './App';

// styling
// import 'bulma/css/bulma.css';
// import './styles/style2.css';
// import './styles/style.css';

// axios.defaults.withCredentials = true;

// Mengecek apakah ada token JWT di penyimpanan lokal
const jwtToken = localStorage.getItem('jwt');

// Jika ada token JWT, atur header Authorization secara global
if (jwtToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
