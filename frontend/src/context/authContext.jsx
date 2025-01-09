import { useContext, createContext, useState, useEffect } from 'react'
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  logoutRequest,
  profileRequest
} from '../api/auth/auth.js'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('no se encuentra el contexto')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [err])

  useEffect(() => {
    let isMounted = true
    const checkLogin = async () => {
      try {
        const cookies = Cookies.get()
        if (!cookies.token) {
          if (isMounted) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
          }
          return
        }
        setLoading(true)
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data || !isMounted) {
          if (isMounted) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
          }
          return
        }
        if (isMounted) {
          setIsAuthenticated(true)
          setUser(res.data)

          setLoading(false)
          if (res.data.roll === 'Admin') {
            setIsAdmin(true)
          }
        }
      } catch (error) {
        console.error(error)
        if (isMounted) {
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
          setErr(error.message || 'Token verification failed')
        }
      }
    }
    checkLogin()
    return () => {
      isMounted = false
    }
  }, [])

  const signUp = async values => {
    try {
      const res = await registerRequest(values)
      setUser(res.data)
      if (res.data.roll === 'Entrenador') {
        setIsAdmin(true)
      }
      setIsAuthenticated(true)
    } catch (err) {
      setErr(err.response.data.msg)
      console.log(err)
      setIsAuthenticated(false)
    }
  }

  const signIn = async values => {
    try {
      const res = await loginRequest(values)
      setUser(res.data)
      setIsAuthenticated(true)

      return toast.success(res.data.msg, {
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
      setErr(err.response.data.msg)
      setIsAuthenticated(false)
    }
  }

  const profile=async()=>{
    try {
      const res=await profileRequest();
      return res.data
    } catch (error) {
      setErr(error.response.data.msg)
    }
  }
  const logout = async () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
    setIsAdmin(false)
  }
  return (
    <AuthContext.Provider
      value={{ signUp, isAdmin, err, user, isAuthenticated, signIn}}
    >
      {children}
    </AuthContext.Provider>
  )
}
