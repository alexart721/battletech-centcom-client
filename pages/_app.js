import React, { useState } from 'react';
import '../styles.css';
import AuthContext from '../services/AuthContext';

const initialActiveIds = {
  campaign: 0,
  contract: 0,
  op: 0
};

// This default export is required in a new `pages/_app.js` file.
export default function MyApp ({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeIds, setActiveIds] = useState(initialActiveIds);

  const setAuth = (auth) => {
    setIsAuthenticated(auth);
  }

  const setActiveId = (typeAsString, id) => {
    if (typeAsString === 'campaign') {
      setActiveIds(prevState => ({
        ...prevState,
        campaign: id
      }));
    } else if (typeAsString === 'contract') {
      setActiveIds(prevState => ({
        ...prevState,
        contract: id
      }));
    } else if (typeAsString === 'op') {
      setActiveIds(prevState => ({
        ...prevState,
        op: id
      }));
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth, activeIds, setActiveId }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};