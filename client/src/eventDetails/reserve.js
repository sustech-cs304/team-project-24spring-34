import React from 'react';
import {Button} from '@mui/material';

const Reserve = () => {
  const redirectToBookingPage = () => {
    window.location.href = '/booking';
  };
  return (
    <div className='reserve-container'>
      <p>剩余座位数：50</p>
      <Button variant='contained' onClick={redirectToBookingPage}>
        预定
      </Button>
    </div>
  );
};

export default Reserve;
