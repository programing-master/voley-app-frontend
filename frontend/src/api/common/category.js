import axios from '../config/axios'

export const createCategoryRequest = data =>
  axios.post(`/single/single-category`, data)
export const getCategoriesRequest = () => axios.get(`/single/single-category`)
export const getCategoryRequest = id => axios.get(`/single/single-category/${id}`)
export const updateCategoryRequest = (id, data) =>
  axios.put(`/single/single-category/${id}`, data)
export const deleteCategoryRequest = id => axios.delete(`/single/single-category/${id}`)
