import axios from "../config/axios"

export const createRollRequest=(data)=>axios.post(`/roll`,data);
export const getRollsRequest=()=>axios.get(`/roll`);
export const getRollRequest=(id)=>axios.get(`/roll/${id}`);
export const updateRollRequest=(id,data)=>axios.put(`/roll/${id}`,data);
export const deleteRollRequest=(id)=>axios.delete(`/roll/${id}`);