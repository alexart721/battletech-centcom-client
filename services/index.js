import { register, login, logout, profile, updateProfile } from './userApi';
import { getCampaign, getAllCampaigns, getCurrentCampaigns, getPastCampaigns, createCampaign, updateCampaign } from './campaignApi';
import { createMech, getMechs, assignMech } from './mechApi';

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
  assignMech
}