import React from 'react';
import {Button} from '@mui/material';
import {FaRegHandPointRight} from 'react-icons/fa6';
import {FaRegHandPointLeft} from 'react-icons/fa6';

const Reserve = () => {
  const redirectToBookingPage = () => {
    window.location.href = '/booking';
  };
  return (
    <div className='reserve-container'>
      <p>剩余座位数：50</p>
      <Button
        className='reserve-button'
        variant='contained'
        style={{
          backgroundColor: '#9999ff',
          color: '#ffffff',
        }}
        onClick={redirectToBookingPage}>
        <FaRegHandPointRight />
        点击此处预定
        <FaRegHandPointLeft />
      </Button>
    </div>
  );
};

export default Reserve;
