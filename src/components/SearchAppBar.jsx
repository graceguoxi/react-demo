import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

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
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ keyWord, onSearch, auth, logout, user }) {

   const [userLogout, setUserLogout] = React.useState('')

   const handleChange = (event) => {
     setUserLogout(event.target.value)
   }
  
  const handleSearchChange = e => onSearch(e.target.value)

  const handleKeyUp = e => e.keyCode == 27 && onSearch('')
  const handleClear = () => {
    onSearch('')
  }

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
            <FormControl variant='standard' sx={{ m: 1, minWidth: 50 }}>
              <InputLabel>
                <AccountCircleIcon />
              </InputLabel>
              <Select
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={userLogout}
                onChange={handleChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>{user.email}</MenuItem>
                {auth && <MenuItem onClick={logout} value={20}>Log out</MenuItem>}
                
              </Select>
            </FormControl>
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
