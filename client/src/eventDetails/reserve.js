import React from 'react';
import {Button} from '@mui/material';
import {FaRegHandPointRight} from 'react-icons/fa6';
import {FaRegHandPointLeft} from 'react-icons/fa6';
import {useState} from 'react';
import {Typography} from '@mui/material';

const Reserve = ({capacity, seats}) => {
  const redirectToBookingPage = () => {
    window.location.href = '/booking';
  };
  return (
    <div className='reserve-container'>
      <section
        style={{
          marginTop: '20px',
        }}>
        <Typography variant='body1'>
          <strong>Capacity:</strong> {capacity === 0 ? 'Unlimited' : capacity}
        </Typography>
        <Typography variant='body1'>
          <strong>Spare seat:</strong> {capacity === 0 ? 'N/A' : seats}
        </Typography>
      </section>

      <Button
        className='reserve-button'
        variant='contained'
        style={{
          backgroundColor: '#9999ff',
          color: '#ffffff',
        }}
        onClick={redirectToBookingPage}>
        <FaRegHandPointRight />
        Click here to book
        <FaRegHandPointLeft />
      </Button>
    </div>
  );
};

export default Reserve;
