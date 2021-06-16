import Head from 'next/head';
import {
  profile, getCampaign, updateCampaign, getAssignedMech,
  getAssignedPilot, getCampaignCurrentContract
} from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './campaigns.module.css';
import moment from 'moment';
import Contract from '../../components/Contract/Contract';

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
  // const [viewCurrCampaigns, setViewCurrCampaigns] = useState(true);
  const [campaignInputs, setCampaignInputs] = useState(initialCpgnInputs);
  const [mech, setMech] = useState({});
  const [pilot, setPilot] = useState({});
  const [contract, setContract] = useState({});
  const [activeContract, setActiveContract] = useState(false);
  const { setAuth, activeIds, setActiveId } = useContext(AuthContext);

  useEffect(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);

    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.error) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }
    setAuth(true);

    const { id } = router.query;
    const campaign = await getCampaign(id, accessToken);
    if (campaign.error) {
      alert(`${campaign.message}`);
    }
    const { name, startDate, endDate } = campaign;
    setCampaignInputs((oldVals) => ({
      ...oldVals,
      id,
      name,
      startDate: (startDate ? moment(startDate).format('YYYY-MM-DD') : ''),
      endDate: (endDate ? moment(endDate).format('YYYY-MM-DD') : '')
    }));

    if (edit) {
      setEditCampaignView(true);
    } else {
      const reqPilot = await getAssignedPilot(id, accessToken);
      const reqMech = await getAssignedMech(reqPilot.id, accessToken);
      const reqContract = await getCampaignCurrentContract(id, accessToken);
      if (activeIds.campaign === 0) {
        setActiveId('campaign', id);
      }
      if (activeIds.pilot === 0) {
        setActiveId('pilot', reqPilot.id);
      }
      if (activeIds.mech === 0) {
        setActiveId('mech', reqMech.id);
      }
      if (reqContract && activeIds.contract === 0) {
        setActiveId('contract', reqContract.id);
      }
      for (const attribute in reqMech) {
        setMech(prevMech => ({
          ...prevMech,
          [attribute]: reqMech[attribute]
        }));
      }
      for (const attribute in reqPilot) {
        setPilot(prevPilot => ({
          ...prevPilot,
          [attribute]: reqPilot[attribute]
        }));
      }
      for (const attribute in reqContract) {
        setContract(prevContract => ({
          ...prevContract,
          [attribute]: reqContract[attribute]
        }));
      }
      if (contract) {
        setActiveContract(true);
      }
    }
  }, []);

  const handleGoBack = (e) => {
    router.push('/dashboard');
  }

  // const handleCurrentCampaigns = (e) => {
  //   setViewCurrCampaigns(currentStatus => {
  //     if (currentStatus) return false;
  //     return true;
  //   })
  // }

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
  }

  const handleCreateContract = () => {
    router.push('/contracts/create');
  }

  const validateForm = () => {
    return !campaignInputs.name || !campaignInputs.startDate;
  }

  return (
    <div>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      {/* Create a component for campaign edit */}
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
                    &nbsp;Go back&nbsp;
                  </button>
                  <button className={styles.editSubmitBtn} type="submit" disabled={validateForm()}>
                    &nbsp;Submit&nbsp;
                  </button>
                </div>
              </form>
            </div>
            : <div className={styles.campaignListContainer}>
              {activeContract
                ? <Contract contract={contract} />
                : <div className={styles.createContract}>
                  <button className={styles.editSubmitBtn} onClick={handleCreateContract}>
                    &nbsp;New Contract&nbsp;
                  </button>
                </div>
              }
            </div>
          }
        </div>
        <div>{editCampaignView
          ? <img height="800" src="https://intron.one/public/images/Elemental.jpg"/>
          : <div>
            <div className={styles.mechItem}>
              <div className={styles.yourMech}>{pilot.firstName} {pilot.lastName}</div>
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
          </div>}
        </div>
      </div>
    </div>
  );
}