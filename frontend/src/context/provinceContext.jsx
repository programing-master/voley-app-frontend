import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  createProvinceRequest,
  getProvinceRequest,
  getProvincesRequest,
  deleteProvinceRequest,
  updateProvinceRequest
} from '../api/common/province'

const ProvinceContext = createContext()

export const useProvince = () => {
  const context = useContext(ProvinceContext)
  if (!context) throw new Error('Donde se encuentra el contexto?')
  return context
}

export const ProvinceProvider = ({ children }) => {
  const [province, setProvince] = useState([])
  const [err, setErr] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr(null)
    }, 5000)
    return () => clearTimeout(timer)
  }, [err])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
    return () => clearTimeout(timer)
  }, [successMessage])

  const createProvince = async data => {
    try {
      const res = await createProvinceRequest(data)
      setProvince(province => [...province, res.data])
      setSuccessMessage('Provincia agregada con éxito')
      toast.success('Se ha creado la Provincia!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const getProvinces = async () => {
    try {
      const res = await getProvincesRequest()
      setProvince(res.data)
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const getProvince = async id => {
    try {
      const res = await getProvinceRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
      setErr(error.response.data.msg)
    }
  }
  const deleteProvince = async id => {
    try {
      const res = await deleteProvinceRequest(id)
      toast.success('Se ha eliminado la Provincia!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      console.log(error)
      setErr(error.response.data.msg)
    }
  }
  const updateProvince = async (id, data) => {
    try {
      const res = await updateProvinceRequest(id, data)
      toast.success('Se ha modificado la Provincia!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      setErr(error.response.data.msg)
    }
  }

  return (
    <ProvinceContext.Provider
      value={{
        province,
        err,
        successMessage,
        createProvince,
        getProvinces,
        getProvince,
        deleteProvince,
        updateProvince
      }}
    >
      {children}
    </ProvinceContext.Provider>
  )
}
