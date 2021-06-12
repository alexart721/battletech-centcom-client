// Set server URL in environment variables
// const BASE_URL = 'http://localhost:3001'; // For local dev
const BASE_URL = 'https://battletech-centcom-server.herokuapp.com/'; // For Vercel deployment

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

// ADD ONE MORE FOR DASHBOARD

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

const customFetch = (path, options) => {
  return fetch(BASE_URL + path, options)
    .then(res => (res.status >= 400 ? Promise.reject(res) : res))
    .then(res => (res.status === 204 ? res : res.json()))
    .catch(err => {
      console.log(`Request error [${options ? options.method : 'GET'} ${path}]: `, err);
    });
};

module.exports = {
  register,
  login,
  profile,
  logout
}