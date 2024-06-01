import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Alert} from '@mui/material';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const handleEmailSubmit = async () => {
    // 模拟后端响应
    const registeredEmails = ['test@example.com'];
    if (!registeredEmails.includes(email)) {
      setError('Email is not registered');
      return;
    }
    setError('');
    setStep(2);
    // 假设发送邮件
    console.log(`Verification code sent to ${email}`);
  };

  const handleCodeSubmit = async () => {
    // 模拟后端响应
    const correctCode = '123456';
    if (code !== correctCode) {
      setError('Incorrect verification code');
      return;
    }
    setError('');
    setStep(3);
    console.log('Verification code is correct, proceed to reset password');
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log('Password has been reset successfully');
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
            Enter Verification Code
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
          <Button
            variant='contained'
            color='primary'
            onClick={handleCodeSubmit}
            fullWidth
            sx={{mt: 2}}>
            Submit
          </Button>
          {error && (
            <Alert severity='error' sx={{mt: 2}}>
              {error}
            </Alert>
          )}
        </Box>
      )}
      {step === 3 && (
        <Box p={2} width='100%'>
          <Typography variant='h6' component='h2' gutterBottom>
            Reset Password
          </Typography>
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
    </Box>
  );
};

export default PasswordRecovery;
