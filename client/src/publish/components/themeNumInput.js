import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';

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

const Heading = styled.h1`
  color: ${({theme}) => theme.colors.primary};
`;

const Paragraph = styled.p`
  color: ${({theme}) => theme.colors.secondaryText};
`;

const Input = styled.input`
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

function ThemeNumInput(props) {
  const [value, setValue] = useState(props.cap);
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d+$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);
      if (number >= 0 && number <= 10000) {
        setValue(number);
        props.cap(number.toString());
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Card>
          <Paragraph>Max Capacity</Paragraph>
          <input
            type='text'
            id={props.id}
            value={value}
            onChange={handleChange}
            placeholder=''
            required
          />
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default ThemeNumInput;
