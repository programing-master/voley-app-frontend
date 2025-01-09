import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Cards from '../../animation/Cards'

export default function CardSection ({ props, functionDelete }) {
  return (
    <Cards>
        <li className='w-full min-h-4 p-2 border shadow rounded text-sm flex '>
      <div className='w-[85%] flex items-center gap-4 '>
        <p className='w-[30%]  flex items-center gap-1 text-sm '>
          <div className="text-green-500"><FlagCircleIcon /></div>
          {props.id_training.objetive}
        </p>
        <p className='w-[30%] overflow-hidden flex items-center gap-1 text-sm'>
        <div className="text-violet-400"><CalendarMonthIcon  /></div>
          {new Date(props.firstDate).toLocaleDateString('es-ES')}
        </p>
        <p className='w-[30%] overflow-hidden flex items-center gap-1 text-sm'>
        <div className="text-violet-400"><CalendarMonthIcon  /></div>
          {new Date(props.endDate).toLocaleDateString('es-ES')}
        </p>
      </div>
      <div className='w-[15%] flex items-center gap-1'>
       <Tooltip title="eliminar sesión">
       <IconButton
          aria-label='delete'
          variant='outlined'
          sx={{ fontSize: '80%' }}
          color='none'
          onClick={() => functionDelete(props._id)}
        >
          <DeleteIcon />
        </IconButton>
       </Tooltip>
       <Tooltip title="modificar sesión">
       <IconButton
          aria-label='delete'
          variant='outlined'
          sx={{ fontSize: '80%' }}
          color='err'
         
        >
          <Link to={`/manage/sesion/${props._id}`}>
            <BorderColorIcon />
          </Link>
        </IconButton>
       </Tooltip>
       
      </div>
    </li>
    </Cards>
    
  )
}
