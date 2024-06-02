import React from 'react';
import {Typography, Box} from '@mui/material';
import Rating from './Rating'; // 确保 Rating 组件导出正确

const DateComponent = ({date}) => {
  return (
    <Typography variant='body1' gutterBottom>
      📅 <strong>Date</strong>: {date}
    </Typography>
  );
};

const TimeComponent = ({startTime, endTime}) => {
  return (
    <Typography variant='body1' gutterBottom>
      ⏰ <strong>Time</strong>: {startTime} - {endTime}
    </Typography>
  );
};

const LocationComponent = ({location}) => {
  return (
    <Typography variant='body1' gutterBottom>
      📍 <strong>Location</strong>: {location}
    </Typography>
  );
};

const ClassificationComponent = ({classifications}) => {
  return (
    <Typography variant='body1' gutterBottom>
      🏷️ <strong>Tags</strong>: {classifications.name.join(', ')}
    </Typography>
  );
};

const EventDetails = ({
  date,
  location,
  startTime,
  endTime,
  rating,
  rating_num,
  classifications,
}) => {
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
      <Rating rating={rating} rating_num={rating_num} />
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '10px',
          marginTop: '30px',
        }}>
        <DateComponent date={date} />
        <TimeComponent startTime={startTime} endTime={endTime} />
        <LocationComponent location={location} />
        <ClassificationComponent classifications={classifications} />
      </section>
    </Box>
  );
};

export default EventDetails;
