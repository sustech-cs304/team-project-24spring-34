import React from 'react';
import {Typography, Box} from '@mui/material';
import Rating from './Rating'; // 确保 Rating 组件导出正确

const StartTimeComponent = ({startTime}) => {
  return (
    <Typography variant='body1' gutterBottom>
      🕒 <strong>Start Time</strong>: {new Date(startTime).toLocaleString()}
    </Typography>
  );
};

const EndTimeComponent = ({endTime}) => {
  return (
    <Typography variant='body1' gutterBottom>
      🕒 <strong>End Time</strong>: {new Date(endTime).toLocaleString()}
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
  const namelist = classifications.map((classification) => classification.name);
  return (
    <Typography variant='body1' gutterBottom>
      🏷️ <strong>Tags</strong>: {namelist.join(', ')}
    </Typography>
  );
};

const EventDetails = ({
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
        <StartTimeComponent startTime={startTime} />
        <EndTimeComponent endTime={endTime} />
        <LocationComponent location={location} />
        <ClassificationComponent classifications={classifications} />
      </section>
    </Box>
  );
};

export default EventDetails;
