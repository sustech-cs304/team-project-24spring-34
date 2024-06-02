import DesignBlocks from './mainpageComponents/DesignBlocks';
import DefaultNavbar from './mainpageComponents/DefaultNavbar';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '../publicAssets/routes';
import theme from '../assets/theme';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MKTypography from '../components/MKTypography';
import MKInput from '../components/MKInput';
import React from 'react';
import TestForm from './mainpageComponents/TestForm';
import Box from '@mui/material/Box';
import MKBadge from '../components/MKBadge';

function Mainpage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar sticky />
      <Box
        sx={{
          width: 100,
          height: 100,
        }}
      />
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection='column'
          alignItems='center'
          sx={{textAlign: 'center', my: 6, mx: 'auto', px: 0.75}}>
          <MKBadge
            variant='contained'
            color='info'
            badgeContent='Notice Board'
            container
            sx={{mb: 2}}
          />
          <MKTypography variant='h2' fontWeight='bold'>
            Welcome to Campus Events and Entertainment Center!
          </MKTypography>
          <MKTypography variant='body1' color='text'>
            ......
          </MKTypography>
        </Grid>
      </Container>
      <DesignBlocks />
    </ThemeProvider>
  );
}

export default Mainpage;
