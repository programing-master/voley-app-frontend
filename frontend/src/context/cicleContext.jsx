import { createContext, useContext, useEffect, useState } from 'react'
import {
  createCicleRequest,
  deleteCicleRequest,
  getCicleByCategoryModalitySexRequest,
  getCicleRequest,
  getCiclesRequest,
  updateCicleRequest
} from '../api/common/cicle'
import { ToastContainer, toast } from 'react-toastify'

const CicleContext = createContext()

export const useCicle = () => {
  const context = useContext(CicleContext)
  if (!context) throw new Error('Donde esta el contexto')
  return context
}

export const CicleProvider = ({ children }) => {
  const [err, setErr] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [cicle, setCicle] = useState([])

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

  const createCicle = async data => {
    try {
      const res = await createCicleRequest(data)
      setCicle(cicles => [...cicles, res.data])
      setSuccessMessage('Se ha agregado el ciclo de entrenamiento!')
      toast.success('Se ha agregado el ciclo de entrenamiento!', {
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
      console.log(error)
      setErr(error.response.data.msg)
    }
  }
  const getCicles = async () => {
    try {
      const res = await getCiclesRequest()
      console.log(res)
      setCicle(res.data)
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const getCicle = async id => {
    try {
      const res = await getCicleRequest(id)
      console.log(res)
      return res.data;
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const updateCicle = async (id, data) => {
    try {
      const res = await updateCicleRequest(id, data)
      setSuccessMessage('Se ha modificado el ciclo de entrenamiento!')

      toast.success('Se ha modificado el ciclo de entrenamiento!', {
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
  const deletedCicle = async id => {
    try {
      const res = await deleteCicleRequest(id)
      setSuccessMessage('Se ha eliminado el ciclo de entrenamiento!')

      toast.success('Se ha eliminado el ciclo de entrenamiento!', {
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
const getCicleByCategoryModalitySex=async(category,modality,sex)=>{
  try {
    const res=await getCicleByCategoryModalitySexRequest(category,modality,sex);
    console.log(res)
    setCicle(res.data)
  } catch (error) {
    setSuccessMessage("")
    setErr(error.response.data.msg)
  }
}
  return (
    <CicleContext.Provider
      value={{
        cicle,
        err,
        successMessage,
        getCicleByCategoryModalitySex,
        createCicle,
        getCicles,
        getCicle,
        updateCicle,
        deletedCicle
      }}
    >
      {children}
    </CicleContext.Provider>
  )
}
