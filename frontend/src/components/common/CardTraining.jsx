import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import ModalTraining from './ModalTraining'
import Cards from '../../animation/Cards'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'
import NumbersIcon from '@mui/icons-material/Numbers'

export default function CardTraining ({ props, functionDelete }) {
  return (
    <Cards>
       <li className='w-full min-h-4 p-2 border shadow rounded text-sm flex '>
      <div className='w-[80%] flex items-center gap-2 '>
        <p className='w-[35%] overflow-hidden flex  items-center gap-1 '>
         <div className="text-green-500"><FlagCircleIcon/></div> {props.objetive && props.objetive}
        </p>
        <p className='w-[35%] overflow-hidden flex items-center gap-1'>
          <div className="text-violet-400"><PendingActionsIcon/></div>{props.action && props.action.action}
        </p>
        <p className='w-[20%] overflow-hidden flex items-center gap-1'>
         <div className="text-violet-400">< NumbersIcon/></div> {props.type_training.name_type && props.type_training.name_type}
        </p>
      </div>
      <div className='w-[25%] flex items-center gap-1'>

      <Tooltip title="eliminar entrenamiento">
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
       <Tooltip title="modificar entrenamiento">
       <IconButton
          aria-label='delete'
          variant='outlined'
          sx={{ fontSize: '80%' }}
          color='err'
         
        >
          <Link to={`/manage/training/${props._id}`}>
            <BorderColorIcon />
          </Link>
        </IconButton>
       </Tooltip>   
        <ModalTraining props={props}/>
      </div>
    </li>
    </Cards>
   
  )
}
