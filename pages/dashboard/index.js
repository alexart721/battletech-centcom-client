import Head from 'next/head';
import { profile, createCampaign } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './dashboard.module.css';
import Link from 'next/link';

const initialUser = {
  firstName: ''
};

const initialCpgnInputs = {
  name: '',
  startDate: ''
}

export default function Dashboard () {
  const [user, setUser] = useState(initialUser);
  const [createCpgn, setCreateCpgn] = useState(false);
  const [currentCpgns, setCurrentCpgns] = useState(true);
  const [campaignInputs, setCampaignInputs] = useState(initialCpgnInputs);
  const { isAuthenticated, setAuth, setActiveId } = useContext(AuthContext);
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
    const { firstName } = res;
    setUser(oldUser => ({
      ...oldUser,
      firstName
    }));
  }, [isAuthenticated]);

  const handleCreateCampaign = (e) => {
    setCreateCpgn(currentStatus => {
      if (currentStatus) return false;
      return true;
    })
  }

  const handleCurrentCampaigns = (e) => {
    setCurrentCpgns(currentStatus => {
      if (currentStatus) return false;
      return true;
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignInputs((oldVals) => ({
      ...oldVals,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const res = await createCampaign(campaignInputs, accessToken);

    if (res.error || !res) {
      alert(`${res.message}`);
      console.log(res.error);
      setCampaignInputs(initialCpgnInputs);
    } else {
      const { id } = res;
      setActiveId('campaign', id);
      router.push('/mechs');
    }
  };

  const validateForm = () => {
    return !campaignInputs.name || !campaignInputs.startDate;
  };

  return (
    <div>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.dashboardPage}>
        <div className={styles.dashboardInfoSection}>
          <p className={styles.dashboardName}>Welcome, {user.firstName}</p>
          {createCpgn
            ? <div className={styles.createContainer}>
              <div className={styles.formTitle}>Create campaign</div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                  <input className={styles.input}
                    type="text"
                    placeholder="Campaign name"
                    name="name"
                    value={campaignInputs.name}
                    onChange={handleChange}
                  />
                  {!campaignInputs.name ? <span className={styles.reqFieldWarn}>Please enter a campaign name</span> : <></>}
                  <input className={styles.input}
                    type="date"
                    placeholder="Battletech start date"
                    name="startDate"
                    value={campaignInputs.startDate}
                    onChange={handleChange}
                  />
                  {!campaignInputs.startDate ? <span className={styles.reqFieldWarn}>Please enter a campaign start date</span> : <></>}
                </div>
                <div className={styles.createCpgnBtns}>
                  <button className={styles.cancelBtn} onClick={handleCreateCampaign}>
                    &nbsp;Cancel&nbsp;
                  </button>
                  <button className={styles.chooseMechBtn} type="submit" disabled={validateForm()}>
                    &nbsp;Choose mech &gt;&gt;&nbsp;
                  </button>
                </div>
              </form>
            </div>
            : <div className={styles.dashboardContainer}>
              {currentCpgns
                ? <div className={styles.formTitle}>Current campaigns</div>
                : <div className={styles.formTitle}>Past campaigns</div>}
              {currentCpgns
                ? <Link href="/dashboard"><a onClick={handleCurrentCampaigns}>View past campaigns</a></Link>
                : <Link href="/dashboard"><a onClick={handleCurrentCampaigns}>View current campaigns</a></Link>}
              <ul>
                <li>Campaign 3 <span>edit</span></li>
                <li>Campaign 4 <span>join</span></li>
              </ul>
              <button className={styles.formSubmit} onClick={handleCreateCampaign}>
                &nbsp;Create new campaign&nbsp;
              </button>
            </div>
          }
        </div>
        <div>{createCpgn
          ? <img height="800" src="https://intron.one/public/images/Dire_Wolf.jpg"/>
          : <img height="800" src="https://intron.one/public/images/Hellbringer_2.jpg"/>}</div>
      </div>
    </div>
  );
}