import React, {useEffect, useState} from 'react';
import {
  ThemeProvider,
  Divider,
  CssBaseline,
  Container,
  Grid,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  stepButtonClasses,
} from '@mui/material';
import DefaultNavbar from './NotificationpageComponents/DefaultNavbar';
import theme from '../assets/theme';
import routes from '../publicAssets/routes';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const TagEnum = {
  1: 'normal',
  2: 'important',
  3: 'urgent',
};

const NotificationBriefBlock = ({Notification}) => {
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const {id, activateid, senderid, reciverid, title, content, tag, time, read} =
    Notification;
  const handelClickOnNotification = async () => {
    try {
      await axios.put(
        `http://10.27.41.93:5000/api/messages/${id}`,
        {
          read: true,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          },
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
    }
    navigate(`/details/${id}`);
  };

  let bgColor;
  if (read == false) {
    switch (tag) {
      case '1':
        bgColor = '#e0f7fa'; // normal
        break;
      case '2':
        bgColor = '#fff3e0'; // important
        break;
      case '3':
        bgColor = '#ffebee'; // urgent
        break;
      default:
        bgColor = '#ffffff'; // default
    }
  } else {
    bgColor = '#f0f0f0'; // read
  }

  return (
    <Card
      sx={{backgroundColor: bgColor, borderRadius: '16px', mb: 2}}
      onClick={handelClickOnNotification}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 2,
          alignItems: 'flex-start',
        }}>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body2'>{content}</Typography>
        <Typography variant='caption' color='textSecondary'>
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Notifications = () => {
  const authToken = localStorage.getItem('authToken');
  const [notifications, setNotifications] = useState([]);
  const [lastPage, setLastPage] = useState(-1);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getNotifications = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://10.27.41.93:5000/api/messages?limit=${15 * page}&offset=${0}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
          },
        },
        {
          withCredentials: true,
        },
      );

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage === 1) {
      setNotifications([]);
    }
    getNotifications(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar routes={routes} sticky />
      <Box
        sx={{
          width: 1112,
          height: 10,
        }}
      />
      <Container>
        <main
          style={{
            marginTop: 120,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant='h4' gutterBottom>
            Notifications
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            {notifications.map((notification) => (
              <Grid item xs={12} key={notification.id}>
                <NotificationBriefBlock Notification={notification} />
              </Grid>
            ))}
          </Grid>
          {!loading && notifications.length % 15 === 0 && (
            <Box mt={2} textAlign='center'>
              <Button
                variant='contained'
                onClick={handleLoadMore}
                style={{
                  backgroundColor: '#9999ff',
                  color: '#ffffff',
                }}>
                Load More
              </Button>
            </Box>
          )}
          {loading && (
            <Box mt={2} textAlign='center'>
              <Typography variant='body1'>Loading...</Typography>
            </Box>
          )}
        </main>
        <Divider />
      </Container>
    </ThemeProvider>
  );
};

export default Notifications;
