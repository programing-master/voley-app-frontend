import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useNavigate } from 'react-router-dom'
import Cards from '../../animation/Cards'

export default function CardManage ({ props }) {
  const navigate = useNavigate()

  return (
    <Cards>
      <Card
      sx={{
        minWidth: 175,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'justify-between'
      }}
    >
      <CardContent
        sx={{
          height: '20vh'
        }}
      >
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
          {props.title}
        </Typography>
        <Typography variant='p' sx={{}} component='div'>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          onClick={() => {
            return navigate(`${props.link}`)
          }}
          startIcon={<ManageAccountsIcon />}
          size='small'
        >
          Gestionar
        </Button>
      </CardActions>
    </Card>
    </Cards>
    
  )
}
