import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'
import {Provider} from 'react-redux'
import store from './store/Store'
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
      <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
