import { createContext, useContext, useEffect, useState } from 'react'
import {
  createModalityRequest,
  deleteModalityRequest,
  getModalitiesRequest,
  getModalityRequest,
  updateModalityRequest
} from '../api/common/modality'
import { ToastContainer, toast } from 'react-toastify'

//creating a context
const ModalityContext = createContext()

//creating a custome hook
export const useModality = () => {
  const context = useContext(ModalityContext)
  if (!context) throw new Error('Donde se encuentra el contexto?')
  return context
}

//creating a provider
export const ModalityProvider = ({ children }) => {
  const [modality, setModality] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [err, setErr] = useState(null)

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

  const createModality = async data => {
    try {
      const res = await createModalityRequest(data)
      setModality(modality => [...modality, res.data])
      setSuccessMessage('Se ha creado la modalidad con éxito!')
      toast.success('Se ha creado la modalidad !', {
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
  const getModalities = async () => {
    try {
      const res = await getModalitiesRequest()
      setModality(res.data)
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const getModality = async id => {
    try {
      const res = await getModalityRequest(id)
      return res.data
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const updateModality = async (id, data) => {
    try {
      const res = await updateModalityRequest(id, data)
      setSuccessMessage('Se ha modificado la modalidad con éxito!')
      toast.success('Se ha modificado la modalidad !', {
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
  const deleteModality = async id => {
    try {
      const res = await deleteModalityRequest(id)
      setSuccessMessage('Se ha eliminado la modalidad con éxito!')
      toast.success('Se ha eliminado la modalidad !', {
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

  return (
    <ModalityContext.Provider
      value={{
        modality,
        err,
        successMessage,
        createModality,
        getModalities,
        getModality,
        updateModality,
        deleteModality
      }}
    >
      {children}
    </ModalityContext.Provider>
  )
}
