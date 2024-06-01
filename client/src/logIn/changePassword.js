import React, {useEffect, useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../assets/theme';
import CssBaseline from '@mui/material/CssBaseline';
import MKButton from '../components/MKButton';
import {Link} from 'react-router-dom';
import DefaultNavbar from '../mainpage/mainpageComponents/DefaultNavbar';
import DefaultNavbar_1 from '../mainpage/mainpageComponents/DefaultNavbar_1';

function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('123');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   // 模拟 API 调用获取当前密码
  //   const fetchCurrentPassword = async () => {
  //     try {
  //       const response = await fetch('/api/current-password');
  //       const data = await response.json();
  //       setOldPassword(data.password); // 假设API返回的数据格式为 { password: 'currentPassword' }
  //     } catch (error) {
  //       console.error('Failed to fetch current password', error);
  //     }
  //   };
  //
  //   fetchCurrentPassword();
  // }, []);
  const handleChangePassword = () => {
    // 这里添加逻辑来处理密码修改操作
    if (
      currentPassword === '' ||
      newPassword === '' ||
      confirmPassword === ''
    ) {
      setError('请填写所有字段');
      return;
    }

    if (oldPassword !== currentPassword) {
      setError('当前密码错误');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('新密码与确认密码不匹配');
      return;
    }

    // 执行密码修改操作
    console.log('密码修改成功');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar_1 />
      <Container maxWidth='sm'>
        <Box mt={5}>
          <Typography variant='h4' gutterBottom>
            修改密码
          </Typography>
          {error && (
            <Typography color='error' variant='body1' gutterBottom>
              {error}
            </Typography>
          )}
          <TextField
            type='password'
            label='当前密码'
            fullWidth
            margin='normal'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            type='password'
            label='新密码'
            fullWidth
            margin='normal'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            type='password'
            label='确认密码'
            fullWidth
            margin='normal'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <MKButton
            variant='contained'
            color='white'
            onClick={handleChangePassword}>
            确定
          </MKButton>
          <MKButton
            variant='contained'
            color='white'
            component={Link}
            to='/profilePage'>
            取消
          </MKButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ChangePasswordPage;
