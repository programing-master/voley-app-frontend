import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  createPlayerRequest,
  deletePlayerRequest,
  getPlayerRequest,
  getPlayersRequest,
  updatePlayerRequest,
  getPlayerByRollProvinceRequest
} from '../api/common/player'

const PlayerContext = createContext()

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    console.log(context)
    throw new Error('Donde se encuentra el contexto?')
  }
  return context
}
export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState([])
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

  const createPlayer = async data => {
    try {
      const res = await createPlayerRequest(data)
      setPlayer(player => [...player, res.data])
      setSuccessMessage('Jugador Agregado con éxito')

      toast.success('Jugador Agregado con éxito!', {
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

      console.log(error)
    }
  }
  const getPlayers = async () => {
    try {
      const res = await getPlayersRequest()
      setPlayer(res.data)
    } catch (error) {
      setSuccessMessage('')

      setErr(error.response.data.msg)
    }
  }
  const getPlayer = async id => {
    try {
      const res = await getPlayerRequest(id)
      return res.data
    } catch (error) {
      setSuccessMessage('')

      setErr(error.response.data.msg)
    }
  }
  const getPlayerByRollProvince = async (roll_id, province_id) => {
    try {
      const res = await getPlayerByRollProvinceRequest(roll_id, province_id);
      setPlayer(res.data)
    } catch (error) {
      setSuccessMessage('')

      setErr(error.response.data.msg)
    }
  }
  const updatePlayer = async (id, data) => {
    try {
      const res = await updatePlayerRequest(id, data)
      setSuccessMessage('Jugador modificado con éxito')

      toast.success('Jugador modificado con éxito!', {
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
  const deletePlayer = async id => {
    try {
      const res = await deletePlayerRequest(id)
      setSuccessMessage('Jugador eliminado con éxito')

      toast.success('Jugador eliminado con éxito!', {
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
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  return (
    <PlayerContext.Provider
      value={{
        err,
        successMessage,
        player,
        createPlayer,
        getPlayer,
        getPlayers,
        updatePlayer,
        deletePlayer,
        getPlayerByRollProvince
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
