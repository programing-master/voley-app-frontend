import axios from '../config/axios'

//cicle completed requests
export const createCicleRequest = data => axios.post(`/cicle`, data)
export const getCiclesRequest = () => axios.get(`/cicle`)
export const getCicleRequest = id => axios.get(`/cicle/${id}`)
export const getCicleByCategoryModalitySexRequest = (category, modality, sex) =>
  axios.get(`/cicle/${category}/${modality}/${sex}`)

export const updateCicleRequest = (id, data) => axios.put(`/cicle/${id}`, data)
export const deleteCicleRequest = id => axios.delete(`/cicle/${id}`)
