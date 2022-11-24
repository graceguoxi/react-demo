import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar, FormControl, InputLabel, Menu, MenuItem, Select } from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

export default function SearchAppBar({ keyWord, onSearch, auth, logout, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [userLogout, setUserLogout] = React.useState('')

  //  const handleChange = (event) => {
  //    setUserLogout(event.target.value)
  //    console.log('222',event)
  //    console.log('3',event.target.value)
  //  }

  const handleSearchChange = (e) => onSearch(e.target.value)

  const handleKeyUp = (e) => e.keyCode == 27 && onSearch('')
  const handleClear = () => {
    onSearch('')
  }
  const avatarStyle = { backgroundColor: '#2149e4' }
  const visibleList = {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0
      }
    }
  }

  const location = useLocation()
  const isLoginPage = location.pathname.search('login') !== -1
  console.log(location)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >

            {!isLoginPage && (
              <>
                <Tooltip title='Account settings'>
                  <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }} style={avatarStyle} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={visibleList}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <Avatar /> {user.email}
                  </MenuItem>
                  <MenuItem>
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <PersonAdd fontSize='small' />
                    </ListItemIcon>
                    Add another account
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize='small' />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Product Management
          </Typography>
          <form>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={keyWord}
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                onKeyUp={handleKeyUp}
              />
              <IconButton onClick={handleClear} sx={{ visibility: keyWord ? 'visible' : 'hidden' }}>
                <ClearIcon />
              </IconButton>
            </Search>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
