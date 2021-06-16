import customFetch from './customFetch';

const getContract = (id, accessToken) => {
  return customFetch(`/contracts/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getCampaignCurrentContract = (campaignId, accessToken) => {
  return customFetch(`/contracts/current/${campaignId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getCampaignPastContracts = (campaignId, accessToken) => {
  return customFetch(`/contracts/past/${campaignId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const createContract = (contract, campaignId, accessToken) => {
  return customFetch(`/contracts/${campaignId}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(contract)
  });
}

const updateContract = (contract, accessToken) => {
  return customFetch(`/contracts/${contract.id}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(contract)
  });
}

module.exports = {
  getContract,
  getCampaignCurrentContract,
  getCampaignPastContracts,
  createContract,
  updateContract
}