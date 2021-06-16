import Head from 'next/head';
import { profile, createMech } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './mechs.module.css';

const initialMech = {
  name: 'string',
  model: 'string',
  size: 'integer',
  cost: 'integer',
  movement: 'integer',
  jumpCapable: 'boolean',
  overHeatLimit: 'integer',
  damageShort: 'integer',
  damageMed: 'integer',
  damageLong: 'integer',
  armor: 'integer',
  structure: 'integer',
  imageUrl: 'string'
}

export default function MechCreator () {
  const [mech, setMech] = useState(initialMech);
  const { setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMech((prevMech) => ({
      ...prevMech,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    // Check the client-session to see how to handle redirects
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const newMech = await createMech(mech, accessToken);

    if (newMech.error) {
      alert(`${newMech.message}`);
    } else {
      alert('Mech created!');
      for (const attribute in newMech) {
        setMech(prevMech => ({
          ...prevMech,
          [attribute]: newMech[attribute]
        }));
      }
    }
  };

  return (
    <>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.mechCreatorPage}>
        <div className={styles.profileInfoSection}>
          <p className={styles.profileName}>Mech Creator</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>Name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={mech.name}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Model: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Model"
                      name="model"
                      value={mech.model}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Size: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Size"
                    name="size"
                    value={mech.size}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Cost: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Cost"
                    name="cost"
                    value={mech.cost}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Movement: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Movement"
                    name="movement"
                    value={mech.movement}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Jump Capable: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Jump Capable"
                    name="jumpCapable"
                    value={mech.jumpCapable}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Overheat Limit: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Overheat Limit"
                    name="overHeatLimit"
                    value={mech.overHeatLimit}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Damage Short: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Damage Short"
                    name="damageShort"
                    value={mech.damageShort}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Damage Med: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Damage Med"
                    name="damageMed"
                    value={mech.damageMed}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Damage Long: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Damage Long"
                    name="damageLong"
                    value={mech.damageLong}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Armor: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Armor"
                    name="armor"
                    value={mech.armor}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Structure: </span>
                  <input className={styles.input}
                    type="text"
                    placeholder="Structure"
                    name="structure"
                    value={mech.structure}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.inputLine}>
                  <span>Image Url: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Image Url"
                      name="imageUrl"
                      value={mech.imageUrl}
                      onChange={handleChange}
                    />
                </div>
              </div>
              <div className={styles.formItem}>
                <button className={styles.formSubmit} type="submit">
                  &nbsp;Create Mech&nbsp;
                </button>
              </div>
            </form>
          </div>
        </div>
        <div><img height="800" src="https://intron.one/public/images/Marauder.jpg"/></div>
      </div>
    </>
  );
}