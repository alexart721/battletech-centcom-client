import Head from 'next/head';
import { profile, getMech, createPilot, assignPilot } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './pilots.module.css';

const initialPilot = {
  firstName: '',
  lastName: ''
}

export default function Pilots () {
  const [pilot, setPilot] = useState(initialPilot);
  const [mech, setMech] = useState({});
  const { setAuth, setActiveId, activeIds } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);
    const reqMech = await getMech(activeIds.mech, accessToken);

    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }

    if (reqMech.message) {
      alert(`${res.message}`);
    }

    setAuth(true);
    for (const attribute in reqMech) {
      setMech(prevMech => ({
        ...prevMech,
        [attribute]: reqMech[attribute]
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPilot((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const newPilot = await createPilot(pilot, accessToken);
    const assignedPilot = await assignPilot(newPilot, activeIds.campaign, activeIds.mech, accessToken);
    if (!assignedPilot) {
      alert('Could not create pilot');
    } else if (assignedPilot.message) {
      alert(`${assignedPilot.message}`);
    } else {
      setActiveId('pilot', newPilot.id);
      router.push(`/campaigns/${activeIds.campaign}`)
    }
  }

  return (
    <>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.profilePage}>
        <div className={styles.profileInfoSection}>
          <p className={styles.profileName}>Create pilot</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>First name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="First name"
                      name="firstName"
                      value={pilot.firstName}
                      onChange={handleChange}
                    />
                </div>
                {!pilot.firstName ? <span className={styles.reqFieldWarn}>Please enter a first name</span> : <></>}
                <div className={styles.inputLine}>
                  <span>Last name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Last name"
                      name="lastName"
                      value={pilot.lastName}
                      onChange={handleChange}
                    />
                </div>
                {!pilot.lastName ? <span className={styles.reqFieldWarn}>Please enter a last name</span> : <></>}
              </div>
              <div className={styles.formItem}>
                <button className={styles.formSubmit} type="submit">
                  &nbsp;Submit&nbsp;
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.mechItem}>
          <div className={styles.yourMech}>Your mech</div>
          <div className={styles.mechImage}>
            <img id={mech.id} height="400" src={`${mech.imageUrl}`}/>
          </div>
          <div className={styles.mechName}>{mech.name}</div>
          <div>{mech.model}</div>
          <br/>
          <div className={styles.mechSpecTitle}>Damage</div>
          <ul className={styles.list}>
            <li>Short range: {mech.damageShort}</li>
            <li>Medium range: {mech.damageMed}</li>
            <li>Long range: {mech.damageLong}</li>
          </ul>
          <br/>
          <div><span className={styles.mechSpecTitle}>Armor: </span>{mech.armor}</div>
          <br/>
          <div><span className={styles.mechSpecTitle}>Structure: </span>{mech.structure}</div>
        </div>
      </div>
    </>
  );
}