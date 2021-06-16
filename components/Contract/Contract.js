import styles from './Contract.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Contract = ({ contract, op }) => {
  const router = useRouter();
  let showOp = false;
  if (op) showOp = true;

  const handleCreateOp = () => {
    router.push('/ops/create');
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
        </div>
        {showOp
          ? <div className={styles.showOp}>
            <div className={styles.detail}>
              <span className={styles.key}>Current op:</span> <Link href={'/turns'}>{op.name}</Link>
              <span className={styles.editText}><Link href={`/ops/${op.id}`}>edit</Link></span>
            </div>
          </div>
          : <div className={styles.createOp}>
            <button className={styles.editSubmitBtn} onClick={handleCreateOp}>
              &nbsp;New Op&nbsp;
            </button>
          </div>
        }
      </div>
    );
  } else {
    return (<></>);
  }
}

export default Contract;