import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  profile, getAssignedMech, getAssignedPilot,
  getContractCurrentOp
} from '../../services';
import Navbar from '../../components/Navbar/Navbar';
import styles from './turns.module.css';
import AuthContext from '../../services/AuthContext';

export default function Turns () {
  const [mech, setMech] = useState({});
  const [pilot, setPilot] = useState({});
  const [op, setOp] = useState({});
  const { setAuth, activeIds /* , setActiveId */ } = useContext(AuthContext);
  const router = useRouter();
  let mechArmorArr = [];
  let mechStructureArr = [];

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

    const reqPilot = await getAssignedPilot(activeIds.campaign, accessToken);
    const reqMech = await getAssignedMech(reqPilot.id, accessToken);
    const reqOp = await getContractCurrentOp(activeIds.contract, accessToken);
    mechArmorArr = Array.from({ length: reqMech.armor }, (x, i) => i);
    mechStructureArr = Array.from({ length: reqMech.structure }, (x, i) => i);

    // Make a function for these
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
    for (const attribute in reqOp) {
      setOp(prevOp => ({
        ...prevOp,
        [attribute]: reqOp[attribute]
      }));
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Battletech CENTCOM</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto Mono" rel="stylesheet"></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.13.0/underscore-umd.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      </Head>
      <Navbar />
      <div className={styles.testApp}>
        <div>
          <b>{op.name}</b>
          <br/>
          <b>Objective:</b> {op.objectives}
        </div>
        <div className={styles.row}>
          <div className={styles.cell5}>
            <b>Start date: </b>{op.startDate}&nbsp;
          </div>
        </div>
        <div className={styles.tbl}>
          <div className={`${styles.tblRow} ${styles.mechRow}`} mech-collection="friendly">
            <div className={`${styles.cell} ${styles.bordered}`}>
              <div className={styles.row}>
                <div className={styles.cell8}>{mech.name}</div>
                <div className={`${styles.cell1} ${styles.pl5} ${styles.textRight}`}><b>BTN</b>: {pilot.baseTargetNum}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell8}>{pilot.firstName} {pilot.lastName}</div>
                <div className={`${styles.cell1} ${styles.pl5} ${styles.textRight}`}><b>TMM</b>: <span name="tmm">{pilot.totalMovementModifier}</span></div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell8}></div>
                <div className={`${styles.cell1} ${styles.pl5} ${styles.textRight}`}><b>EDG</b>: {pilot.edge}</div>
              </div>
            </div>
            <div className={`${styles.cell} ${styles.bordered}`}>
              <div className={styles.row}>
                <div v-if="mech.trackHeat === true" className={styles.cell3}><b>OV</b>: {mech.overHeatLimit}</div>
                {/* <div v-if="mech.trackHeat === true" className={`${styles.cell7} ${styles.textRight} ${styles.right}`}><b>HT</b>:1|2|3|S</div> */}
                <div v-if="mech.trackHeat === false" className={styles.cell3}>&nbsp;</div>
                <div v-if="mech.trackHeat === false" className={`${styles.cell7} ${styles.textRight}`}>&nbsp;</div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell}><b>A</b>:
                  {mechArmorArr.map(element => (
                    <div className={styles.checkboxRound} key={mech.id + element}></div>
                  ))}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell}><b>S</b>:
                {mechStructureArr.map(element => (
                  <input type="checkbox" className={styles.checkboxRound} key={mech.id + element} />
                ))}
                </div>
                <div className={`${styles.cell} ${styles.textRight}`}><b>ALT</b>:S|M|L|E</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}