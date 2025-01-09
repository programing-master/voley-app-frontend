import * as React from 'react'
import PropTypes from 'prop-types'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import WcIcon from '@mui/icons-material/Wc';
import Typography from '@mui/material/Typography'
import { useSpring, animated } from '@react-spring/web'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NumbersIcon from '@mui/icons-material/Numbers'
import Tooltip from '@mui/material/Tooltip'
import CategoryIcon from '@mui/icons-material/Category'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import ClassIcon from '@mui/icons-material/Class';
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

export default function ModalTraining ({ props }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
console.log(props)
  return (
    <div>
      <Tooltip title={`ver más información sobre el entrenamiento`}>
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
              Entrenamiento
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
                <FlagCircleIcon />
                Objetivo: {props.objetive}
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
              {props.id_category.category_name}
            </Typography>


            <Typography
              sx={{
                fontSize: '80%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <ClassIcon />
              <Typography  sx={{
                fontSize: '90%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>Modalidad:</Typography>
              {props.id_modality.modality_name}
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
              }}>Tipo entrenamiento:</Typography>
              {props.type_training.name_type}
            </Typography>

            <Typography
              sx={{
                fontSize: '80%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <PendingActionsIcon /> <Typography  sx={{
                fontSize: '90%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>Acción:</Typography>
              {props.action.action}
            </Typography>
<br/>
<Typography>Sobre el ciclo</Typography>

            <Typography
              sx={{
                fontSize: '70%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <FlagCircleIcon />
              <Typography element="p" variant="p">Objetivo del ciclo:</Typography>

              {props.id_cicle.objetive}
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
              <Typography element="p" variant="p">Sexo:</Typography>
              { props.id_cicle.sex}
            </Typography>

            <Typography
              sx={{
                fontSize: '70%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
             <NumbersIcon />
              <Typography element="p" variant="p">Cantidad de entrenamientos:</Typography>
              { props.id_cicle.cantTrainings}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
