import axios from 'axios'
import { Avatar, Button, Checkbox, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({})

  const paperStyle={padding: 20, height:'70vh', width:380, margin:'20px auto'}
  const avatarStyle={backgroundColor:'#33cba5'}
  const btnstyle={margin: '20px 0'}

  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name] : e.target.value
      
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('inputs',inputs)

    axios.post('https://app.spiritx.co.nz/api/login', inputs)
      .then(res => {
        console.log(res)
        localStorage.setItem('react-demo-token', res.data.token.token)
        localStorage.setItem('react-demo-user', JSON.stringify(res.data.user))

        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Sign In</h2>
          </Grid>

          <form onSubmit={handleSubmit}>
            <TextField onChange={handleChange} name="email" label="Email" variant="standard" placeholder="Enter your email" fullWidth required />
            <TextField onChange={handleChange} name="password" label="Password" variant="standard" placeholder="Enter your password" type="password" fullWidth required />

            <Button type='submit' color="primary" variant="contained" style={btnstyle} fullWidth>
              Sign in
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  )
}
export default Login