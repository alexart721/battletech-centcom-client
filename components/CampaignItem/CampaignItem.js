import styles from './CampaignItem.module.css';
import Link from 'next/link';

const CampaignItem = ({ name, id }) => {
  if (name) {
    return (
      <li className={styles.campaignItem}>
        <Link href={`/campaigns/${id}`}>{name}</Link>{' '}
        <span className={styles.editText}><Link href={`/campaigns/${id}?edit=true`}>edit</Link></span>
      </li>
    );
  } else {
    return (
      <></>
    );
  }
}

export default CampaignItem;