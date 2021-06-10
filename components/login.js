import React, { useState } from 'react';
// import auth from '../utils/auth';
// import apiServiceJWT from './../ApiServiceJWT';

const initialState = {
  userName: '',
  password: ''
};

const Login = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // Check the session branch to see how to handle redirects
    // e.preventDefault();
    // const { userName, password } = state;
    // const user = { userName, password };
    // const res = await apiServiceJWT.login(user);

    // if (res.error) {
    //   alert(`${res.message}`);
    //   setState(initialState);
    // } else {
    //   const { accessToken } = res;
    //   localStorage.setItem('accessToken', accessToken);
    //   props.setIsAuthenticated(true);
    //   auth.login(() => props.history.push('/profile'));
    // }
  };

  const validateForm = () => {
    return !state.userName || !state.password;
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={state.userName}
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