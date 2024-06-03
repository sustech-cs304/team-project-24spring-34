import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import PasswordRecovery from '../PasswordRecovery/PasswordRecovery';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {set} from 'date-fns';
import {useNavigate} from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [retrieveOpen, setRetrieveOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUP = () => {
    navigate('/signUP');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickRetrieveOpen = () => {
    setRetrieveOpen(true);
  };

  const handleRetrieveClose = () => {
    setRetrieveOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    try {
      const response = await fetch('http://10.27.41.93:5000/api/sessions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
      localStorage.setItem('authToken', response.token);
      navigate('/mainpage');
    } catch (error) {
      console.error('Error fetching activity details:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              SIGN IN
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{mt: 1}}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='Username'
                label='Username'
                name='Username'
                autoComplete='Username'
                autoFocus
                onChange={handleEmailChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handlePasswordChange}
              />
              {/*
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
          />*/}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{mt: 3, mb: 2}}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href='#'
                    variant='body2'
                    onClick={handleClickRetrieveOpen}>
                    Forgot password?
                  </Link>
                </Grid>
                <Dialog open={retrieveOpen} onClose={handleRetrieveClose}>
                  <DialogContent>
                    <PasswordRecovery />
                  </DialogContent>
                </Dialog>
                <Grid item>
                  <Link href='#' variant='body2' onClick={handleSignUP}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{mt: 5}} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
