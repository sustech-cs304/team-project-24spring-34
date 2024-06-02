import React, {useState, useEffect} from 'react';
import exampleOrgImg from './example_org_img.jpg';
import {Typography, Box, CardContent} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const OrganizerInfo = ({organizerid}) => {
  const navigate = useNavigate();
  const [organizerInfo, setOrganizerInfo] = useState(null);

  // Fetch organizer info from backend
  useEffect(() => {
    async function fetchOrganizerInfo() {
      try {
        // const response = await fetch(`/api/organizer/${organizerid}`);
        // const data = await response.json();
        // Test data
        const data = {
          organizerName: '格赫娜学院万魔殿',
          contactPerson: 'iroha',
          contactPhone: '123-456-7890',
          organizerAvatar: exampleOrgImg,
        };
        setOrganizerInfo(data);
      } catch (error) {
        console.error('Error fetching organizer info:', error);
      }
    }

    if (organizerid) {
      fetchOrganizerInfo();
    }
  }, [organizerid]);

  const handleClick = () => {
    navigate('/profile');
  };

  if (!organizerInfo) {
    return null;
  }

  const {organizerName, contactPerson, contactPhone, organizerAvatar} =
    organizerInfo;

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
        <Avatar src={organizerAvatar} sx={{width: 100, height: 100}} />
      </Box>
      <CardContent
        className='detail'
        sx={{
          width: '66%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start', // 对齐到左侧
          padding: 2,
        }}>
        <Typography
          variant='body1'
          component='div'
          sx={{whiteSpace: 'nowrap', textAlign: 'left'}}>
          <strong>Org:</strong> {organizerName}
        </Typography>
        <Typography
          variant='body1'
          component='div'
          sx={{whiteSpace: 'nowrap', textAlign: 'left'}}>
          <strong>Contact:</strong> {contactPerson}
        </Typography>
        <Typography
          variant='body1'
          component='div'
          sx={{whiteSpace: 'nowrap', textAlign: 'left'}}>
          <strong>Phone:</strong> {contactPhone}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default OrganizerInfo;
