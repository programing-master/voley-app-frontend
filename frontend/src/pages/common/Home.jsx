import React from 'react'
import { useAuth } from '../../context/authContext'
import { ToastContainer, toast } from 'react-toastify'

import Alert from '@mui/material/Alert'

export default function Home () {
  const { user } = useAuth()
  console.log(user)

  return (
    <div className='w-full h-[100%] flex flex-col items-center '>
      {user.roll == 'Entrenador' ? (
        <Alert
          sx={{
            position: 'absolute',
            right: '2%',
            bottom:'2%'
          }}
          severity='success'
        >
         <span className="capitalize">{user.username}</span>, Eres el entrenador tienes todos los permisos de control
        </Alert>
      ) : (
         <Alert
          sx={{
            position: 'absolute',
            right: '2%',
            bottom:'2%'
          }}
          severity='warning'
        >
        <span className="capitalize">{user.username}</span>, No eres Usuario Entrenador no tienes los permisos requeridos.
        </Alert>
      )}
      <ToastContainer />
      {user && (
        <p>
          Bienvenido <span className='capitalize'>{user.username}</span>
        </p>
      )}
      <img
        src={'/public/assets/LOGO1.jpg'}
        className='w-[50%] md:w-[20%] pr-4 mt-10'
        alt='logo img'
      />
    </div>
  )
}
