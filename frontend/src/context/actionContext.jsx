import {
  createActionRequest,
  deleteActionRequest,
  getActionRequest,
  updateActionRequest,
  getOnlyActionRequest
} from '../api/common/actions'
import { ToastContainer, toast } from 'react-toastify'

import { useContext, createContext, useState, useEffect } from 'react'

const ActionContext = createContext()

export const useAction = () => {
  const context = useContext(ActionContext)
  if (!context) throw new Error('Donde se encuentra el contexto?')
  return context
}

export const ActionProvider = ({ children }) => {
  const [action, setAction] = useState([])
  const [err, setErr] = useState(null)
  const [selected, setSelected] = useState(false)
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

  const createAction = async values => {
    try {
      const res = await createActionRequest(values)
      setAction(action => [...action, res.data])
      console.log(action)
      toast.success('Se ha creado la acción!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
      setSuccessMessage('Acción agregada con éxito')
    } catch (error) {
      setSuccessMessage('')
      console.log(error)
      setErr(error.response.data.msg)
    }
  }

  const getActions = async () => {
    try {
      const res = await getActionRequest()
      setAction(res.data)
    } catch (error) {
      console.log(error)
      
      console.log(error)
      setSuccessMessage("")
      setErr(error.response.data.msg)
    }
  }

  const getAction = async id => {
    try {
      const res = await getOnlyActionRequest(id)
      return res.data
    } catch (error) {
      
      console.log(error)
      setSuccessMessage("")
      setErr(error.response.data.msg)
    }
  }

  const deleteAction = async id => {
    try {
      const res = await deleteActionRequest(id)

      toast.success('Se ha eliminado la acción!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        progress: undefined
      })
    } catch (err) {
      
      console.log(err)
      setSuccessMessage("")
      setErr(err.response.data.msg)
    }
  }
  const updateAction = async (id, data) => {
    try {
      const res = await updateActionRequest(id, data)

      toast.success('Se ha modificado la acción!', {
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
      setSuccessMessage("")
      setErr(error.response.data.msg)
    }
  }
  return (
    <ActionContext.Provider
      value={{
        action,
        createAction,
        err,
        successMessage,
        getActions,
        deleteAction,
        updateAction,
        getAction,
        selected,
        setSelected
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
