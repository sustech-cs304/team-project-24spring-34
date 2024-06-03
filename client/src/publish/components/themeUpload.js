import React, {useState, useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import ImageUploader from './ImageUploader';

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

const Card = styled.div`
  background-color: ${({theme}) => theme.colors.cardBackground};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
`;

const Button = styled.button`
  background-color: ${({theme}) => theme.colors.secondary};
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({theme}) => theme.colors.buttonHover};
  }
`;

const Heading = styled.h1`
  color: ${({theme}) => theme.colors.primary};
`;

const Paragraph = styled.p`
  color: ${({theme}) => theme.colors.secondaryText};
`;

const TextArea = styled.textarea`
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || 'auto'};
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({theme}) => theme.colors.secondaryText};
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  background-color: ${({theme}) => theme.colors.cardBackground};
  color: ${({theme}) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus {
    border-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 0 8px rgba(44, 62, 80, 0.3);
    outline: none;
  }
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${({theme}) => theme.colors.secondaryText};
  border-radius: 4px;
  font-size: 16px;
  font-family: inherit;
  background-color: ${({theme}) => theme.colors.cardBackground};
  color: ${({theme}) => theme.colors.text};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus {
    border-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 0 8px rgba(44, 62, 80, 0.3);
    outline: none;
  }
`;

function ThemeBox({handelPoseterchange}) {
  const [pics, setPics] = useState('');
  const HandlePicsChange = (changePics) => {
    setPics(changePics);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Card>
          <Paragraph>Upload Pictures Here.</Paragraph>
          <ImageUploader addPoster={handelPoseterchange} />
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default ThemeBox;
