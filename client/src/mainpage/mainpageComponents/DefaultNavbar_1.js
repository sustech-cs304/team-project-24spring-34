import MKBox from '../../components/MKBox';
import {Link} from 'react-router-dom';
import MKTypography from '../../components/MKTypography';
import React from 'react';
import {RxPerson} from 'react-icons/rx';
import {VscSignIn, VscSignOut} from 'react-icons/vsc';
import {PiEnvelopeSimpleLight} from 'react-icons/pi';
import {MdOutlinePublish} from 'react-icons/md';
import {AiOutlineHome} from 'react-icons/ai';
import {IoIosSearch} from 'react-icons/io';

function DefaultNavbar_1() {
  return (
    <MKBox display='flex' justifyContent='space-between' alignItems='center'>
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
            marginRight: '300px',
          }}>
          Campus Events and Entertainment Center
        </MKTypography>
      </MKBox>
      <MKBox display='flex' alignItems='center' marginLeft='auto'>
        <MKBox
          component={Link}
          to='/search'
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
          }}>
          <IoIosSearch />
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
  );
}

export default DefaultNavbar_1;
