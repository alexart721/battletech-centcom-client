import styles from './CampaignList.module.css';
import CampaignItem from '../CampaignItem/CampaignItem';

const CampaignList = ({ campaigns }) => {
  if (campaigns) {
    return (
      <ul className={styles.campaignList}>
        {campaigns.map(campaign => (<CampaignItem key={campaign.id} name={campaign.name} id={campaign.id} />))}
      </ul>
    );
  } else {
    return (<></>);
  }
}

export default CampaignList;