import axios from '../config/axios'

export const createTrainingTypeRequest = data =>
  axios.post(`/training-type`, data)
export const getTrainingTypesRequest = () => axios.get(`/training-type`)
export const getTrainingTypeRequest = id => axios.get(`/training-type/${id}`)

export const updateTrainingTypeRequest = (id, data) =>
  axios.put(`/training-type/${id}`, data)
export const deleteTrainingTypeRequest = id =>
  axios.delete(`/training-type/${id}`)
