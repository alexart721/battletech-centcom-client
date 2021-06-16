import Head from 'next/head';
import { profile, getOp, updateOp, createOp } from '../../services';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import AuthContext from '../../services/AuthContext';
import styles from './ops.module.css';
import moment from 'moment';

const initialOp = {
  id: '',
  name: '',
  objectives: '',
  startDate: '',
  endDate: ''
};

export default function Ops () {
  const [op, setOp] = useState(initialOp);
  const { setAuth, activeIds, setActiveId } = useContext(AuthContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    if (activeIds.campaign === 0) {
      alert('Please select a campaign/operation.')
      router.push('/dashboard');
    }
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

    if (id !== 'create') {
      const reqOp = await getOp(id, accessToken);
      const { name, objectives, startDate, endDate } = reqOp;
      setOp(prevOp => ({
        ...prevOp,
        id,
        name,
        objectives,
        startDate: (startDate ? moment(startDate).format('YYYY-MM-DD') : ''),
        endDate: (endDate ? moment(endDate).format('YYYY-MM-DD') : '')
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'objectives') {
      setOp((prevContract) => ({
        ...prevContract,
        objectives: [value]
      }))
    } else {
      setOp((prevContract) => ({
        ...prevContract,
        [name]: value
      }));
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const newOp = await createOp(op, activeIds.contract, accessToken);

    if (newOp.error) {
      alert(`${newOp.message}`);
    } else {
      setActiveId('op', newOp.id);
      router.push(`/campaigns/${activeIds.campaign}`);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const updatedOp = await updateOp(op, accessToken);

    if (updatedOp.error) {
      alert(`${updatedOp.message}`);
    } else {
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
          <p className={styles.profileName}>Create op</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleCreate}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>Op name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Op name"
                      name="name"
                      value={op.name}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Objective: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Objective"
                      name="objectives"
                      value={op.objectives} // Update when making list
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Start date: </span>
                  <input className={styles.input}
                      type="date"
                      name="startDate"
                      value={op.startDate}
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
          <p className={styles.profileName}>{op.name}</p>
          <div className={styles.profileContainer}>
            <form className={styles.form} onSubmit={handleUpdate}>
              <div className={styles.formItem}>
                <div className={styles.inputLine}>
                  <span>Op name: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Op name"
                      name="name"
                      value={op.name}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Objective: </span>
                  <input className={styles.input}
                      type="text"
                      placeholder="Objective"
                      name="objectives"
                      value={op.objectives[0]} // Update when making list
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>Start date: </span>
                  <input className={styles.input}
                      type="date"
                      name="startDate"
                      value={op.startDate}
                      onChange={handleChange}
                    />
                </div>
                <div className={styles.inputLine}>
                  <span>End date: </span>
                  <input className={styles.input}
                    type="date"
                    name="endDate"
                    value={op.endDate}
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
        <div><img height="600" src="https://intron.one/public/images/Timber_Wolf.jpg"/></div>
      </div>
    </>
  );
}