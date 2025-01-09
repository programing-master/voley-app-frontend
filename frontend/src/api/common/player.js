import axios from '../config/axios'

export const createPlayerRequest = data => axios.post(`/player`, data)
export const getPlayersRequest = () => axios.get(`/player`)
export const getPlayerRequest = id => axios.get(`/player/${id}`)
export const getPlayerByRollProvinceRequest = (roll_id,province_id) => axios.get(`/player/${roll_id}/${province_id}`)

export const updatePlayerRequest = (id, data) =>
  axios.put(`/player/${id}`, data)
export const deletePlayerRequest = id => axios.delete(`/player/${id}`)
