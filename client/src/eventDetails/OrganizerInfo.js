import React from 'react';
import exampleOrgImg from './example_org_img.jpg';
import {Typography, Card, CardMedia, CardContent, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const OrganizerInfo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  const organizerName = '格赫娜学院';
  const contactPerson = 'iroha';
  const contactPhone = '1942-88-312';

  return (
    <Box
      className='organizer-info'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: 700,
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        boxShadow: 1,
        '&:hover': {
          boxShadow: 5,
        },
      }}
      onClick={handleClick}>
      <Box
        className='organizer-photo'
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}>
        <CardMedia
          component='img'
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: 1,
          }}
          image={exampleOrgImg}
          alt='organizer'
        />
      </Box>
      <CardContent
        className='detail'
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}>
        <Typography variant='body1' component='div' sx={{whiteSpace: 'nowrap'}}>
          <strong>主办方:</strong> {organizerName}
        </Typography>
        <Typography variant='body1' component='div' sx={{whiteSpace: 'nowrap'}}>
          <strong>联系人:</strong> {contactPerson}
        </Typography>
        <Typography variant='body1' component='div' sx={{whiteSpace: 'nowrap'}}>
          <strong>电话:</strong> {contactPhone}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default OrganizerInfo;
