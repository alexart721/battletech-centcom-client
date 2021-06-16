import customFetch from './customFetch';

const getCampaign = (id, accessToken) => {
  return customFetch(`/campaigns/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getAllCampaigns = (accessToken) => {
  return customFetch('/campaigns', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getCurrentCampaigns = (accessToken) => {
  return customFetch('/campaigns/current', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getPastCampaigns = (accessToken) => {
  return customFetch('/campaigns/past', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const createCampaign = (campaign, accessToken) => {
  return customFetch('/campaigns', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(campaign)
  });
}

const updateCampaign = (campaign, accessToken) => {
  return customFetch(`/campaigns/${campaign.id}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(campaign)
  });
}

module.exports = {
  getCampaign,
  getAllCampaigns,
  getCurrentCampaigns,
  getPastCampaigns,
  createCampaign,
  updateCampaign
}