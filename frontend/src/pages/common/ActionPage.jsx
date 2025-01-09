import React, { useEffect, useState } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import Alert from '@mui/material/Alert'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useAction } from '../../context/actionContext'
import { useNavigate, useParams } from 'react-router-dom'
export default function ActionPage () {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()
  const {
    action,
    createAction,
    err,
    successMessage,
    getActions,
    deleteAction,
    updateAction,
    getAction
  } = useAction()
const navigate=useNavigate()
  const args = useParams()
  const OnSubmit = handleSubmit(values => {
    try {
      if (args.id) {
        updateAction(args.id, values)
        setValue('action', '')
      return navigate("/manage/action")
      } else {
        createAction(values)
        setValue('action', '')
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    getActions()
  }, [action])

  const table = ['Nombre de acción']

  useEffect(() => {
    const loadAction = async () => {
      if (args.id) {
        const action = await getAction(args.id)

        setValue('action', action.action)
      }
    }
    loadAction()
  }, [args.id])

  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <ToastContainer />
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <TableBasic
          table={table}
          data={action}
          functionDelete={deleteAction}
          functionRefresh={getActions}
          url='action'
          atributes={['action']}
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
          {args.id ? <>Modifica la acción</> : <>Agrega nuevas Acciones</>}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-ful h-[100%] flex flex-col justify-between p-4 gap-4'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Acción</span>
            <input
              placeholder='Inscribe una Acción'
              {...register('action', { required: true })}
              type='text'
              className='border text-sm rounded p-2 '
            />
            {errors.action && (
              <p className='text-red-500 text-sm'>La acción es necesaria</p>
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
            <Button type="reset" variant="outlined" startIcon={<CleaningServicesIcon/>}>Vaciar</Button>

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
