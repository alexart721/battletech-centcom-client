import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import AuthContext from '../../services/AuthContext';
import { logout } from '../../services';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = async (e) => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await logout('accessToken', accessToken);
    setAuth(false);
    alert(`${res.message}`);
    router.push('/');
  }

  return (
    <div>
      <div className={styles.navbar}>
        <h2 className={styles.navbarText}>Battletech CENTCOM</h2>
        {isAuthenticated
          ? <div className={styles.navButtons}>
            <Link href="/dashboard"><a className={styles.navBtn}><img src="/compass.png" height="25"/></a></Link>
            <Link href="/profile"><a className={styles.navBtn}><img src="user.png" height="25"/></a></Link>
            <Link href="/"><a className={styles.navBtn} onClick={handleClick}>Logout</a></Link>
          </div>
          : <></>}
      </div>
      <div className={styles.navbarBottomBorder}></div>
    </div>
  );
}

export default Navbar;