import { createContext, useContext, useState, useEffect } from 'react'
import { createSectionRequest, deleteSectionRequest, getSectionRequest, getSectionsRequest, updateSectionRequest } from '../api/common/section'
import { ToastContainer, toast } from 'react-toastify'

const SectionContext = createContext()

export const useSection = () => {
  const context = useContext(SectionContext)
  if (!context) throw new Error('Donde esta el contexto')
  return context
}

export const SectionProvider = ({ children }) => {
  const [section, setSection] = useState([])
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

  const createSection = async data => {
    try {
      const res = await createSectionRequest(data)
      setSection(section => [...section, res.data])
      setSuccessMessage("Sesión agregada con éxito!")
      toast.success('Sesión agregada con éxito!', {
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
  const getSections = async data => {
    try {
      const res=await getSectionsRequest();
      setSection(res.data)
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const getSection = async id => {
    try {
      const res=await getSectionRequest(id);
      return res.data
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const updateSection = async (id,data) => {
    try {
      const res=await updateSectionRequest(id,data);
      setSuccessMessage("Sesión modificada con éxito!")
      toast.success('Sesión modificada con éxito!', {
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
  const deleteSection = async id => {
    try {
      const res=await deleteSectionRequest(id);
      setSuccessMessage("Sesión eliminada con éxito!")
      toast.success('Sesión eliminada con éxito!', {
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
    <SectionContext.Provider
      value={{
        section,
        err,
        successMessage,
        createSection,
        getSections,
        getSection,
        updateSection,
        deleteSection
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}
