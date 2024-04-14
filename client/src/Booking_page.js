import React, { useState, useEffect }  from 'react';
import { TextField, Button } from '@mui/material';

const BookingPage = () => {
    const [seats, setSeats] = useState([
      { id: 1, row: 1, col: 1, status: 'available' },
      { id: 2, row: 1, col: 2, status: 'available' },
    ]);
  
    const handleSeatSelect = (seatId) => {
      setSeats(prevSeats => prevSeats.map(seat => {
        if (seat.id === seatId) {
          return { ...seat, status: seat.status === 'available' ? 'selected' : 'available' };
        }
        return seat;
      }));
    };
  
    const handleConfirm = () => {
      console.log('Selected seats:', seats.filter(seat => seat.status === 'selected'));
    };
  
    return (
      <div>
        <h2>Seat Reservation</h2>
        <table>
          <tbody>
            {seats.map(seat => (
              <tr key={seat.id}>
                <td
                  className={seat.status}
                  onClick={() => handleSeatSelect(seat.id)}
                >
                  {seat.row} - {seat.col}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    );
};

export default BookingPage;