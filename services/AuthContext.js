const { createContext } = require('react');

const AuthContext = createContext({
  isAuthenticated: false,
  setAuth: () => {},
  activeIds: {
    campaign: 0,
    contract: 0,
    op: 0,
    turn: 0,
    mech: 0,
    pilot: 0
  },
  setActiveId: () => {}
});

export default AuthContext;