import { register, login, logout, profile, updateProfile } from './userApi';
import { getCampaign, getAllCampaigns, getCurrentCampaigns, getPastCampaigns, createCampaign, updateCampaign } from './campaignApi';
import { createMech, getMechs, getMech, getAssignedMech, assignMech } from './mechApi';
import { createPilot, getPilots, getPilot, getAssignedPilot, assignPilot } from './pilotApi';
import { getContract, getCampaignCurrentContract, getCampaignPastContracts, createContract, updateContract } from './contractApi';
import { getOp, getContractCurrentOp, getContractPastOps, createOp, updateOp } from './operationApi';

module.exports = {
  register,
  login,
  logout,
  profile,
  updateProfile,
  getCampaign,
  getAllCampaigns,
  getCurrentCampaigns,
  getPastCampaigns,
  createCampaign,
  updateCampaign,
  createMech,
  getMechs,
  getMech,
  getAssignedMech,
  assignMech,
  createPilot,
  getPilot,
  getPilots,
  getAssignedPilot,
  assignPilot,
  getContract,
  getCampaignCurrentContract,
  getCampaignPastContracts,
  createContract,
  updateContract,
  getOp,
  getContractCurrentOp,
  getContractPastOps,
  createOp,
  updateOp
}