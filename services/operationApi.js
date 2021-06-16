import customFetch from './customFetch';

const getOp = (id, accessToken) => {
  return customFetch(`/ops/${id}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getContractCurrentOp = (contractId, accessToken) => {
  return customFetch(`/ops/current/${contractId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const getContractPastOps = (contractId, accessToken) => {
  return customFetch(`/ops/past/${contractId}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });
}

const createOp = (op, contractId, accessToken) => {
  return customFetch(`/ops/${contractId}`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(op)
  });
}

const updateOp = (op, accessToken) => {
  return customFetch(`/ops/${op.id}`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(op)
  });
}

module.exports = {
  getOp,
  getContractCurrentOp,
  getContractPastOps,
  createOp,
  updateOp
}