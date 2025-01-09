import React, { useEffect } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Alert, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { useCategory } from '../../context/categoryContext'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
export default function CategoryPage () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const {
    category,
    err,
    successMessage,
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
  } = useCategory()

  const args = useParams()

  useEffect(() => {
    getCategories()
  }, [category])
const navigate=useNavigate()
  const OnSubmit = handleSubmit(values => {
    try {
      if (args.id) {
        updateCategory(args.id, values)
        setValue('category_name', '')
        return navigate("/manage/category")
      } else {
        createCategory(values)
        setValue('category_name', '')
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    const loadCategory = async () => {
      if (args.id) {
        const res = await getCategory(args.id)
        setValue('category_name', res.category_name)
      }
    }
    loadCategory()
  }, [args.id])

  const table = ['Nombre de la categoría']
  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <ToastContainer />
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <TableBasic
          table={table}
          data={category}
          functionDelete={deleteCategory}
          functionRefresh={getCategories}
          url='category'
          atributes={['category_name']}
        />
      </section>
      <section className='shadow-md flex  flex-col w-[100%]  lg:w-[50%] h-[43%] border rounded pr-0 lg:mr-2 '>
        <ul className=' flex flex-col gap-1'>
          {err &&
            err.map((item, index) => (
              <Alert key={index} variant='filled' severity='error'>
                {item}
              </Alert>
            ))}
        </ul>
        <h1 className='p-4 '>
          {args.id ? <>Modifica la Categoría</> : <>Agrega nuevas Categorías</>}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-full flex flex-col justify-between h-full p-4 gap-4'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Categoría</span>
            <input
              placeholder='Inscribe una categoría'
              {...register('category_name', { required: true })}
              type='text'
              className='border text-sm rounded p-2'
            />
            {errors.category_name && (
              <p className='text-sm text-red-500'>La categoría es necesaria</p>
            )}
          </label>

          <div className='w-full flex  gap-2'>
            <Button
              type='submit'
              startIcon={<SaveIcon />}
              variant='contained'
              sx={{
                width: '40%'
              }}
            >
              {args.id ? <>Modificar</> : <>Guardar</>}
            </Button>
            <Button
              type='reset'
              variant='outlined'
              startIcon={<CleaningServicesIcon />}
            >
              Vaciar
            </Button>
          </div>
        </form>
        {successMessage && (
          <Alert severity='success' sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
      </section>
    </div>
  )
}
