import * as React from 'react'
import PropTypes from 'prop-types'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useSpring, animated } from '@react-spring/web'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import NumbersIcon from '@mui/icons-material/Numbers'
import Tooltip from '@mui/material/Tooltip'
import CategoryIcon from '@mui/icons-material/Category'
import HeightIcon from '@mui/icons-material/Height'
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import WcIcon from '@mui/icons-material/Wc'
const Fade = React.forwardRef(function Fade (props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true)
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true)
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4
}

export default function ModalCicle ({ props }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Tooltip title={`ver más información sobre el ciclo`}>
        <IconButton
          sx={{ marginX: 2 }}
          onClick={handleOpen}
          aria-label='delete'
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='spring-modal-title' variant='h6' component='h2'>
              Ciclo de entrenamiento
            </Typography>
            <Typography
              id='spring-modal-description'
              sx={{
                my: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'rgba(0,0,0,.5)'
              }}
            >
              <Typography
                sx={{
                  fontSize: '70%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CalendarMonthIcon />

                {new Date(props.firstDate).toLocaleDateString('es-ES')}
              </Typography>
              <Typography element='h6' variant='p'>
                hasta
              </Typography>
              <Typography
                sx={{
                  fontSize: '70%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CalendarMonthIcon />

                {new Date(props.endDate).toLocaleDateString('es-ES')}
              </Typography>

              <Typography
                sx={{
                  fontSize: '70%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <HeightIcon />
                {props.modality.modality_name}
              </Typography>
            </Typography>
            <Typography
              sx={{
                fontSize: '80%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <CategoryIcon />
              <Typography  sx={{
                fontSize: '90%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>categoría:</Typography>
              {props.category.category_name}
            </Typography>
            <Typography
              sx={{
                fontSize: '80%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <NumbersIcon /> <Typography  sx={{
                fontSize: '90%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>cantidad de entrenamientos:</Typography>
              {props.cantTrainings}
            </Typography>
            <Typography
              sx={{
                fontSize: '70%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <WcIcon />
              {props.sex}
            </Typography>



            <Typography
              sx={{
                fontSize: '80%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <FlagCircleIcon />
              <Typography  sx={{
                fontSize: '90%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>Objetivo:</Typography>
              {props.objetive}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
