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

export default function CiclePage () {
  const [loading, setLoading] = useState(true)

  const {
    cicle,
    err,
    successMessage,
    createCicle,
    getCicles,
    getCicle,
    updateCicle,
    getCicleByCategoryModalitySex,
    deletedCicle
  } = useCicle()

  const { category, getCategories } = useCategory()
  const { modality, getModalities } = useModality()

  const args = useParams()

  useEffect(() => {
    const loadCicle = async () => {
      if (args.id) {
        const res = await getCicle(args.id)
        console.log(res)
        setValue('objetive', res.objetive)
        setValue('firstDate', res.firsDate)
        setValue('endDate', res.endDate)
        setValue('cantTrainings', res.cantTrainings)
        setValue('sex', res.sex)
        setValue('category', res.category)
        setValue('modality', res.modality)
      }
    }
    loadCicle()
  }, [args.id])

  useEffect(() => {
    if (loading) {
      getCicles()
    }
  }, [cicle])

  useEffect(() => {
    getCategories()
  }, [category])

  useEffect(() => {
    getModalities()
  }, [modality])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const navigate = useNavigate()

  const OnSubmit = handleSubmit(data => {
    const values = {
      objetive: data.objetive,
      firstDate: data.firstDate,
      endDate: data.endDate,
      cantTrainings: parseInt(data.cantTrainings),
      sex: data.sex,
      category: data.category,
      modality: data.modality
    }

    try {
      if (args.id) {
        const res = updateCicle(args.id, values)
        setValue('objetive', '')
        setValue('firstDate', '')
        setValue('endDate', '')
        setValue('cantTrainings', '')
        setValue('sex', '')
        setValue('category', '')
        setValue('modality', '')
        return navigate('/manage/cicle')
      } else {
        const res = createCicle(values)
        setValue('objetive', '')
        setValue('firstDate', '')
        setValue('endDate', '')
        setValue('cantTrainings', '')
        setValue('sex', '')
        setValue('category', '')
        setValue('modality', '')

        return navigate('/manage/cicle')
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

  const OnFilter = FilterSubmit(values => {
    try {
      console.log(values)
      const { category, modality, sex } = values
      setLoading(false)

      const res = getCicleByCategoryModalitySex(category, modality, sex)
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
              <label className='w-full flex flex-col gap-2 text-sm'>
                <span className='text-sm'>Sexo</span>
                <select
                  {...filterRegister('sex', { required: true })}
                  className='border rounded p-2'
                >
                  <option value={'Masculino'}>Masculino</option>
                  <option value={'Femenino'}>Femenino</option>
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
                  onClick={() => getCicles()}
                  color='primary'
                  aria-label='add to shopping cart'
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </div>
          </form>
          <ul className='w-full flex flex-col gap-2'>
            {cicle &&
              cicle.map((item, index) => (
                <CardCicle
                  key={index}
                  props={item}
                  functionDelete={deletedCicle}
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
            <>Modifica los ciclos de Entrenamiento</>
          ) : (
            <>Agrega nuevos Ciclos de Entrenamiento</>
          )}
        </h1>
        <form onSubmit={OnSubmit} className='w-full flex flex-col p-4 gap-4'>
          <ToastContainer />

          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Objetivo</span>
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
              <span className='text-sm'>Fecha de Inicio</span>
              <input
                {...register('firstDate', { requred: true })}
                type='datetime-local'
                className='border text-sm rounded p-2'
                rows={5}
                cols={60}
              />
              {errors.firstDate && (
                <p className='text-smtext-red-500'>
                  La fecha de inicio del ciclo es necesario
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
                <p className='text-sm text-red-500'>
                  La fecha de fin del ciclo es necesaria
                </p>
              )}
            </label>
          </div>

          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Cantidad de Entrenamientos</span>
              <input
                type='text'
                placeholder='Cantidad de entrenamientos planeados'
                {...register('cantTrainings', { required: true })}
                className='border text-sm rounded p-2'
              />
              {errors.cantTrainings && (
                <p className='text-sm text-red-500'>
                  La cantidad de entrenamientos del ciclo es necesario
                </p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2 text-sm'>
              <span className='text-sm'>Sexo</span>
              <select
                {...register('sex', { required: true })}
                className='border rounded p-2'
              >
                <option value={'Masculino'}>Masculino</option>
                <option value={'Femenino'}>Femenino</option>
              </select>
              {errors.sex && (
                <p className='text-sm text-red-500'>El sexo es necesario</p>
              )}
            </label>
          </div>

          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Categoría</span>
              <select
                {...register('category', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {category &&
                  category.map((item, index) => (
                    <option value={item._id}>{item.category_name}</option>
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
                {...register('modality', { required: true })}
                className='border rounded p-2'
              >
                {modality &&
                  modality.map((item, index) => (
                    <option value={item._id}>{item.modality_name}</option>
                  ))}
              </select>
              {errors.modality && (
                <p className='text-sm text-red-500'>
                  La modalidad es necesaria
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
