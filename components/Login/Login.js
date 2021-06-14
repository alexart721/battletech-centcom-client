import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { login } from '../../services';
import styles from './Login.module.css';
import AuthContext from '../../services/AuthContext';

const initialState = {
  email: '',
  password: ''
};

const Login = (props) => {
  const [state, setState] = useState(initialState);
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // Check the session branch to see how to handle redirects
    e.preventDefault();
    const res = await login(state);

    if (res.error || !res) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setAuth(true);
      router.push('/dashboard');
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <input className={styles.input}
            type="text"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          {!state.email ? <span className={styles.reqFieldWarn}>Please enter your email address</span> : <></>}
          <input className={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          {!state.password ? <span className={styles.reqFieldWarn}>Please enter your password</span> : <></>}
        </div>
        <div className={styles.formItem}>
          <button className={styles.formSubmit} type="submit" disabled={validateForm()}>
            &nbsp;Login&nbsp;
          </button>
        </div>
        <div className={`${styles.formItem} ${styles.registerText}`}>
          Not a user? Please {' '} <Link href="/"><a onClick={props.handleClick}>register</a></Link>.
        </div>
      </form>
    </div>
  );
};

export default Login;