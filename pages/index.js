import Head from 'next/head';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Navbar from '../components/Navbar/Navbar';
import React, { useState } from 'react';
import styles from './index.module.css';

export default function Gate () {
  const [isUser, setIsUser] = useState(true);

  const handleClick = (e) => {
    setIsUser(currentStatus => {
      if (currentStatus) return false;
      return true;
    })
  }

  return (
    <div>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.test}>
        {isUser ? <Login handleClick={handleClick}/> : <Register handleClick={handleClick}/>}
      </div>
    </div>
  );
}