import axios from '../config/axios'

export const createProvinceRequest = data => axios.post('/province', data)
export const getProvincesRequest = () => axios.get('/province')
export const getProvinceRequest = id => axios.get(`/province/${id}`)
export const deleteProvinceRequest = id => axios.delete(`/province/${id}`)
export const updateProvinceRequest = (id, data) =>
  axios.put(`/province/${id}`, data)
