import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import MKButton from '../../components/MKButton';

// 定义主题
const theme = {
  colors: {
    primary: '#2C3E50',
    secondary: '#E67E22',
    background: '#ECF0F1',
    cardBackground: '#FFFFFF',
    text: '#34495E',
    secondaryText: '#7F8C8D',
    buttonHover: '#D35400',
  },
};

// 创建样式组件
const Container = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  margin-bottom: 0;
  padding: 20px;
  color: ${({theme}) => theme.colors.text};
`;
const Heading = styled.p`
  color: ${({theme}) => theme.colors.primaryText};
  font-size: 50px;
  padding: 10px 20px;
`;
const Button = styled.button`
  background-color: ${({theme}) => theme.colors.secondary};
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 50px;
  width: 700px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;

  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
  }
`;
const Card = styled.div`
  background-color: ${({theme}) => theme.colors.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
`;
const handleClick = () => {
  // TODO: 发送给后端
  window.location.href = '/';
};

function ThemeTitle(props) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Heading>{props.name}</Heading>
          <Button onClick={handleClick}>SUBMIT</Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ThemeTitle;
