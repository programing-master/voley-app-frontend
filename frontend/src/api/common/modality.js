import axios from '../config/axios'

export const createModalityRequest = data => axios.post(`/modality`, data)
export const getModalitiesRequest = () => axios.get(`/modality`)
export const getModalityRequest = id => axios.get(`/modality/${id}`)
export const updateModalityRequest = (id, data) => axios.put(`/modality/${id}`, data)
export const deleteModalityRequest = id => axios.delete(`/modality/${id}`)
