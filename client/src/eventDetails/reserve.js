import React, {useState} from 'react';
import {Button, Typography} from '@mui/material';
import {FaRegHandPointRight, FaRegHandPointLeft} from 'react-icons/fa';
import axios from 'axios';

const Reserve = ({capacity, seats, event_id, already_reserved}) => {
  const authToken = localStorage.getItem('authToken');
  const [color, setColor] = useState('#9999ff');

  const handleReserve = async () => {
    try {
      await axios.post(
        `http://10.27.41.93:5000/api/event-reservations/${event_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          },
        },
      );
      setColor('#66bb6a');
    } catch (error) {
      console.error(error);
    }
    if (!already_reserved) {
      seats = seats - 1;
    }
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
          backgroundColor: color,
          color: '#ffffff',
        }}
        onClick={handleReserve}>
        <FaRegHandPointLeft style={{marginRight: '8px'}} />
        Click here to book
        <FaRegHandPointRight style={{marginLeft: '8px'}} />
      </Button>
    </div>
  );
};

export default Reserve;
