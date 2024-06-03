import React, {useEffect, useState} from 'react';
import CrowdProfile from './crowdProfile';
import HostProfile from './hostProfile';
import theme from '../assets/theme';
import {ThemeProvider} from '@mui/material/styles';
import MKTypography from '../components/MKTypography';
import CssBaseline from '@mui/material/CssBaseline';
import AdminProfile from './adminProfile';
import axios from 'axios';
import DefaultNavbar_1 from '../mainpage/mainpageComponents/DefaultNavbar_1';

function ProfilePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/me`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
            },
          },
        );
        console.log('Fetched data:', response.data); // Add a log statement
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error); // Add error log
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultNavbar_1 />
        <MKTypography variant='h6'>Loading...</MKTypography>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultNavbar_1 />
        <MKTypography variant='h6'>Error: {error.message}</MKTypography>
      </ThemeProvider>
    );
  }

  const renderProfile = () => {
    if (!data) {
      return <MKTypography variant='h6'>No user data available.</MKTypography>;
    }
    switch (data.user.user_group) {
      case 1:
        return <CrowdProfile />;
      case 2:
        return <HostProfile />;
      case 3:
        return <AdminProfile />;
      default:
        return <MKTypography variant='h6'>Unknown user group.</MKTypography>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar_1 />
      {renderProfile()}
    </ThemeProvider>
  );
}

export default ProfilePage;
