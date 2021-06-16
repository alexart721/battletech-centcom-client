import customFetch from './customFetch';

const createPilot = (pilot, accessToken) => {
  return customFetch('/pilots', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(pilot)
  });
}

const getPilots = (accessToken) => {
  return customFetch('/pilots', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getPilot = (id, accessToken) => {
  return customFetch(`/pilots/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getAssignedPilot = (campaignId, accessToken) => {
  return customFetch(`/pilots/assigned/${campaignId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

// pilot argument must have the database id for the pilot
const assignPilot = (pilot, campaignId, mechId, accessToken) => {
  return customFetch(`/pilots/assign/${campaignId}/${mechId}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(pilot)
  });
}

module.exports = {
  createPilot,
  getPilots,
  getPilot,
  getAssignedPilot,
  assignPilot
}