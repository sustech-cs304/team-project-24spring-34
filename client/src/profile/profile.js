import React, {useState} from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import CrowdProfile from './crowdProfile';
import HostProfile from './hostProfile';
import DefaultNavbar from '../mainpage/mainpageComponents/DefaultNavbar';
import routes from '../publicAssets/routes';
import theme from '../assets/theme';
import {ThemeProvider} from '@mui/material/styles';
import MKBox from '../components/MKBox';
import {Link} from 'react-router-dom';
import MKTypography from '../components/MKTypography';
import {AiOutlineHome} from 'react-icons/ai';
import {MdOutlinePublish} from 'react-icons/md';
import {PiEnvelopeSimpleLight} from 'react-icons/pi';
import {RxPerson} from 'react-icons/rx';
import {VscSignIn, VscSignOut} from 'react-icons/vsc';
import CssBaseline from '@mui/material/CssBaseline';
import AdminProfile from './adminProfile';

function ProfilePage(user) {
  const renderProfile = () => {
    switch ('crowd') {
      case 'crowd':
        return <CrowdProfile user={user} />;
      case 'host':
        return <HostProfile user={user} />;
      case 'admin':
        return <AdminProfile user={user} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MKBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'>
          <MKBox
            component={Link}
            to='/'
            lineHeight={1}
            sx={{
              textDecoration: 'none',
            }}>
            <MKTypography
              variant='button'
              fontWeight='bold'
              sx={{
                fontSize: '1.2rem',
              }}>
              Campus Events and Entertainment Center
            </MKTypography>
          </MKBox>
          <MKBox display='flex' alignItems='center' marginLeft='auto'>
            <MKBox
              component={Link}
              to='/'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                ml: 1,
                fontSize: '1.5rem',
              }}>
              <AiOutlineHome />
            </MKBox>
            <MKBox
              component={Link}
              to='/publish'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                ml: 1,
                fontSize: '1.5rem',
              }}>
              <MdOutlinePublish />
            </MKBox>
            <MKBox
              component={Link}
              to='/'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                ml: 1,
                fontSize: '1.5rem',
              }}>
              <PiEnvelopeSimpleLight />
            </MKBox>
            <MKBox
              component={Link}
              to='/profilePage'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                ml: 1,
                fontSize: '1.5rem',
              }}>
              <RxPerson />
            </MKBox>
            <MKBox
              component={Link}
              to='/login'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                ml: 1,
                fontSize: '1.5rem',
              }}>
              <VscSignIn />
            </MKBox>
            <MKBox
              component={Link}
              to='/'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
                ml: 1,
                fontSize: '1.5rem',
              }}>
              <VscSignOut />
            </MKBox>
          </MKBox>
        </MKBox>
        {renderProfile()}
      </ThemeProvider>
    </div>
  );
}

export default ProfilePage;
