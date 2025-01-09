import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import SyncLockSharpIcon from '@mui/icons-material/SyncLockSharp'
//icons
import AssessmentIcon from '@mui/icons-material/Assessment';
import EqualizerIcon from '@mui/icons-material/Equalizer'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SummarizeIcon from '@mui/icons-material/Summarize'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useAuth } from '../../context/authContext'
import Bread from './Bread'
import ButtonDouble from '../others/ButtonDouble'
const drawerWidth = 240

const openedMixin = theme => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})
function handleClick (event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}
const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    }
  ]
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
      }
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
      }
    }
  ]
}))

const texts = ['Estadísticas', 'Reportes', 'Gestiones', 'Menú Principal']
const links = ['/estadistics', '/reports', '/manage', '/']
const icons = [
  <EqualizerIcon />,
  <SummarizeIcon />,
  <ManageSearchIcon />,
  <HomeIcon />,
]
const noAuthTexts = ['Logearse', 'Registrarse']
const noAuthLinks = ['/login', '/register']
const AuthTexts = ['Salir de Sesión']
const AuthLinks = ['/login']
const noAuthIcons = [<LoginIcon />, <HowToRegIcon />]
const AuthIcons = [<ExitToAppIcon />]
export default function Header () {
  const { isAuthenticated } = useAuth()

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={[
              {
                marginRight: 1
              },
              open && { display: 'none' }
            ]}
          >
            <MenuIcon />
          </IconButton>
          <ul className='w-full flex gap-2 items-center p-1 md:p-0'>
            <Link to={'/manage/cicle'}>
              <Button
                variant='contained'
                sx={{
                  background: 'transparent'
                }}
                startIcon={<SyncLockSharpIcon />}
              >
                Ciclos
              </Button>
            </Link>
            <Link to={'/manage/player'}>
              <Button
                sx={{
                  background: 'transparent'
                }}
                variant='contained'
                startIcon={<AccessibilityNewIcon />}
              >
                Jugadores
              </Button>
            </Link>


            <Link to={'/manage/training'}>
              <Button
                sx={{
                  background: 'transparent'
                }}
                variant='contained'
                startIcon={<SportsVolleyballIcon />}
              >
                Entrenamientos
              </Button>
            </Link>

          
            
            <ButtonDouble text="Sesión" icon={[<AssessmentIcon/>]} option={["Manejar ausencias"]} links={["/manage/sesion","/manage/abscence"]}/>
            
          </ul>
          <div role='presentation' className='w-[30%] ' onClick={handleClick}>
            <Bread />
          </div>
          <img
            className='w-[8%] md:w-[5%] lg:w-[3%]  rounded-full'
            src='/public/assets/LOGO1.jpg'
            alt='inder logo'
          />
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {texts.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Link to={links[index]}>
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5
                    },
                    open
                      ? {
                          justifyContent: 'initial'
                        }
                      : {
                          justifyContent: 'center'
                        }
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center'
                      },
                      open
                        ? {
                            mr: 3
                          }
                        : {
                            mr: 'auto'
                          }
                    ]}
                  >
                    {icons[index]}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={[
                      open
                        ? {
                            opacity: 1
                          }
                        : {
                            opacity: 0
                          }
                    ]}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        {isAuthenticated ? (
          <List>
            {AuthTexts.map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <Link to={noAuthLinks[index]}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5
                      },
                      open
                        ? {
                            justifyContent: 'initial'
                          }
                        : {
                            justifyContent: 'center'
                          }
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center'
                        },
                        open
                          ? {
                              mr: 3
                            }
                          : {
                              mr: 'auto'
                            }
                      ]}
                    >
                      {AuthIcons[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={[
                        open
                          ? {
                              opacity: 1
                            }
                          : {
                              opacity: 0
                            }
                      ]}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {noAuthTexts.map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <Link to={noAuthLinks[index]}>
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5
                      },
                      open
                        ? {
                            justifyContent: 'initial'
                          }
                        : {
                            justifyContent: 'center'
                          }
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center'
                        },
                        open
                          ? {
                              mr: 3
                            }
                          : {
                              mr: 'auto'
                            }
                      ]}
                    >
                      {noAuthIcons[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={[
                        open
                          ? {
                              opacity: 1
                            }
                          : {
                              opacity: 0
                            }
                      ]}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
    </Box>
  )
}
