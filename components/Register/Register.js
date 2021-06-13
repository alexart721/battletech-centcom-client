import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import auth from '../utils/auth';
import { register } from '../../services/ApiServiceJWT';

const initialUser = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
};

const Register = (props) => {
  const [user, setUser] = useState(initialUser); // Make this redux probably
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

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
      router.push('/dashboard');
      // props.setIsAuthenticated(true);
      // auth.login(() => props.history.push('/profile'));
    }
  };

  const validateForm = () => {
    return (
      !user.email || !user.password || !user.firstName || !user.lastName
    );
  };

  return (
    <div>
      <h2>Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="First name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last name"
          name="lastName"
          value={user.lastName}
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
