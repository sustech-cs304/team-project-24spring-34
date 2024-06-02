import React, {useEffect, useState} from 'react';
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
import CssBaseline from '@mui/material/CssBaseline';
import {IoIosSearch} from 'react-icons/io';
import {AiOutlineHome} from 'react-icons/ai';
import {MdOutlinePublish} from 'react-icons/md';
import {PiEnvelopeSimpleLight} from 'react-icons/pi';
import {RxPerson} from 'react-icons/rx';
import {VscSignIn, VscSignOut} from 'react-icons/vsc';
import AdminProfile from './adminProfile';
import axios from 'axios';
import DefaultNavbar_1 from '../mainpage/mainpageComponents/DefaultNavbar_1';

function ProfilePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/me');
  //       setData(response.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);
  //
  // if (loading) {
  //   return <MKTypography variant='h6'>Loading...</MKTypography>;
  // }
  //
  // if (error) {
  //   return <MKTypography variant='h6'>Error: {error.message}</MKTypography>;
  // }
  const renderProfile = () => {
    switch (data.user_group) {
      case 1:
        return <CrowdProfile user={data} />;
      case 2:
        return <HostProfile user={data} />;
      case 3:
        return <AdminProfile user={data} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultNavbar_1 />
        {renderProfile()}
      </ThemeProvider>
    </div>
  );
}

export default ProfilePage;
