import Head from 'next/head';
import Navbar from '../../components/Navbar/Navbar';
import styles from './turns.module.css';

export default function Turns () {
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
          <b>Operation name placeholder</b>
          <br/>
          <b>Objective:</b> operation objective
        </div>
        <div className={styles.row}>
          <div className={styles.cell5} v-for="bonus in bonuses">
            <b>bonus title</b> - bonus effect (bonus owner)&nbsp;
          </div>
        </div>
        <div className={styles.tbl}>
          <div className={`${styles.tblRow} ${styles.mechRow}`} v-for="(mech, index) in friendlyMechs" index="index" mech-collection="friendly">
            <div className={`${styles.cell} ${styles.bordered}`}>
              <div className={styles.row}>
                <div className={styles.cell8}>mech name</div>
                {/* <!-- <div class="cell-1"><b>HP</b>: {{mech.hp}}</div> --> */}
                <div className={`${styles.cell1} ${styles.pl5} ${styles.textRight}`}><b>BTN</b>: mech btn</div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell8}>pilot</div>
                {/* <!-- <div class="cell-1"><b>FT</b>: {{mech.ft}}</div> --> */}
                <div className={`${styles.cell1} ${styles.pl5} ${styles.textRight}`}><b>TMM</b>: <span name="tmm">tmm</span></div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell8}></div>
                {/* <!-- <div class="cell-1 pl5"><b>MR</b>: {{mech.mr}}</div> --> */}
                <div className={`${styles.cell1} ${styles.pl5} ${styles.textRight}`}><b>EDG</b>: edge</div>
              </div>
            </div>
            <div className={`${styles.cell} ${styles.bordered}`}>
              <div className={styles.row}>
                <div v-if="mech.trackHeat === true" className={styles.cell3}><b>OV</b>:overheat</div>
                <div v-if="mech.trackHeat === true" className={`${styles.cell7} ${styles.textRight}`}><b>HT</b>:1|2|3|S</div>
                <div v-if="mech.trackHeat === false" className={styles.cell3}>&nbsp;</div>
                <div v-if="mech.trackHeat === false" className={`${styles.cell7} ${styles.textRight}`}>&nbsp;</div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell}><b>A</b>:
                  <input type="checkbox" className={styles.checkboxRound} v-for="n in mech.armor" />
                </div>
                <div v-if="!_.isUndefined(mech.th)" className={`${styles.cell1} ${styles.textRight}`}><b>TH</b>:thrust&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell}><b>S</b>:
                  <input type="checkbox" className={styles.checkboxRound} v-for="n in mech.structure" />
                </div>
                <div v-if="mech.moveType === 'a' || mech.moveType === 'v'" className={`${styles.cell} ${styles.textRight}`}><b>ALT</b>:S|M|L|E</div>
              </div>
            </div>
            {/* <div className={`${styles.cell} ${styles.bordered}`}>
              <div className={styles.row}>
                <div className={styles.cell3}><b>PV</b>: mech pv</div>
                <!-- <div className={`${styles.cell7} ${styles.textRight}`}><span v-if="mech.shortAccMod >= 0">+</span>{{mech.shortAccMod}} / <span v-if="mech.medAccMod >= 0">+</span>{{mech.medAccMod}} / <span v-if="mech.longAccMod >= 0">+</span>{{mech.longAccMod}}&nbsp;</div> -->
                <div className={`${styles.cell7} ${styles.textRight}`}><span name="acc" v-html="mech.accString()"></span></div>
              </div>
              <div className={styles.row}>
                <!-- <div className={`${styles.cell} ${styles.textRight}`}>&nbsp;{{mech.shortDmg}}&nbsp;/&nbsp;&nbsp;{{mech.medDmg}}&nbsp;/&nbsp;&nbsp;{{mech.longDmg}}&nbsp;</div> -->
                <div className={`${styles.cell} ${styles.textRight}`}><span name="dmg" v-html="mech.dmgString()">mech damage</span></div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell}><b>SPC</b>:&nbsp;mech specials</div>
              </div>
            </div>
            <div className={`${styles.cellStatic} ${styles.bordered}`}>
              <div className={styles.row}>
                <div className={styles.cell}><b>MV</b>: <span name="mv">mech movement</span></div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell5}><b>MP</b>:
                  <input type="checkbox" onClick="processCriticalHit" name="mp" className={styles.checkboxRound} v-for="n in mech.mp" />
                </div>
                <div className={`${styles.cell5} ${styles.pl5}`}><b>EN</b>:
                  <input type="checkbox" onClick="processCriticalHit" name="en" className={styles.checkboxRound} v-for="n in mech.en" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.cell5}><b>WP</b>:
                  <input type="checkbox" onClick="processCriticalHit" name="wp" className={styles.checkboxRound} v-for="n in mech.wp" />
                </div>
                <div className={`${styles.cell5} ${styles.pl5}`}><b>FC</b>:
                    <input type="checkbox" onClick="processCriticalHit" name="fc" className={styles.checkboxRound} v-for="n in mech.fc" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}