import Head from 'next/head';
// import Link from 'next/link';
import Login from '../components/login';
import Register from '../components/register';
import React, { useState } from 'react';
// import auth from '../utils/auth';
// import apiServiceJWT from './../ApiServiceJWT';

export default function Home () {
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
      <h2>Welcome to Battletech!</h2>
      {userStatus ? <Login /> : <Register />}
      <button onClick={handleClick}>{userStatus ? 'Register' : 'Login'}</button>
    </div>
  );
}