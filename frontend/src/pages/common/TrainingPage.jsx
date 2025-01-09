import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SaveIcon from '@mui/icons-material/Save'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { useCicle } from '../../context/cicleContext'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import { ToastContainer, toast } from 'react-toastify'
import { useCategory } from '../../context/categoryContext'
import { useModality } from '../../context/modalityContext'
import CardCicle from '../../components/common/CardCicle'
import RefreshIcon from '@mui/icons-material/Refresh'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useAction } from '../../context/actionContext'
import { useTrainingType } from '../../context/trainingTypeContext'
import { useTraining } from '../../context/trainingContext'
import CardTraining from '../../components/common/CardTraining'

export default function TrainingPage () {
  const [loading, setLoading] = useState(true)

  const {
    training,
    err,
    successMessage,
    createTraining,
    getTrainings,
    getTraining,
    updateTraining,
    deleteTraining,
    getTrainingOther
  } = useTraining()

  const { category, getCategories } = useCategory()
  const { modality, getModalities } = useModality()
  const { action, getActions } = useAction()
  const { cicle, getCicles } = useCicle()
  const { trainingType, getTrainingsType } = useTrainingType()

  const args = useParams()

  useEffect(() => {
    const loadTraining = async () => {
      if (args.id) {
        const res = await getTraining(args.id)
        console.log(res)
        setValue('objetive', res.objetive)
        setValue('action', res.action)
        setValue('type_training', res.type_training)
        setValue('id_cicle', res.id_cicle)
        setValue('id_category', res.id_category)
        setValue('id_modality', res.id_modality)
      }
    }
    loadTraining()
  }, [args.id])

  useEffect(() => {
   getCicles()
  }, [cicle])

  useEffect(() => {
    getCategories()
  }, [category])

  useEffect(() => {
    getModalities()
  }, [modality])

  useEffect(() => {
    getActions()
  }, [action])

  useEffect(() => {
    getCicles()
  }, [cicle])

  useEffect(() => {
    getTrainingsType()
  }, [trainingType])

  useEffect(() => {
    if (loading) {
      getTrainings()
    }
  }, [training])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const navigate = useNavigate()

  const OnSubmit = handleSubmit(data => {
    console.log(data)
    try {
      if (args.id) {
        const res = updateTraining(args.id, data)
        setValue('objetive', '')
        setValue('action', '')
        setValue('type_training', '')
        setValue('id_cicle', '')
        setValue('id_category', '')
        setValue('id_modality', '')
        return navigate('/manage/training')
      } else {
        const res = createTraining(data)
        setValue('objetive', '')
        setValue('action', '')
        setValue('type_training', '')
        setValue('id_cicle', '')
        setValue('id_category', '')
        setValue('id_modality', '')

        return navigate('/manage/training')
      }
    } catch (error) {
      console.log(error)
    }
  })
  const {
    register: filterRegister,
    handleSubmit: FilterSubmit,
    formState: { errorsFilter },
    setValue: filterValues
  } = useForm()

  const OnFilter = FilterSubmit((values) => {
    try {
      const { category, modality, action, type_training, id_cicle } = values
      setLoading(false)

      const res = getTrainingOther(
        category,
        modality,
        action,
        type_training,
        id_cicle
      )
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  })
  const handleChange = values => {
    OnFilter(values)
  }
  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] h-[40%]  pr-0 lg:mr-1 '>
        <div className='w-full  p-1 pt-2 flex flex-col gap-2 '>
          <span className=' ml-4  p-1'>Filtrar</span>
          <form
            onSubmit={OnFilter}
            onChange={handleChange}
            className='w-full  flex flex-col p-4 gap-4'
          >
            <div className='w-full flex flex-col lg:flex-row gap-2'>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Categoría</span>
                <select
                  {...filterRegister('category', { required: true })}
                  className='border rounded p-2 text-sm'
                >
                  {category &&
                    category.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.category_name}
                      </option>
                    ))}
                </select>
              </label>
              <label className='w-full flex flex-col gap-2 text-sm'>
                <span className='text-sm'>Modalidad</span>
                <select
                  {...filterRegister('modality', { required: true })}
                  className='border rounded p-2'
                >
                  {modality &&
                    modality.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.modality_name}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div className='w-full flex flex-col lg:flex-row gap-2'>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Acción</span>
                <select
                  {...filterRegister('action', { required: true })}
                  className='border rounded p-2 text-sm'
                >
                  {action &&
                    action.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.action}
                      </option>
                    ))}
                </select>
              </label>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Tipo de entrenamiento</span>
                <select
                  {...filterRegister('type_training', { required: true })}
                  className='border rounded p-2 text-sm'
                >
                  {trainingType &&
                    trainingType.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name_type}
                      </option>
                    ))}
                </select>
              </label>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Ciclo de entrenamiento</span>
                <select
                  {...filterRegister('id_cicle', { required: true })}
                  className='border rounded p-2 text-sm'
                >
                  {cicle &&
                    cicle.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.objetive}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div className='flex justify-between items-center gap-4'>
              <Button
                startIcon={<FilterListIcon />}
                variant='contained'
                type='submit'
                sx={{
                  width: '40%'
                }}
              >
                Filtrar
              </Button>
              <Tooltip title='Refrescar lista'>
                <IconButton
                  onClick={() => getTrainings()}
                  color='primary'
                  aria-label='add to shopping cart'
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </div>
          </form>
          <ul className='w-full flex flex-col gap-2'>
            {training &&
              training.map((props, index) => (
                <CardTraining
                  key={index}
                  props={props}
                  functionDelete={deleteTraining}
                />
              ))}
          </ul>
        </div>
      </section>
      <section className='shadow-md flex  flex-col w-[100%]  lg:w-[50%] h-[43%] border rounded pr-0 lg:mr-2 '>
        <ul className=' flex flex-col gap-1'>
          {err &&
            err.map((item, index) => (
              <Alert key={index} sx={{}} variant='filled' severity='error'>
                {item}
              </Alert>
            ))}
        </ul>
        <h1 className='p-4 '>
          {args.id ? (
            <>Modifica el Entrenamiento</>
          ) : (
            <>Agrega nuevos Entrenamientos</>
          )}
        </h1>
        <form onSubmit={OnSubmit} className='w-full flex flex-col p-4 gap-4'>
          <ToastContainer />

          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Objetivo del entrenamiento</span>
            <textarea
              {...register('objetive', { required: true })}
              type='text'
              placeholder='Escribe algo'
              className='border text-sm rounded p-2'
              rows={3}
              cols={60}
            />
            {errors.objetive && (
              <p className='text-sm text-red-500'>El objetivo es necesario</p>
            )}
          </label>

          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Acción</span>
              <select
                {...register('action', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {action &&
                  action.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.action}
                    </option>
                  ))}
              </select>
              {errors.action && (
                <p className='text-sm text-red-500'>La acción es necesaria</p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Tipo de entrenamiento</span>
              <select
                {...register('type_training', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {trainingType &&
                  trainingType.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.name_type}
                    </option>
                  ))}
              </select>
              {errors.typeTraining && (
                <p className='text-sm text-red-500'>
                  El tipo de entrenamiento es necesario
                </p>
              )}
            </label>
          </div>

          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Categoría</span>
              <select
                {...register('id_category', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {category &&
                  category.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.category_name}
                    </option>
                  ))}
              </select>
              {errors.category && (
                <p className='text-sm text-red-500'>
                  La categoría es necesaria
                </p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2 text-sm'>
              <span className='text-sm'>Modalidad</span>
              <select
                {...register('id_modality', { required: true })}
                className='border rounded p-2'
              >
                {modality &&
                  modality.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.modality_name}
                    </option>
                  ))}
              </select>
              {errors.modality && (
                <p className='text-sm text-red-500'>
                  La modalidad es necesaria
                </p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Ciclo de entrenamiento</span>
              <select
                {...register('id_cicle', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {cicle &&
                  cicle.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.objetive}
                    </option>
                  ))}
              </select>
              {errors.id_cicle && (
                <p className='text-sm text-red-500'>
                  El ciclo de entrenamiento
                </p>
              )}
            </label>
          </div>
          <div className='w-full flex  gap-2'>
            <Button
              startIcon={<SaveIcon />}
              type='submit'
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
