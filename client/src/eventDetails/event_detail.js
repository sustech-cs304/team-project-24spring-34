import React from 'react';
import {Typography, Box} from '@mui/material';
import Rating from './Rating';

const DateComponent = ({date}) => {
  return (
    <Typography variant='body1' gutterBottom>
      📅 <strong>日期</strong>: {date}
    </Typography>
  );
};

const TimeComponent = ({startTime, endTime}) => {
  return (
    <Typography variant='body1' gutterBottom>
      ⏰ <strong>时间</strong>: {startTime} - {endTime}
    </Typography>
  );
};

const LocationComponent = ({location}) => {
  return (
    <Typography variant='body1' gutterBottom>
      📍 <strong>地点</strong>: {location}
    </Typography>
  );
};

const ClassificationComponent = ({classifications}) => {
  return (
    <Typography variant='body1' gutterBottom>
      🏷️ <strong>分类</strong>: {classifications.join(', ')}
    </Typography>
  );
};

const EventDetails = () => {
  return (
    <Box
      className='event-details'
      mt={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '40px',
        marginTop: '30px',
      }}>
      <Rating rating={4.0} rating_num={19} />
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px',
          marginTop: '30px',
        }}>
        <DateComponent date='2024-4-26' />
        <TimeComponent startTime='10:00' endTime='12:00' />
        <LocationComponent location='格赫娜学院' />
        <ClassificationComponent classifications={['偷跑', '装甲']} />
      </section>
    </Box>
  );
};

export default EventDetails;
