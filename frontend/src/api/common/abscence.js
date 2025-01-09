import axios from '../config/axios'

export const createAbscence = data => axios.post(`/abscence`, data)
export const getAbscences = () => axios.get(`/abscence`)
export const getAbscence = id => axios.get(`/abscence/${id}`)
export const updateAbscence = (id, data) => axios.put(`/abscence/${id}`, data)
export const deleteAbscence = id => axios.delete(`/abscence/${id}`)
