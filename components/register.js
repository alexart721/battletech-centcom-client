import React, { useState } from 'react';
// import auth from '../utils/auth';
// import apiServiceJWT from './../ApiServiceJWT';

const initialState = {
  userName: '',
  password: '',
  firstName: '',
  lastName: ''
};

const Register = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    // Check the client-session to see how to handle redirects
    e.preventDefault();
    // const { userName, password, firstName, lastName } = state;
    // const user = { userName, password, firstName, lastName };
    // const res = await apiServiceJWT.register(user);

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
    return (
      !state.userName || !state.password || !state.firstName || !state.lastName
    );
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name@mail.com"
          name="userName"
          value={state.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nameson"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Register;
