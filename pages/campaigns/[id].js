import Head from 'next/head';
import { profile, getCampaign, updateCampaign } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './campaigns.module.css';
import moment from 'moment';
import Link from 'next/link';
import CampaignList from '../../components/CampaignList/CampaignList';

const initialCpgnInputs = {
  id: '',
  name: '',
  startDate: '',
  endDate: ''
}

export default function Campaigns () {
  const router = useRouter();
  const { edit } = router.query;
  const [editCampaignView, setEditCampaignView] = useState(false);
  const [viewCurrCampaigns, setViewCurrCampaigns] = useState(true);
  const [campaignInputs, setCampaignInputs] = useState(initialCpgnInputs);
  const { setAuth, setActiveId } = useContext(AuthContext);

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const { id } = router.query;
    const res = await profile(accessToken);
    const campaign = await getCampaign(id, accessToken);

    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }
    if (campaign.message) {
      alert(`${campaign.message}`);
    }
    setAuth(true);
    const { name, startDate, endDate } = campaign;
    setCampaignInputs((oldVals) => ({
      ...oldVals,
      id,
      name,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD')
    }));
    if (edit) {
      setEditCampaignView(true);
    }
  }, []);

  const handleGoBack = (e) => {
    router.push('/dashboard');
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
    const res = await updateCampaign(campaignInputs, accessToken);

    if (res.error) {
      alert(`${res.message}`);
      console.log(res.error);
    } else {
      const { name, startDate, endDate } = res;
      setCampaignInputs((oldVals) => ({
        ...oldVals,
        name,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      }));
      alert('Campaign details updated!');
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
          <p className={styles.dashboardName}>{campaignInputs.name}</p>
          {editCampaignView
            ? <div className={styles.createContainer}>
              <div className={styles.formTitle}>Edit campaign details</div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formItem}>
                  <div className={styles.inputLine}>
                    <span>Campaign name: </span>
                    <input className={styles.input}
                      type="text"
                      placeholder="Campaign name"
                      name="name"
                      value={campaignInputs.name}
                      onChange={handleChange}
                    />
                  </div>
                  {!campaignInputs.name ? <span className={styles.reqFieldWarn}>Please enter a campaign name</span> : <></>}
                  <div className={styles.inputLine}>
                    <span>Start date: </span>
                    <input className={styles.input}
                      type="date"
                      name="startDate"
                      value={campaignInputs.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  {!campaignInputs.startDate ? <span className={styles.reqFieldWarn}>Please enter a campaign start date</span> : <></>}
                  <div className={styles.inputLine}>
                    <span>End date: </span>
                    <input className={styles.input}
                      type="date"
                      name="endDate"
                      value={campaignInputs.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Edit players goes here */}
                <div className={styles.editSubmit}>
                  <button className={styles.cancelBtn} onClick={handleGoBack}>
                    &nbsp;Go Back&nbsp;
                  </button>
                  <button className={styles.editSubmitBtn} type="submit" disabled={validateForm()}>
                    &nbsp;Submit&nbsp;
                  </button>
                </div>
              </form>
            </div>
            : <div className={styles.campaignListContainer}>
              Placeholder for campaign details
              {/* {viewCurrCampaigns
                ? <div className={styles.campaignList}>
                  <div className={styles.formTitle}>Current campaigns</div>
                  <Link href="/dashboard">
                    <a className={styles.changeCampaigns} onClick={handleCurrentCampaigns}>View past campaigns</a>
                  </Link>
                  <CampaignList currentCampaigns={currentCampaigns}/>
                </div>
                : <div className={styles.campaignList}>
                  <div className={styles.formTitle}>Past campaigns</div>
                  <Link href="/dashboard">
                    <a className={styles.changeCampaigns} onClick={handleCurrentCampaigns}>View current campaigns</a>
                  </Link>
                  <CampaignList pastCampaigns={pastCampaigns}/>
                </div>}
              <button className={styles.createButton} onClick={handleCreateCampaign}>
                &nbsp;Create new campaign&nbsp;
              </button> */}
            </div>
          }
        </div>
        <div>{editCampaignView
          ? <img height="800" src="https://intron.one/public/images/Elemental.jpg"/>
          : <div>Placeholder for user pilot and mech details</div>}</div>
      </div>
    </div>
  );
}