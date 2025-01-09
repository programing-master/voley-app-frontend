import axios from '../config/axios'

export const createActionRequest = data => axios.post(`/action`, data)
export const getActionRequest = () => axios.get(`/action`)
export const updateActionRequest = (id, data) =>
  axios.put(`/action/${id}`, data)
export const deleteActionRequest = id => axios.delete(`/action/${id}`)
export const getOnlyActionRequest = (id) => axios.get(`/action/${id}`)
