import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { Button, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import Cards from '../../animation/Cards'
import FlagCircleIcon from '@mui/icons-material/FlagCircle'

export default function TableBasic ({
  table,
  data,
  functionDelete,
  functionRefresh,
  url,
  atributes
}) {
  React.useEffect(() => {
  }, [data])
  
  return (
    <TableContainer component={Paper} sx={{  overflow: 'hidden'  }}>
      <Table sx={{ minWidth: 50 }} aria-label='simple table'>
        <TableHead>
          <TableRow
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            {table &&
              table.map((item, index) => (
                <TableCell key={index} align='right'>
                  {item}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{
          display:"flex",
          flexDirection:"column",
          gap:"1vh"
        }}>
          {data &&
            data.map((row, index) => (
              <Cards><TableRow
              key={index}
              sx={{
                height:'8vh',

                width: '100%',
                borderRadius:'5px',
                border:"1px solid rgba(0,0,0,.2)",
                shadow:"0 0 10px rgba(0,0,0,.5)",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                overflow:'hidden',
              }}
            >
              
              <TableCell component='th' scope='row' sx={
                {}}>
                {atributes.map((item, index) => (
                  <div className="w-full flex items-center text-green-500"><FlagCircleIcon/><TableCell key={index}>{row[item]}</TableCell></div>
                ))}
              </TableCell>
              <Stack direction='horizontal'>
                <TableCell align='right' >
                  <Tooltip title={`Eliminar ${table[0].slice(9)}`}>
                    {' '}
                    <Button
                      variant='contained'
                      onClick={() => functionDelete(row._id)}
                      className='w-full'
                      color='primary'
                      sx={{ fontSize: '80%' }}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align='right'>
                  <Tooltip title={`Modificar ${table[0].slice(9)}`}>
                    <Button
                      color='primary'
                      sx={{ fontSize: '80%' }}
                      variant='outlined'
                      startIcon={<BorderColorIcon />}
                    >
                      <Link
                        to={`/manage/${url}/${row._id}`}
                        className='w-full'
                        color='none'
                      >
                        Modificar
                      </Link>
                    </Button>
                  </Tooltip>
                </TableCell>
              </Stack>
            </TableRow></Cards>
              
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
