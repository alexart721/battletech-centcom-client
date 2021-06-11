import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import auth from '../utils/auth';
import { login } from '../services/ApiServiceJWT';

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
    const { email, password } = state;
    const user = { email, password };
    const res = await login(user);

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
    <div>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
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
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Login;