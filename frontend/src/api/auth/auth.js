import axios from "../config/axios"

export const registerRequest=(data)=>axios.post(`/auth/register`,data)
export const loginRequest=(data)=>axios.post(`/auth/login`,data)
export const verifyTokenRequest=()=>axios.get(`/auth/verify`)
export const logoutRequest=()=>axios.get(`/auth/logout`)
export const profileRequest=()=>axios.get(`/auth/profile`)

