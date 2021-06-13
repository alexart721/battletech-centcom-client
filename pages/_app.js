import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/redux';
import '../styles.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  // const store = configureStore({
  //   tasks
  // });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
};