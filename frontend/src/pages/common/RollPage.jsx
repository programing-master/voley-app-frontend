import React, { useEffect } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useRoll } from '../../context/rollContext'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'

export default function RollPage () {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const {
    createRoll,
    getRolls,
    getRoll,
    updateRoll,
    deleteRoll,
    roll,
    err,
    successMessage
  } = useRoll()
  const navigate = useNavigate()
  const args = useParams()
  const OnSubmit = handleSubmit(data => {
    try {
      if (args.id) {
        updateRoll(args.id, data)
        setValue('roll', '')
        getRolls()
        return navigate('/manage/roll')
      } else {
        createRoll(data)
        getRolls()
        setValue('roll', '')
      }
    } catch (error) {
      console.log(error)
    }
  })
  useEffect(() => {
    getRolls()
  }, [roll])

  const table = ['Nombre de Roll']

  useEffect(() => {
    const loadRoll = async () => {
      if (args.id) {
        const roll = await getRoll(args.id)

        setValue('roll', roll.roll)
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
          data={roll}
          functionDelete={deleteRoll}
          functionRefresh={getRolls}
          url='roll'
          atributes={['roll']}
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
          {args.id ? <>Modifica el roll</> : <>Agrega nuevos roles</>}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-full h-[100%] flex flex-col justify-between p-4 gap-4'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Roll</span>
            <input
              placeholder='Inscribe un roll'
              {...register('roll', { required: true })}
              type='text'
              className='border text-sm rounded p-2 '
            />
            {errors.roll && (
              <p className='text-red-500 text-sm'>El roll es necesario</p>
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
