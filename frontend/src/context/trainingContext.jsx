import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  createTrainingRequest,
  deleteTrainingRequest,
  getTrainingOtherRequest,
  getTrainingRequest,
  getTrainingsRequest,
  updateTrainingRequest
} from '../api/common/training'

const TrainingContext = createContext()

export const useTraining = () => {
  const context = useContext(TrainingContext)
  if (!context) throw new Error('Donde esta el contexto')
  return context
}

export const TrainingProvider = ({ children }) => {
  const [training, setTraining] = useState([])
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

  const createTraining = async data => {
    try {
      const res = await createTrainingRequest(data)
      console.log(res)
      setTraining(trainings => [...trainings, res.data])
      setSuccessMessage('Entrenamiento agregado con éxito!')
      toast.success('Entrenamiento agregado con éxito!', {
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
  const getTrainings = async () => {
    try {
      const res = await getTrainingsRequest()
      console.log(res)
      setTraining(res.data)
    } catch (error) {
      setSuccessMessage('')
      console.log(error)

      setErr(error.response.data.msg)
    }
  }
  const getTraining = async id => {
    try {
      const res = await getTrainingRequest(id)
      return res.data;
    } catch (error) {
      console.log(error)
      setErr(error.response.data.msg)
    }
  }
  const updateTraining = async (id, data) => {
    try {
      const res=await updateTrainingRequest(id,data)
      setSuccessMessage("Entrenamiento modificado con éxito!")
      toast.success('Entrenamiento modificado con éxito!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      setSuccessMessage("")
      setErr(error.response.data.msg)
    }
  }
  const deleteTraining = async id => {
    try {
      const res = await deleteTrainingRequest(id)
      setSuccessMessage('Entrenamiento eliminado con éxito!')
      toast.success('Entrenamiento eliminado con éxito!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      setSuccessMessage("")

      setErr(error.response.data.msg)
    }
  }

const getTrainingOther=async(category,modality,action,type_training,id_cicle)=>{
  try {
    const res=await getTrainingOtherRequest(category,modality,action,type_training,id_cicle);
    return res.data
  } catch (error) {
    setSuccessMessage("")
    setErr(error.response.data.msg)
  }
}

  return (
    <TrainingContext.Provider
      value={{
        training,
        err,
        successMessage,
        createTraining,
        getTrainings,
        getTraining,
        updateTraining,
        deleteTraining,
        getTrainingOther
      }}
    >
      {children}
    </TrainingContext.Provider>
  )
}
