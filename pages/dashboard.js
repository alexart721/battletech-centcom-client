import Head from 'next/head';
import { logout, profile } from '../services/ApiServiceJWT';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const initialUser = {
  email: '',
  firstName: '',
  lastName: ''
};

export default function Dashboard () {
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('In dashboard', accessToken);
    const { firstName, lastName, email } = await profile(accessToken);
    console.log('In dashboard', firstName);
    setUser(oldUser => ({
      ...oldUser,
      firstName,
      lastName,
      email
    }));
  }, []);

  const handleClick = async (e) => {
    await logout('accessToken'); // Update when invalidating token server side
    router.push('/');
  }

  return (
    <div>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <h2>Welcome to Battletech!</h2>
      <p>First name: {user.firstName}</p>
      <p>Last name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <br />
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}