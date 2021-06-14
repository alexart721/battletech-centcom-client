import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { register } from '../../services';
import styles from './Register.module.css';
import AuthContext from '../../services/AuthContext';

const initialUser = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
};

const Register = (props) => {
  const [user, setUser] = useState(initialUser);
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();

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
    const res = await register(user);

    if (res.error) {
      alert(`${res.message}`);
      setUser(initialUser);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setAuth(true);
      router.push('/dashboard');
    }
  };

  const validateForm = () => {
    return (
      !user.email || !user.password || !user.firstName || !user.lastName
    );
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.formTitle}>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
        <input className={styles.input}
            type="text"
            placeholder="First name"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          {!user.firstName ? <span className={styles.reqFieldWarn}>Please enter your first name</span> : <></>}
          <input className={styles.input}
            type="text"
            placeholder="Last name"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          {!user.firstName ? <span className={styles.reqFieldWarn}>Please enter your last name</span> : <></>}
          <input className={styles.input}
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {!user.email ? <span className={styles.reqFieldWarn}>Please enter your email address</span> : <></>}
          <input className={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {!user.password ? <span className={styles.reqFieldWarn}>Please enter your password</span> : <></>}
        </div>
        <div className={styles.formItem}>
          <button className={styles.formSubmit} type="submit" disabled={validateForm()}>
            &nbsp;Register&nbsp;
          </button>
        </div>
        <div className={`${styles.formItem} ${styles.registerText}`}>
          Already a user? Please {' '} <Link href="/"><a onClick={props.handleClick}>login</a></Link>.
        </div>
      </form>
    </div>
  );
};

export default Register;
