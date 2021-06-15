import Head from 'next/head';
import { profile, createCampaign, getCurrentCampaigns, getPastCampaigns } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './dashboard.module.css';
import Link from 'next/link';
import CampaignList from '../../components/CampaignList/CampaignList';

const initialUser = {
  firstName: ''
};

const initialCpgnInputs = {
  name: '',
  startDate: ''
}

export default function Dashboard () {
  const [user, setUser] = useState(initialUser);
  const [createCpgnView, setCreateCpgnView] = useState(false);
  const [viewCurrCampaigns, setViewCurrCampaigns] = useState(true);
  const [campaignInputs, setCampaignInputs] = useState(initialCpgnInputs);
  const [currentCampaigns, setCurrentCampaigns] = useState([]);
  const [pastCampaigns, setPastCampaigns] = useState([]);
  const { setAuth, setActiveId } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);
    const currCpgns = await getCurrentCampaigns(accessToken);
    const pastCpgns = await getPastCampaigns(accessToken);

    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }
    if (currCpgns.message) {
      alert(`${currCpgns.message}`);
    }
    if (pastCpgns.message) {
      alert(`${pastCpgns.message}`);
    }
    setAuth(true);
    const { firstName } = res;
    setUser(oldUser => ({
      ...oldUser,
      firstName
    }));
    setCurrentCampaigns(prevCpgns => prevCpgns.concat(currCpgns));
    setPastCampaigns(prevCpgns => prevCpgns.concat(pastCpgns));
  }, []);

  const handleCreateCampaign = (e) => {
    setCreateCpgnView(currentStatus => {
      if (currentStatus) return false;
      return true;
    })
  }

  const handleCurrentCampaigns = (e) => {
    setViewCurrCampaigns(currentStatus => {
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
          {createCpgnView
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
                {/* Invite players goes here */}
                <div className={styles.createCpgnViewBtns}>
                  <button className={styles.cancelBtn} onClick={handleCreateCampaign}>
                    &nbsp;Cancel&nbsp;
                  </button>
                  <button className={styles.chooseMechBtn} type="submit" disabled={validateForm()}>
                    &nbsp;Choose mech &gt;&gt;&nbsp;
                  </button>
                </div>
              </form>
            </div>
            : <div className={styles.campaignListContainer}>
              {viewCurrCampaigns
                ? <div className={styles.campaignList}>
                  <div className={styles.formTitle}>Current campaigns</div>
                  <Link href="/dashboard">
                    <a className={styles.changeCampaigns} onClick={handleCurrentCampaigns}>View past campaigns</a>
                  </Link>
                  <CampaignList campaigns={currentCampaigns}/>
                </div>
                : <div className={styles.campaignList}>
                  <div className={styles.formTitle}>Past campaigns</div>
                  <Link href="/dashboard">
                    <a className={styles.changeCampaigns} onClick={handleCurrentCampaigns}>View current campaigns</a>
                  </Link>
                  <CampaignList campaigns={pastCampaigns}/>
                </div>}
              <button className={styles.createButton} onClick={handleCreateCampaign}>
                &nbsp;Create new campaign&nbsp;
              </button>
            </div>
          }
        </div>
        <div>{createCpgnView
          ? <img height="800" src="https://intron.one/public/images/Dire_Wolf.jpg"/>
          : <img height="800" src="https://intron.one/public/images/Hellbringer_2.jpg"/>}</div>
      </div>
    </div>
  );
}