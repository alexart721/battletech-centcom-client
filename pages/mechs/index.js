import Head from 'next/head';
import { profile, getMechs, assignMech } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './mechs.module.css';
import MechList from '../../components/MechList/MechList';

const initialMech = {
  name: '',
  model: '',
  status: '',
  size: '',
  cost: '',
  movement: '',
  jumpCapable: '',
  overHeatLimit: '',
  damageShort: '',
  damageMed: '',
  damageLong: '',
  armor: '',
  structure: '',
  imageUrl: ''
}

export default function Mechs () {
  const [mechs, setMechs] = useState([]);
  const [selectedMech, setSelectedMech] = useState(initialMech);
  const { setAuth, setActiveId, activeIds } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);
    const mechRes = await getMechs(accessToken);

    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }
    setAuth(true);
    setMechs(prevMechs => prevMechs.concat(mechRes));
  }, []);

  const handleSubmit = async (e) => {
    // Check the client-session to see how to handle redirects
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const res = await assignMech(selectedMech, activeIds.campaign, accessToken);
    if (res.error) {
      alert(`${res.message}`);
    } else {
      setActiveId('mech', res.id);
      router.push('/pilots');
    }
  }

  const handleClick = (e) => {
    const clickedMech = mechs.filter(mech => mech.id === parseInt(e.target.id))[0];
    for (const attribute in clickedMech) {
      setSelectedMech(prevMech => ({
        ...prevMech,
        [attribute]: clickedMech[attribute]
      }));
    }
  }

  return (
    <>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.profilePage}>
          <p className={styles.profileName}>Choose Mech</p>
          <MechList mechs={mechs} selectedMech={selectedMech} handleClick={handleClick} />
          <button className={styles.formSubmit} onClick={handleSubmit}>
            &nbsp;Create Pilot &gt;&gt;&nbsp;
          </button>
      </div>
    </>
  );
}