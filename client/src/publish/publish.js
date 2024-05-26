import FormInput from './components/formInput';

import DesignBlocks from '../mainpage/mainpageComponents/DesignBlocks';
import DefaultNavbar from '../mainpage/mainpageComponents/DefaultNavbar';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '../publicAssets/routes';
import theme from '../assets/theme';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MKTypography from '../components/MKTypography';

const Publish = () => {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <DefaultNavbar routes={routes} sticky />
          <Container>
            <FormInput />
            {/*<Grid container item xs={12} lg={7} justifyContent='center' mx='auto'>
            <MKTypography
              variant='h1'
              color='white'
              mt={-6}
              mb={1}
              sx={({breakpoints, typography: {size}}) => ({
                [breakpoints.down('md')]: {
                  fontSize: size['3xl'],
                },
              })}>
              Material Kit 2 React{' '}
            </MKTypography>
            <MKTypography
              variant='body1'
              color='white'
              textAlign='center'
              px={{xs: 100, lg: 1200}}
              mt={1}></MKTypography>
            
            </Grid>*/}
          </Container>
          {/*<TestForm />*/}

          {/* <DesignBlocks /> */}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Publish;
