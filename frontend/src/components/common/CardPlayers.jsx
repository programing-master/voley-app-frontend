import React from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalBasic from './ModalBasic'
import { Link } from 'react-router-dom'
import Cards from '../../animation/Cards'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'

export default function CardPlayers ({props,functionDelete}) {
  
  return (
    <Cards>
      <li className='w-full min-h-4 p-2 border shadow rounded text-sm flex '>
      <div className='w-[80%] flex items-center gap-2'>
        <p className='w-[40%] overflow-hidden flex items-center gap-1'><div className="text-green-500">< AccessibilityNewIcon/></div>{props.name}</p>
        <p className='w-[20%] overflow-hidden'>{props.roll_id.roll}</p>
        <p className='w-[30%] overflow-hidden flex items-center gap-1'>
          <div className="text-violet-400"><HolidayVillageIcon/></div>{props.province_id.province_name}
        </p>
      </div>
      <div className='w-[25%] flex items-center gap-1'>
      <Tooltip title="eliminar jugador">
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
       <Tooltip title="modificar jugador">
       <IconButton
          aria-label='delete'
          variant='outlined'
          sx={{ fontSize: '80%' }}
          color='err'
         
        >
          <Link to={`/manage/player/${props._id}`}>
            <BorderColorIcon />
          </Link>
        </IconButton>
       </Tooltip>
        <ModalBasic props={props}/>
      </div>
    </li>
    </Cards>
    
  )
}
