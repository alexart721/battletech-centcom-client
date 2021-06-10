import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <h2>Welcome to Battletech!</h2>
  </Provider>
);