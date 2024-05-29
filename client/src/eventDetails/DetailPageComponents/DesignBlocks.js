/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import {Link} from 'react-router-dom';

// @mui material components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Material Kit 2 React components
import MKBox from '../../components/MKBox';
import MKBadge from '../../components/MKBadge';
import MKTypography from '../../components/MKTypography';

// Presentation page components
import DefaultInfoCard from '../../publicAssets/DefaultInfoCard';

// Data
import data from './designBlocksData';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function DesignBlocks() {
  const renderData = data.map(({title, description, items}) => (
    <Grid container spacing={3} sx={{mb: 10}} key={title}>
      <Grid item xs={12} lg={3}>
        <MKBox position='sticky' top='100px' pb={{xs: 2, lg: 6}}>
          <MKTypography variant='h3' fontWeight='bold' mb={1}>
            {title}
          </MKTypography>
          <Typography
            variant='body2'
            fontWeight='regular'
            color='secondary'
            mb={1}
            pr={2}>
            {description}
          </Typography>
        </MKBox>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container spacing={3}>
          {items.map(({title, description, date, time, site, host, route}) => (
            <Grid item xs={12} md={4} sx={{mb: 2}} key={title}>
              <Link to={route}>
                <DefaultInfoCard
                  title={title}
                  description={description}
                  date={date}
                  time={time}
                  site={site}
                  host={host}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ));

  return (
    <MKBox component='section' my={6} py={6}>
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
      <Container sx={{mt: 6}}>{renderData}</Container>
    </MKBox>
  );
}

export default DesignBlocks;
