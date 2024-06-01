import React from 'react';
import exampleOrgImg from './example_org_img.jpg';
import {Typography, Card, CardMedia, CardContent, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const OrganizerInfo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };

  const organizerName = '南方科技大学计算机科学与工程系';
  const contactPerson = 'iroha';
  const contactPhone = '1942-88-312';

  return (
    <Box
      className='organizer-info'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '40%',
        height: 200,
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        padding: 2,
        borderRadius: 5,
        boxShadow: 1,
        transform: 'translateY(30%)',
        '&:hover': {
          boxShadow: 5,
        },
      }}
      onClick={handleClick}>
      <Box
        className='organizer-photo'
        sx={{
          width: '33%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar src={exampleOrgImg} sx={{width: 100, height: 100}} />
      </Box>
      <CardContent
        className='detail'
        sx={{
          width: '66%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}>
        <Typography
          variant='body1'
          component='div'
          sx={{whiteSpace: 'balance'}}>
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
