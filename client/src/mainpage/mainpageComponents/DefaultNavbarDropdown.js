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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// react-router-dom components
import {Link} from 'react-router-dom';

// @mui material components
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';
import React, {useState} from 'react';

// // Material Kit 2 React components
// import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MKTypography from '../../components/MKTypography';
import MKBox from '../../components/MKBox';

function DefaultNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  collapse,
  ...rest
}) {
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const linkComponent = {
    component: 'a',
    href,
    target: '_blank',
    rel: 'noreferrer',
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  return (
    <>
      <MKBox
        {...rest}
        mx={1}
        p={1}
        display='flex'
        alignItems='baseline'
        color={light ? 'white' : 'dark'}
        opacity={light ? 1 : 0.6}
        sx={{cursor: 'pointer', userSelect: 'none'}}>
        <MKTypography
          variant='body2'
          lineHeight={1}
          color='inherit'
          sx={{alignSelf: 'center', '& *': {verticalAlign: 'middle'}}}>
          {icon}
        </MKTypography>
        <Link to={route}>
          <MKTypography
            variant='button'
            fontWeight='regular'
            textTransform='capitalize'
            color={light ? 'white' : 'dark'}
            sx={{
              fontWeight: '100%',
              ml: 0.5,
              mr: 0.25,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }}
            onMouseLeave={() => {
              setBackgroundColor('transparent');
            }}>
            {name}
          </MKTypography>
        </Link>
        <MKTypography
          variant='body2'
          color={light ? 'white' : 'dark'}
          ml='auto'>
          <Icon sx={{fontWeight: 'normal', verticalAlign: 'middle'}}>
            {collapse && 'keyboard_arrow_down'}
          </Icon>
        </MKTypography>
      </MKBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  children: false,
  collapseStatus: false,
  light: false,
  href: '',
  route: '',
};

// Typechecking props for the DefaultNavbarDropdown
DefaultNavbarDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string,
};

export default DefaultNavbarDropdown;
