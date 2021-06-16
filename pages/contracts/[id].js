import Head from 'next/head';
import { profile, getContract, updateContract, createContract } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './contracts.module.css';
import moment from 'moment';

const initialContract = {
  id: '',
  name: '',
  objectives: '',
  startDate: '',
  endDate: ''
};

export default function Contracts () {
  const [contract, setContract] = useState(initialContract);
  const { setAuth, activeIds, setActiveId } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (activeIds.campaign === 0) {
      alert('Please select a campaign.')
      router.push('/dashboard');
    }
    const accessToken = localStorage.getItem('accessToken');
    const res = await profile(accessToken);
    const reqContract = await getContract(id, accessToken);

    if (!res) {
      setAuth(false);
      alert('Please log in again.');
      return router.push('/');
    } else if (res.message) {
      setAuth(false);
      alert(`${res.message}`);
      return router.push('/');
    }

    if (id !== 'create') {
      const { id, name, objectives, startDate, endDate } = reqContract;
      setContract(prevContract => ({
        ...prevContract,
        id,
        name,
        objectives,
        startDate: (startDate ? moment(startDate).format('YYYY-MM-DD') : ''),
        endDate: (endDate ? moment(endDate).format('YYYY-MM-DD') : '')
      }));
    }
    setAuth(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'objectives') {
      setContract((prevContract) => ({
        ...prevContract,
        objectives: [value]
      }))
    } else {
      setContract((prevContract) => ({
        ...prevContract,
        [name]: value
      }));
    }
  }

  // const prepareContract = (cntrct) => {
  //   const objectivesArr = [cntrct.objectives];
  //   const returnContract = {
  //     ...cntrct,
  //     objectives: objectivesArr
  //   }
  //   return returnContract;
  // }

  const handleCreate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    // const sendContract = prepareContract(contract);
    const newContract = await createContract(contract, activeIds.campaign, accessToken);

    if (newContract.error) {
      alert(`${newContract.message}`);
    } else {
      alert('Contract created!');
      setActiveId('contract', newContract.id);
      router.push(`/campaigns/${activeIds.campaign}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const updatedContract = await updateContract(contract, accessToken);

    if (updatedContract.error) {
      setAuth(false);
      alert(`${updatedContract.message}`);
    } else {
      alert('Contract details updated!');
      router.push(`/campaigns/${activeIds.campaign}`);
    }
  };

  const handleGoBack = () => {
    router.push(`/campaigns/${activeIds.campaign}`);
  }

  return (
    <>
      <Head>
        <title>Battletech CENTCOM</title>
      </Head>
      <Navbar />
      <div className={styles.profilePage}>
        {id === 'create'
          ? <div className={styles.profileInfoSection}>
          <p className={styles.profileName}>Create contract</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleCreate}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>Contract name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Contract name"
                      name="name"
                      value={contract.name}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Objective: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Objective"
                      name="objectives"
                      value={contract.objectives} // Update when making list
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Start date: </span>
                  <input className={styles.input}
                      type="date"
                      name="startDate"
                      value={contract.startDate}
                      onChange={handleChange}
                    />
                </div>
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.formSubmit} onClick={handleGoBack}>
                  &nbsp;Back to campaign&nbsp;
                </button>
                <button className={styles.formSubmit} type="submit">
                  &nbsp;Create&nbsp;
                </button>
              </div>
            </form>
          </div>
        </div>
          : <div className={styles.profileInfoSection}>
          <p className={styles.profileName}>{contract.name}</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleUpdate}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>Contract name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Contract name"
                      name="name"
                      value={contract.name}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Objective: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Objective"
                      name="objectives"
                      value={contract.objectives[0]} // Update when making list
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Start date: </span>
                  <input className={styles.input}
                      type="date"
                      name="startDate"
                      value={contract.startDate}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>End date: </span>
                  <input className={styles.input}
                    type="date"
                    name="endDate"
                    value={contract.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.buttonRow}>
                <button className={styles.formSubmit} onClick={handleGoBack}>
                  &nbsp;Go back&nbsp;
                </button>
                <button className={styles.formSubmit} type="submit">
                  &nbsp;Update&nbsp;
                </button>
              </div>
            </form>
          </div>
        </div>
        }
        <div><img height="600" src="https://intron.one/public/images/King_Crab.jpg"/></div>
      </div>
    </>
  );
}