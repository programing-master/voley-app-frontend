import axios from '../config/axios'

export const createSectionRequest = data => axios.post(`/section`, data)
export const getSectionsRequest = () => axios.get(`/section`)
export const getSectionRequest = id => axios.get(`/section/${id}`)
export const updateSectionRequest = (id, data) => axios.put(`/section/${id}`, data)
export const deleteSectionRequest = id => axios.delete(`/section/${id}`)
