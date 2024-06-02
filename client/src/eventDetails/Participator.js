import React from 'react';
import {Typography, Avatar, Card, Box} from '@mui/material';

const Participator = ({participator}) => {
  const {name, avatar} = participator;
  return (
    <Card
      className='participator'
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        p: 2,
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        ':hover': {
          boxShadow: 6,
        },
      }}>
      <Avatar
        src={avatar}
        sx={{
          width: 56,
          height: 56,
          mr: 2,
        }}
      />
      <Typography variant='body1'>{name}</Typography>
    </Card>
  );
};

const ParticipatorList = ({Participators}) => {
  return (
    <Box
      className='participator-list'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        mt: 4,
        width: '100%',
        maxWidth: '200px',
      }}>
      {Participators.map((participator) => (
        <Participator key={participator.id} participator={participator} />
      ))}
    </Box>
  );
};

export default ParticipatorList;
