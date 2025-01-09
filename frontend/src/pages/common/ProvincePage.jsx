import React, { useEffect } from 'react'
import TableBasic from '../../components/common/TableBasic'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { useProvince } from '../../context/provinceContext'
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
export default function ProvincePage () {
  const {
    province,
    err,
    successMessage,
    createProvince,
    getProvinces,
    getProvince,
    deleteProvince,
    updateProvince
  } = useProvince()

  const args = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  useEffect(() => {
    getProvinces()
  }, [province])

  const navigate = useNavigate()
  const OnSubmit = handleSubmit(values => {
    try {
      if (args.id) {
        updateProvince(args.id, values)
        setValue('province_name', '')
        return navigate('/manage/province')
      } else {
        createProvince(values)
        setValue('province_name', '')
      }
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    const loadProvince = async () => {
      if (args.id) {
        const provinceOnly = await getProvince(args.id)

        setValue('province_name', provinceOnly.province_name)
      }
    }
    loadProvince()
  }, [args.id])
  console.log(err)

  const table = ['Nombre de Provincia']
  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <ToastContainer />
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <TableBasic
          table={table}
          data={province}
          functionDelete={deleteProvince}
          functionRefresh={getProvinces}
          url='province'
          atributes={['province_name']}
        />
      </section>
      <section className='shadow-md flex  flex-col w-[100%]   lg:w-[50%]  h-[43%] border rounded pr-0 lg:mr-2 '>
        {err &&
          err.map((item, index) => (
            <Alert key={index} variant='filled' severity='error'>
              {item}
            </Alert>
          ))}
        <h1 className='p-4 '>
          {args.id ? <>Modifica la provincia</> : <>Agrega nuevas Provincias</>}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-full flex flex-col p-4 gap-4 justify-between h-full'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Provincia</span>
            <input
              placeholder='Inscribe una provincia'
              type='text'
              {...register('province_name', { required: true })}
              className='border text-sm rounded p-2'
            />
            {errors.province_name && (
              <p className='text-sm text-red-500'>La provincia es requerida</p>
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
