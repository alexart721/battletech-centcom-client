import Head from 'next/head';
// import Link from 'next/link';
import Login from '../components/login';
import Register from '../components/register';

export default function Home () {
  let isUser = true;

  const handleClick = (e) => {
    if (isUser) isUser = false;
    else isUser = true;
  }

  return (
    <div>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <h2>Welcome to Battletech!</h2>
      {isUser ? <Login /> : <Register />}
      <button onClick={handleClick}>{isUser ? 'Register' : 'Login'}</button>
    </div>
  );
}