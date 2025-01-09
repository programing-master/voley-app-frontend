import axios from '../config/axios'

export const createTrainingRequest = data => axios.post(`/training`, data)
export const getTrainingsRequest = () => axios.get(`/training`)
export const getTrainingRequest = id => axios.get(`/training/${id}`)
export const updateTrainingRequest = (id, data) =>
  axios.put(`/training/${id}`, data)
export const deleteTrainingRequest = id => axios.delete(`/training/${id}`)
export const getTrainingOtherRequest = (category, modality, action,type_training,id_cicle) =>
  axios.get(`/training/${category}/${modality}/${action}/${type_training}/${id_cicle}`)
