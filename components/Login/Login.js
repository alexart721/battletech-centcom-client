import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import auth from '../utils/auth';
import { login } from '../../services/ApiServiceJWT';
import styles from './Login.module.css';

const initialState = {
  email: '',
  password: ''
};

const Login = (props) => {
  const [state, setState] = useState(initialState);
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

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      // props.setIsAuthenticated(true);
      router.push('/dashboard');
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className={styles.formSubmit} type="submit" disabled={validateForm()}>
            &nbsp;Login&nbsp;
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;