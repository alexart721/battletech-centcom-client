// Set server URL in environment variables
// const BASE_URL = 'http://localhost:3001'; // For local dev
const BASE_URL = 'https://battletech-centcom-server.herokuapp.com'; // For Vercel deployment

const customFetch = (path, options) => {
  return fetch(BASE_URL + path, options)
    .then(res => (res.status === 204 ? res : res.json()))
    .catch(err => {
      console.log(`Request error [${options ? options.method : 'GET'} ${path}]: `, err);
    });
};

export default customFetch;