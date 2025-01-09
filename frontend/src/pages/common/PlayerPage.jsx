import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { ToastContainer } from 'react-toastify'
import Alert from '@mui/material/Alert'
import FilterListIcon from '@mui/icons-material/FilterList'
import { usePlayer } from '../../context/playerContext'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { useRoll } from '../../context/rollContext'
import { useProvince } from '../../context/provinceContext'
import CardPlayers from '../../components/common/CardPlayers'
import RefreshIcon from '@mui/icons-material/Refresh'
export default function PlayerPage () {
  const args = useParams()
  const { roll, getRolls } = useRoll()
  const { province, getProvinces } = useProvince()
  const [loading, setLoading] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  const navigate = useNavigate()

  const OnSubmit = handleSubmit(values => {
    setLoading(true)
    const weigthValue =
      typeof values.weigth === 'string'
        ? parseInt(values.weigth)
        : values.weigth

    const heightValue =
      typeof values.height === 'string'
        ? parseInt(values.height)
        : values.height

    if (args.id) {
      updatePlayer(args.id, {
        ...values,
        height: heightValue,
        weigth: weigthValue
      })
      setValue('name', '')
      setValue('weigth', '')
      setValue('height', '')
      setValue('dateBorn', '')
      setValue('province_id', '')
      setValue('roll_id', '')
      getPlayers()

      return navigate('/manage/player')
    } else {
      createPlayer({ ...values, height: heightValue, weigth: weigthValue })
      setValue('name', '')
      setValue('weigth', '')
      setValue('height', '')
      setValue('dateBorn', '')
      setValue('province_id', '')
      setValue('roll_id', '')
      getPlayers()
    }
  })

  const {
    err,
    successMessage,
    player,
    createPlayer,
    getPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer,
    getPlayerByRollProvince
  } = usePlayer()

  const {
    register: sendedRegister,
    handleSubmit: formSend,
    formState: { sendedErrors },
    setValue: sendedValues
  } = useForm()

  const OnFilter = formSend(values => {
    try {
      console.log(values.roll_id, values.province_id)
      setLoading(false)

      const res = getPlayerByRollProvince(values.roll_id, values.province_id)
    } catch (error) {
      console.log(error)
    }
  })

  const handleChange = (values) => {
    OnFilter(values)
  }

  useEffect(() => {
    const loadPlayer = async () => {
      if (args.id) {
        const player = await getPlayer(args.id)
        setValue('name', player.name)
        setValue('weigth', player.weigth)
        setValue('height', player.height)
        setValue('dateBorn', player.dateBorn)
        setValue('province_id', player.province_id.province_name)
        setValue('roll_id', player.roll_id.roll)
      }
    }
    loadPlayer()
  }, [args.id])
  useEffect(() => {
    if (loading) {
      getPlayers()
    }
  }, [player])

  useEffect(() => {
    getProvinces()
  }, [province])
  useEffect(() => {
    getRolls()
  }, [roll])

  return (
    <div className='w-full  ml-8 lg:ml-4 flex flex-col  lg:flex-row gap-2'>
      <ToastContainer />
      <section className=' flex  flex-col gap-2 w-[100%]  lg:w-[50%] min-h-[40vh]  pr-0 lg:mr-1 '>
        <div className='w-full  p-1 pt-4 flex flex-col min-h-[35vh] gap-2 '>
          <span className=' ml-4  p-1'>Filtrar</span>
          <form onChange={handleChange} onSubmit={OnFilter} className='w-full  flex flex-col p-4 gap-4'>
            <div className='w-full flex  flex-col lg:flex-row gap-2'>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Roll</span>
                <select
                  {...sendedRegister('roll_id', { required: true })}
                  className='border rounded p-2 text-sm'
                >
                  {roll &&
                    roll.map((item, index) => (
                      <option key={index} value={item._id} className='text-sm'>
                        {item.roll}
                      </option>
                    ))}
                </select>
              </label>
              <label className='w-full flex flex-col gap-2'>
                <span className='text-sm'>Provincia</span>
                <select
                  {...sendedRegister('province_id', { required: true })}
                  className='border rounded p-2 text-sm'
                >
                  {province &&
                    province.map((item, index) => (
                      <option key={index} value={item._id} className='text-sm'>
                        {item.province_name}
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
                  onClick={() => getPlayers()}
                  color='primary'
                  aria-label='add to shopping cart'
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </div>
          </form>


        </div>

        <ul className='w-full flex flex-col gap-2'>
            {player &&
              player.map((item, index) => (
                <CardPlayers
                  props={item}
                  functionDelete={deletePlayer}
                  key={index}
                />
              ))}
          </ul>
      </section>
      <section className='shadow-md flex  flex-col w-[100%]  lg:w-[50%] h-full border rounded pr-0 lg:mr-2 '>
        <ul className=' flex flex-col gap-1'>
          {err &&
            err.map((item, index) => (
              <Alert key={index} sx={{}} variant='filled' severity='error'>
                {item}
              </Alert>
            ))}
        </ul>

        <h1 className='p-4 '>
          {args.id ? <>Modifica el Jugador</> : <>Agrega nuevos Jugadores</>}
        </h1>
        <form
          onSubmit={OnSubmit}
          className='w-full flex flex-col min-h-[50vh] p-4 gap-4'
        >
          <label className='w-full flex flex-col gap-2'>
            <span className='text-sm'>Nombre</span>
            <input
              {...register('name', { required: true })}
              type='text'
              className='border text-sm rounded p-2'
            />
            {errors.name && (
              <p className='text-sm text-red-500'> El nombre es requerido</p>
            )}
          </label>
          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Fecha de Nacimiento</span>
              <input
                {...register('dateBorn', { required: true })}
                type='datetime-local'
                className='border text-sm rounded p-2'
                rows={5}
                cols={60}
              />
              {errors.dateBorn && (
                <p className='text-sm text-red-500'>
                  {' '}
                  La fecha de nacimiento es necesaria
                </p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Peso</span>
              <input
                type='text'
                {...register('weigth', { required: true })}
                className='border text-sm rounded p-2'
                rows={5}
                cols={60}
              />
              {errors.weigth && (
                <p className='text-sm text-red-500'> El peso es necesario</p>
              )}
            </label>
          </div>

          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Talla</span>
              <input
                {...register('height', { required: true })}
                type='text'
                className='border text-sm rounded p-2'
              />
              {errors.height && (
                <p className='text-sm text-red-500'> La talla es necesaria</p>
              )}
            </label>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Provincia</span>
              <select
                {...register('province_id', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {province &&
                  province.map((item, index) => (
                    <option key={index} value={item._id} className='text-sm'>
                      {item.province_name}
                    </option>
                  ))}
              </select>
              {errors.province_id && (
                <p className='text-sm text-red-500'>
                  La provincia es requerida
                </p>
              )}
            </label>
          </div>

          <div className='w-full flex flex-col lg:flex-row gap-2'>
            <label className='w-full flex flex-col gap-2'>
              <span className='text-sm'>Roll</span>
              <select
                {...register('roll_id', { required: true })}
                className='border rounded p-2 text-sm'
              >
                {roll &&
                  roll.map((item, index) => (
                    <option key={index} value={item._id} className='text-sm'>
                      {item.roll}
                    </option>
                  ))}
              </select>
              {errors.roll_id && (
                <p className='text-sm text-red-500'>El roll es necesario</p>
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
