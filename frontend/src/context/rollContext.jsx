import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  createRollRequest,
  getRollRequest,
  getRollsRequest,
  updateRollRequest,
  deleteRollRequest
} from '../api/common/roll'

const RollContext = createContext()

export const useRoll = () => {
  const context = useContext(RollContext)
  if (!context) throw new Error('Donde se encuentra el contexto?')
  return context
}
export const RollProvider = ({ children }) => {
  const [roll, setRoll] = useState([])
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

  const createRoll = async data => {
    try {
      const res = await createRollRequest(data)
      setRoll(roll => [...roll, res.data])

      setSuccessMessage('Roll Agregado con éxito')

      toast.success('Roll Agregado con éxito!', {
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
  const getRolls = async () => {
    try {
      const res = await getRollsRequest()
      setRoll(res.data)
    } catch (err) {
      console.log(err)
      setErr(err.response.data.msg)
    }
  }
  const getRoll = async id => {
    try {
      const res = await getRollRequest(id)
      console.log(res.data)
      return res.data
    } catch (err) {
      console.log(err)

      setErr(err.response.data.msg)
    }
  }
  const updateRoll = async (id, data) => {
    try {
      const res = await updateRollRequest(id, data)
      toast.success('Se ha modificado el roll!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (err) {
      setErr(err.response.data.msg)
    }
  }
  const deleteRoll = async id => {
    try {
      const res = await deleteRollRequest(id)
      toast.success('Se ha eliminado el roll!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (err) {
      setErr(err.response.data.msg)
    }
  }

  return (
    <RollContext.Provider
      value={{
        createRoll,
        getRolls,
        getRoll,
        updateRoll,
        deleteRoll,
        roll,
        successMessage,
        err
      }}
    >
      {children}
    </RollContext.Provider>
  )
}
