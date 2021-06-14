import customFetch from './customFetch';

const register = (user) => {
  return customFetch('/register', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

const login = (user) => {
  return customFetch('/login', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

const profile = (accessToken) => {
  return customFetch('/profile', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const updateProfile = (user, accessToken) => {
  return customFetch('/updateuser', {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user)
  });
}

const logout = (tokenName, accessToken) => {
  // Delete token from local storage here
  localStorage.removeItem(tokenName);
  // Invalidate the token
  return customFetch('/logout', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
};

module.exports = {
  register,
  login,
  profile,
  updateProfile,
  logout
}