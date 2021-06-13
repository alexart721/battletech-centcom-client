import Head from 'next/head';
// import Link from 'next/link';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Navbar from '../components/Navbar/Navbar';
import React, { useState } from 'react';
import styles from './index.module.css';
// import auth from '../utils/auth';
// import apiServiceJWT from './../ApiServiceJWT';

export default function Gate () {
  const [userStatus, setUserStatus] = useState(true);

  const handleClick = (e) => {
    setUserStatus(currentStatus => {
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
        {userStatus ? <Login handleClick={handleClick}/> : <Register handleClick={handleClick}/>}
      </div>
    </div>
  );
}