import styles from './Contract.module.css';
import Link from 'next/link';

const Contract = ({ contract }) => {
  const handleCreateOp = () => {

  }

  if (contract) {
    return (
      <div>
        <div className={styles.contractContainer}>
          <div className={styles.contractName}>
            {contract.name}
            <span className={styles.editText}><Link href={`/contracts/${contract.id}`}>edit</Link></span>
          </div>
          <div className={styles.detail}><span className={styles.key}>Start date:</span> {contract.startDate}</div>
          <div className={styles.detail}><span className={styles.key}>Objective:</span> {contract.objectives[0]}</div>
          {/* Logic here to show button or op name as link */}
        </div>
        <div className={styles.createOp}>
          <button className={styles.editSubmitBtn} onClick={handleCreateOp}>
            &nbsp;New Op&nbsp;
          </button>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
}

export default Contract;