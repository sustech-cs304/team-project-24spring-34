// App.js
import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import axios from 'axios';
import {Modal} from 'antd';

const theme = {
  colors: {
    primary: '#2C3E50',
    secondary: '#E67E22',
    background: '#ECF0F1',
    cardBackground: '#FFFFFF',
    text: '#34495E',
    secondaryText: '#7F8C8D',
    buttonHover: '#D35400',
    pageBackground: '#E67E22', // 新增页面背景颜色
  },
};

const Background = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 1rem;
  color: ${(props) => props.theme.colors.text};
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.secondaryText};
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.buttonHover};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const requestBody = {
    username: username,
    user_email: email,
    password: password,
  };

  const onOk = (e) => {
    window.location.href = '/login';
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // 提交表单逻辑
    console.log('Form submitted', {email, password});
    axios
      .post(
        'http://10.27.41.93:5000/api/users',
        requestBody,
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
        {
          withCredentials: true, // 发送请求时包括Cookie
        },
      )
      .then((response) => {
        console.log('User created successfully:', response.data);
        Modal.success({
          title: 'New User Created!',
          content: 'You can login now.',
          onOk: onOk,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container>
          <Card>
            <Title>Sign Up</Title>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor='username'>Username</Label>
              <Input
                type='username'
                id='username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <Label htmlFor='email'>Email Address</Label>
              <Input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label htmlFor='password'>Password</Label>
              <Input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                type='password'
                id='confirm-password'
                name='confirm-password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <Button type='submit'>Sign Up</Button>
            </Form>
          </Card>
        </Container>
      </Background>
    </ThemeProvider>
  );
};

export default SignUp;
