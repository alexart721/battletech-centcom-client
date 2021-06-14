import { register, login, logout, profile, updateProfile } from './userApi';
import { getCampaign, getCampaigns, createCampaign, updateCampaign } from './cpgnApi';

module.exports = {
  register,
  login,
  logout,
  profile,
  updateProfile,
  getCampaign,
  getCampaigns,
  createCampaign,
  updateCampaign
}