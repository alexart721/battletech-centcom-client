import styles from './MechItem.module.css';

const MechItem = ({ mech, selectedMech, handleClick }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  if (mech) {
    return (
      <div className={styles.mechItem}>
        <div className={mech.id === selectedMech.id ? styles.selectedMech : styles.mechImage} onClick={handleClick}>
          <img id={mech.id} height="350" src={`${mech.imageUrl}`}/>
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
        <br/>
        <div><span className={styles.mechSpecTitle}>Cost: </span>{formatter.format(mech.cost)}</div>
      </div>
    );
  } else {
    return (
      <></>
    );
  }
}

export default MechItem;