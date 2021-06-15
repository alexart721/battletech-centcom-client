import Head from 'next/head';
import { profile, updateProfile } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './profile.module.css';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

export default function Profile () {
  const [user, setUser] = useState(initialUser);
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);
    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }
    setAuth(true);
    const { firstName, lastName, email } = res;
    setUser(oldUser => ({
      ...oldUser,
      firstName,
      lastName,
      email
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    // Check the client-session to see how to handle redirects
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const res = await updateProfile(user, accessToken);

    if (res.error) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    } else {
      alert('User details updated!');
      const { firstName, lastName, email } = res;
      setUser(oldUser => ({
        ...oldUser,
        firstName,
        lastName,
        email
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.profilePage}>
        <div className={styles.profileInfoSection}>
          <p className={styles.profileName}>{user.firstName}&apos;s Profile</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>First name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="First name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Last name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Last name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Email: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Password: </span>
                  <input className={styles.input}
                    type="password"
                    placeholder="********"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.formItem}>
                <button className={styles.formSubmit} type="submit">
                  &nbsp;Update&nbsp;
                </button>
              </div>
            </form>
          </div>
        </div>
        <div><img height="800" src="https://intron.one/public/images/archer.jpg"/></div>
      </div>
    </>
  );
}