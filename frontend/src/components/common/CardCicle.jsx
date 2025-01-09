import React from 'react'
import WcIcon from '@mui/icons-material/Wc'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import ModalCicle from './ModalCicle'
import Cards from '../../animation/Cards'
import CategoryIcon from '@mui/icons-material/Category'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import HeightIcon from '@mui/icons-material/Height'

export default function CardCicle ({ props, functionDelete }) {
  return (
    <Cards>
      <li className='w-full min-h-4 p-2 border shadow rounded text-sm flex '>
        <div className='w-[80%]  flex items-center gap-2'>
          <p className='w-[30%] overflow-hidden flex items-center gap-1'>
            <div className='text-green-500'>
              <CategoryIcon />
            </div>{' '}
            {props.category.category_name && props.category.category_name}
          </p>
          <p className='w-[30%] flex items-center gap-1 overflow-hidden'>
            <div className='text-violet-400'>
              <HeightIcon />
            </div>{' '}
            {props.modality.modality_name && props.modality.modality_name}
          </p>
          <p className='w-[30%] overflow-hidden flex items-center gap-1'>
            <div className='text-violet-400'>
              <WcIcon />
            </div>
            {props.sex && props.sex}
          </p>
        </div>
        <div className='w-[25%] flex items-center gap-1'>
          <Tooltip title='eliminar ciclo entrenamiento'>
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
          <Tooltip title='modificar ciclo de entrenamiento'>
            <IconButton
              aria-label='delete'
              variant='outlined'
              sx={{ fontSize: '80%' }}
              color='err'
            >
              <Link to={`/manage/cicle/${props._id}`}>
                <BorderColorIcon />
              </Link>
            </IconButton>
          </Tooltip>

          <ModalCicle props={props} />
        </div>
      </li>
    </Cards>
  )
}
