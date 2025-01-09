import React, { useEffect } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { useTrainingType } from '../../context/trainingTypeContext'

export default function TrainingTypePage () {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const {
    trainingType,
    err,
    successMessage,
    createTrainingType,
    getTrainingsType,
    updateTrainingType,
    deleteTrainingType,
    getTrainingType
  } = useTrainingType()
  const navigate = useNavigate()
  const args = useParams()

  const OnSubmit = handleSubmit(data => {
    try {
      if (args.id) {
        updateTrainingType(args.id, data)
        setValue('name_type', '')
        return navigate('/manage/training-type')
      } else {
        createTrainingType(data)
        setValue('name_type', '')
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if(trainingType){
      getTrainingsType()

    }
  }, [trainingType])

  const table = ['Nombre de tipo de entrenamiento']

  useEffect(() => {
    const loadRoll = async () => {
      if (args.id) {
        const type = await getTrainingType(args.id)

        setValue('name_type', type.name_type)
      }
    }
    loadRoll()
  }, [args.id])

  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <ToastContainer />
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <TableBasic
          table={table}
          data={trainingType}
          functionDelete={deleteTrainingType}
          functionRefresh={getTrainingsType}
          url='training-type'
          atributes={['name_type']}
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
          {args.id ? (
            <>Modifica el tipo de entrenamiento</>
          ) : (
            <>Agrega el tipo de entrenamiento</>
          )}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-full h-[100%] flex flex-col justify-between p-4 gap-4'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Tipo de entrenamiento</span>
            <input
              placeholder='Inscribe el tipo de entrenamiento'
              {...register('name_type', { required: true })}
              type='text'
              className='border text-sm rounded p-2 '
            />
            {errors.name_type && (
              <p className='text-red-500 text-sm'>
                El tipo de entrenamiento es necesario
              </p>
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
