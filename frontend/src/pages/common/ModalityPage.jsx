import React, { useEffect } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import { useModality } from '../../context/modalityContext'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
export default function ModalityPage () {
  const args = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const {
    modality,
    err,
    successMessage,
    createModality,
    getModalities,
    getModality,
    updateModality,
    deleteModality
  } = useModality()
  const navigate = useNavigate()
  const OnSubmit = handleSubmit(values => {
    try {
      if (args.id) {
        updateModality(args.id, values)
        setValue('modality_name', ' ')
        return navigate('/manage/modality')
      } else {
        console.log(values)
        createModality(values)
        setValue('modality_name', ' ')
      }
    } catch (error) {
      console.log(error)
    }
  })
  const table = ['Nombre de la modalidad']

  useEffect(() => {
    getModalities()
  }, [modality])

  useEffect(() => {
    const loadModality = async () => {
      if (args.id) {
        const modality_name = await getModality(args.id)
        setValue('modality_name', modality_name.modality_name)
      }
    }
    loadModality()
  }, [args.id])
  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <ToastContainer />

      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <TableBasic
          table={table}
          data={modality}
          functionDelete={deleteModality}
          functionRefresh={getModalities}
          url='modality'
          atributes={['modality_name']}
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
            <>Modifica la modalidad</>
          ) : (
            <>Agrega nuevas modalidades</>
          )}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-full h-full flex flex-col justify-between p-4 gap-4'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Modalidad</span>
            <input
              placeholder='Inscribe una modalidad'
              type='text'
              {...register('modality_name', { required: true })}
              className='border text-sm rounded p-2'
            />
            {errors.modality_name && (
              <p className='text-red-500 text-sm'>
                La modalidad de entrenamiento es necesaria
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
