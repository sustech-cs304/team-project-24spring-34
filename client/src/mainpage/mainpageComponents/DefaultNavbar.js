/* eslint-disable no-param-reassign */
/**
 =========================================================
 * Material Kit 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-kit-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import React, {Fragment, useState, useEffect} from 'react';

// react-router components
import {Link} from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import Container from '@mui/material/Container';
import Icon from '@mui/material/Icon';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';

// Material Kit 2 React components
import MKBox from '../../components/MKBox';
import MKTypography from '../../components/MKTypography';
import MKButton from '../../components/MKButton';

// Material Kit 2 React example components
import DefaultNavbarDropdown from './DefaultNavbarDropdown';

import {RxPerson} from 'react-icons/rx';
import {VscSignIn, VscSignOut} from 'react-icons/vsc';
import {PiEnvelopeSimpleLight} from 'react-icons/pi';
import {MdOutlinePublish} from 'react-icons/md';
import {AiOutlineHome} from 'react-icons/ai';

import DefaultInfoCard from '../../publicAssets/DefaultInfoCard';
import {IoIosSearch} from 'react-icons/io';

// Material Kit 2 React base styles

function DefaultNavbar({
  brand,
  transparent,
  light,
  action,
  sticky,
  relative,
  center,
}) {
  return (
    <Container sx={sticky ? {position: 'sticky', top: 0, zIndex: 10} : null}>
      <MKBox
        py={1}
        px={{xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2}}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? '100%' : 'calc(100% - 48px)'}
        borderRadius='xl'
        shadow={transparent ? 'none' : 'md'}
        color={light ? 'white' : 'dark'}
        position={relative ? 'relative' : 'absolute'}
        left={0}
        zIndex={3}
        sx={({
          palette: {transparent: transparentColor, white},
          functions: {rgba},
        }) => ({
          backgroundColor: transparent
            ? transparentColor.main
            : rgba(white.main, 0.8),
          backdropFilter: transparent ? 'none' : 'saturate(200%) blur(30px)',
        })}>
        <MKBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'>
          <MKBox
            component={Link}
            to='/'
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            pl={relative || transparent ? 0 : {xs: 0, lg: 1}}>
            <MKTypography
              variant='button'
              fontWeight='bold'
              color={light ? 'white' : 'dark'}>
              {brand}
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
              }}>
              <VscSignOut />
            </MKBox>
          </MKBox>
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: 'Campus Events and Entertainment Center',
  transparent: false,
  light: false,
  action: false,
  sticky: false,
  relative: false,
  center: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(['external', 'internal']).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'dark',
        'light',
        'default',
        'white',
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
  center: PropTypes.bool,
};

export default DefaultNavbar;
