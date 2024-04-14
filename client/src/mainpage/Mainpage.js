import DesignBlocks from './DesignBlocks';
import DefaultNavbar from './DefaultNavbar';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from './routes';
import theme from '../assets/theme';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MKTypography from '../components/MKTypography';

function Mainpage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar routes={routes} sticky />
      <Container>
        <Grid container item xs={12} lg={7} justifyContent='center' mx='auto'>
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
        </Grid>
      </Container>
      {/*<TestForm />*/}
      <DesignBlocks />
    </ThemeProvider>
  );
}

export default Mainpage;
