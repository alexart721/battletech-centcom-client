import styles from './MechList.module.css';
import MechItem from '../MechItem/MechItem';

const MechList = ({ mechs, selectedMech, handleClick }) => {
  if (mechs) {
    return (
      <div className={styles.mechList}>
        {mechs.map(mech => (
          <MechItem key={mech.id} mech={mech} selectedMech={selectedMech} handleClick={handleClick} />
        ))}
      </div>
    );
  } else {
    return (<></>);
  }
}

export default MechList;