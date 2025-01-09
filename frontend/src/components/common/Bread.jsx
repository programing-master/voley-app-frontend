import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link, useResolvedPath } from 'react-router-dom'

export default function Bread () {
  const [args, setArgs] = React.useState('')
  const name = useResolvedPath()
  React.useEffect(() => {
    console.log(name.pathname)
    setArgs(name.pathname)
  }, [name])

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContext: 'justify-end',
        color: 'white'
      }}
    >
      {args
        .split('/')
        .slice(1)
        .map((item, index) => (
          <Link
            underline='hover'
            className='cursor-default'
            key={index}
            color='inherit'
            href='/'
          >
            <span className='capitalize'>{item}</span>
          </Link>
        ))}
    </Breadcrumbs>
  )
}
