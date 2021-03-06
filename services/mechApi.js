import customFetch from './customFetch';

const createMech = (mech, accessToken) => {
  return customFetch('/mechs', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(mech)
  });
}

const getMechs = (accessToken) => {
  return customFetch('/mechs', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getMech = (id, accessToken) => {
  return customFetch(`/mechs/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getAssignedMech = (pilotId, accessToken) => {
  return customFetch(`/mechs/assigned/${pilotId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const assignMech = (mech, campaignId, accessToken) => {
  return customFetch(`/mechs/assign/${campaignId}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(mech)
  });
}

module.exports = {
  createMech,
  getMechs,
  getMech,
  getAssignedMech,
  assignMech
}