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
    const res = await profile(accessToken);
    if (!res) {
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      alert(`${res.message}`);
      return router.push('/');
    }
    const { firstName, lastName, email } = res;
    setUser(oldUser => ({
      ...oldUser,
      firstName,
      lastName,
      email
    }));
  }, []);

  const handleClick = async (e) => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await logout('accessToken', accessToken);
    alert(`${res.message}`);
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