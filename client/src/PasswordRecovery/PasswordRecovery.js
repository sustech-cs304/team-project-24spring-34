import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Alert} from '@mui/material';
import axios from 'axios';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post(
        'http://10.27.41.93:5000/api/requestReset',
        {
          email: email,
        },
      );
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // 处理 400 错误（电子邮件未找到）
        setError('Email not found. Please enter a registered email address.');
        console.error('Error 400: Email not found');
        return;
      } else {
        // 处理其他错误
        setError('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
    }

    setError('');
    setStep(2);
    // 假设发送邮件
    console.log(`Verification code sent to ${email}`);
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(
        'http://10.27.41.93:5000/api/resetPassword',
        {
          email: email,
          token: code,
          password: newPassword,
        },
      );
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Invalid token or token expired.');
        console.error('Error 400: Invalid token or token expired');
        return;
      } else {
        setError('An unexpected error occurred. Please try again later.');
        console.error(error);
      }
    }

    setError('');
    console.log('Password has been reset successfully');
    setSuccessMessage('Password has been reset successfully');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      p={2}>
      {step === 1 && (
        <Box p={2} width='100%'>
          <Typography variant='h6' component='h2' gutterBottom>
            Password Recovery
          </Typography>
          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin='normal'
            placeholder='Please enter your email'
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleEmailSubmit}
            fullWidth
            sx={{mt: 2}}>
            Send Verification Code
          </Button>
          {error && (
            <Alert severity='error' sx={{mt: 2}}>
              {error}
            </Alert>
          )}
        </Box>
      )}
      {step === 2 && (
        <Box p={2} width='100%'>
          <Typography variant='h6' component='h2' gutterBottom>
            Enter Verification Code and Reset Password
          </Typography>
          <TextField
            label='Verification Code'
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            fullWidth
            margin='normal'
            placeholder='Please enter the verification code'
          />
          <TextField
            label='New Password'
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin='normal'
            placeholder='Enter new password'
          />
          <TextField
            label='Confirm New Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin='normal'
            placeholder='Confirm new password'
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handlePasswordReset}
            fullWidth
            sx={{mt: 2}}>
            Reset Password
          </Button>
          {error && (
            <Alert severity='error' sx={{mt: 2}}>
              {error}
            </Alert>
          )}
        </Box>
      )}
      {successMessage && <div style={{color: 'green'}}>{successMessage}</div>}
    </Box>
  );
};

export default PasswordRecovery;
