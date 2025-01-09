import { createContext, useContext, useEffect, useState } from 'react'
import {
  createCategoryRequest,
  deleteCategoryRequest,
  getCategoriesRequest,
  getCategoryRequest,
  updateCategoryRequest
} from '../api/common/category'
import { ToastContainer, toast } from 'react-toastify'

//creating a context
const CategoryContext = createContext()

//creating a custome hook
export const useCategory = () => {
  const context = useContext(CategoryContext)
  if (!context) throw new Error('Donde se encuentra el contexto?')
  return context
}

//creating a provider
export const CategoryProvider = ({ children }) => {
  const [err, setErr] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [category, setCategory] = useState([])

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

  const createCategory = async data => {
    try {
      const res = await createCategoryRequest(data)
      setCategory(category => [...category, res.data])
      setSuccessMessage('Se ha creado la categoría con éxito')
      toast.success('Se ha creado la categoría!', {
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
  const getCategories = async () => {
    try {
      const res = await getCategoriesRequest()
      setCategory(res.data)
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const getCategory = async id => {
    try {
      const res = await getCategoryRequest(id)
      return res.data
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }
  const updateCategory = async (id, data) => {
    try {
      const res = await updateCategoryRequest(id, data)
      setSuccessMessage('Se ha modificado la categoría con éxito')
      toast.success('Se ha modificado la categoría!', {
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
  const deleteCategory = async id => {
    try {
      try {
        const res = await deleteCategoryRequest(id)
        setSuccessMessage('Se ha eliminado la categoría con éxito')
        toast.success('Se ha eliminado la categoría!', {
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
    } catch (error) {
      setSuccessMessage('')
      setErr(error.response.data.msg)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        category,
        err,
        successMessage,
        createCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
