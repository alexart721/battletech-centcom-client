import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <h2 className={styles.navbarText}>Battletech CENTCOM</h2>
      </div>
      <div className={styles.navbarBottomBorder}></div>
    </>
  );
}

export default Navbar;