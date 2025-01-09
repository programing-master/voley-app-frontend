import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  createTrainingTypeRequest,
  deleteTrainingTypeRequest,
  getTrainingTypeRequest,
  getTrainingTypesRequest,
  updateTrainingTypeRequest
} from '../api/common/trainingType'

const TrainingTypeContext = createContext()

export const useTrainingType = () => {
  const context = useContext(TrainingTypeContext)
  if (!context) throw new Error('Donde esta el context')
  return context
}

export const TrainingTypeProvider = ({ children }) => {
  const [trainingType, setTrainingType] = useState([])
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

  const createTrainingType = async data => {
    try {
      const res = await createTrainingTypeRequest(data)
      setTrainingType(type => [...type, res.data])
      setSuccessMessage('Se ha agregado el tipo de entrenamiento!')
      toast.success('Se ha agregado el tipo de entrenamiento!', {
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
  const getTrainingsType = async () => {
    try {
      const res = await getTrainingTypesRequest()
      console.log(res)
      setTrainingType(res.data)
    } catch (error) {
      setSuccessMessage('')
      console.log(error)
      setErr(error.response.data.msg)
    }
  }
  const updateTrainingType = async (id, data) => {
    try {
        const res=await updateTrainingTypeRequest(id,data);
        setSuccessMessage('Se ha modificado el tipo de entrenamiento!')

        toast.success('Se ha modificado el tipo de entrenamiento!', {
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
  const getTrainingType = async (id) => {
    try {
      const res = await getTrainingTypeRequest(id)
      return res.data
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const deleteTrainingType = async id => {
    try {
        const res=await deleteTrainingTypeRequest(id);
        setSuccessMessage('Se ha modificado el tipo de entrenamiento!')

        toast.success('Se ha modificado el tipo de entrenamiento!', {
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
    <TrainingTypeContext.Provider
      value={{
        trainingType,
        err,
        successMessage,
        createTrainingType,
        getTrainingsType,
        updateTrainingType,
        deleteTrainingType,
        getTrainingType
      }}
    >
      {children}
    </TrainingTypeContext.Provider>
  )
}
