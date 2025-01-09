import React, { useEffect } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SaveIcon from '@mui/icons-material/Save'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useSection } from '../../context/sectionContext'
import Alert from '@mui/material/Alert'
import { useNavigate, useParams } from 'react-router-dom'
import { useTraining } from '../../context/trainingContext'
import CardSection from '../../components/common/CardSection'

export default function SesionPage () {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const {
    section,
    err,
    successMessage,
    createSection,
    getSections,
    getSection,
    updateSection,
    deleteSection
  } = useSection()

  const { training, getTrainings } = useTraining()

  const OnSubmit = handleSubmit(values => {
    try {
      if (args.id) {
      } else {
        const res = createSection(values)
        setValue('id_training', '')
        setValue('firstDate', '')
        setValue('endDate', '')
        return navigate('/manage/sesion')
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    getTrainings()
  }, [training])
  useEffect(() => {
    getSections()
  }, [section])

  const table = ['Objetivo de la sesión', 'Inicio', 'Fin']
  const args = useParams()
  const navigate = useNavigate()
  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <div className='w-full  p-1 pt-4 flex flex-col gap-2  '>
          <span className=' ml-4  p-1'>Filtrar</span>
          <form className='w-full  flex flex-col p-4 gap-4'>
            <div className='w-full flex flex-col lg:flex-row gap-2'>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Training</span>
                <select className='border rounded p-2 text-sm'>
                  <option value='mt-sub23 text-sm'>objetive 1</option>
                  <option value='mt-sub23 text-sm'>objetive 1</option>
                </select>
              </label>
            </div>
            <Button
              startIcon={<FilterListIcon />}
              variant='contained'
              sx={{
                width: '50%'
              }}
            >
              Filtrar
            </Button>
          </form>
        </div>
        <ul className='w-full flex flex-col gap-2'>
          {section &&
            section.map((item, index) => (
              <CardSection
                props={item}
                functionDelete={deleteSection}
                key={index}
              />
            ))}
        </ul>
      </section>
      <section className='shadow-md flex  flex-col w-[100%]  lg:w-[50%] h-[49%] border rounded pr-0 lg:mr-2'>
        <ToastContainer />
        <ul className=' flex flex-col gap-1'>
          {err &&
            err.map((item, index) => (
              <Alert key={index} variant='filled' severity='error'>
                {item}
              </Alert>
            ))}
        </ul>
        <h1 className='p-4 '>
          {args.id ? (
            <>Modifica la Sesión de entrenamiento</>
          ) : (
            <>Agrega nuevas sesiones de entrenamientos</>
          )}
        </h1>
        <form onSubmit={OnSubmit} className='w-full flex flex-col p-4 gap-4'>
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Entrenamiento</span>
            <select
              {...register('id_training', { required: true })}
              className='border rounded p-2 text-sm'
            >
              {training &&
                training.map((item, index) => (
                  <option value={item._id}>{item.objetive}</option>
                ))}
            </select>
            {errors.id_training && (
              <p className='text-red-500 text-sm'>
                El entrenamiento es requerido
              </p>
            )}
          </label>
          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Fecha de Inicio</span>
              <input
                {...register('firstDate', { required: true })}
                type='datetime-local'
                className='border text-sm rounded p-2'
                rows={5}
                cols={60}
              />
              {errors.firstDate && (
                <p className='text-red-500 text-sm'>
                  La fecha de inicio es requerida
                </p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Fecha de Fin</span>
              <input
                {...register('endDate', { required: true })}
                type='datetime-local'
                className='border text-sm rounded p-2'
                rows={5}
                cols={60}
              />
              {errors.endDate && (
                <p className='text-red-500 text-sm'>
                  La fecha de fin es requerida
                </p>
              )}
            </label>
          </div>

          <div className='w-full flex  gap-2'>
            <Button
              startIcon={<SaveIcon />}
              variant='contained'
              type='submit'
              sx={{
                width: '40%'
              }}
            >
              {args.id ? <>Modificar</> : <>Guardar</>}
            </Button>
            <Button
              variant='outlined'
              type='reset'
              sx={{
                width: '40%'
              }}
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
