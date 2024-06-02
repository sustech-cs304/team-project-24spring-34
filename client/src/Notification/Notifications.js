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
} from '@mui/material';
import DefaultNavbar from './NotificationpageComponents/DefaultNavbar';
import theme from '../assets/theme';
import routes from '../publicAssets/routes';
import {useNavigate} from 'react-router-dom';

const TagEnum = {
  0: 'normal',
  1: 'important',
  2: 'urgent',
};

const NotificationBriefBlock = ({Notification}) => {
  const navigate = useNavigate();
  const {id, activateid, senderid, reciverid, title, content, tag, time, read} =
    Notification;
  const handelClickOnNotification = () => {
    console.log('Notification id:', id);
    navigate(`/details/${id}`);
  };

  let bgColor;
  if (read == false) {
    switch (tag) {
      case '0':
        bgColor = '#e0f7fa'; // normal
        break;
      case '1':
        bgColor = '#fff3e0'; // important
        break;
      case '2':
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
  const [notifications, setNotifications] = useState([]);
  const [userid, setUserid] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getUserid = async () => {
    // const response = await fetch('/api/userid');
    // const data = await response.json();
    // setUserid(data.userid);

    // test data
    setUserid('88');
  };

  const getNotifications = async (userid, page) => {
    setLoading(true);
    // const response = await fetch(`/api/Notifications/${userid}?page=${page}&limit=15`);
    // const data = await response.json();

    // For now, using test data

    const testData = [
      {
        id: '1',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'New activate relased',
        content: 'hello',
        tag: '0',
        time: '2021-10-10 10:10:10',
        read: false,
      },
      {
        id: '2',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'Activate detail changed',
        content: 'world!!',
        tag: '1',
        time: '2021-10-11 10:10:10',
        read: false,
      },
      {
        id: '3',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'DDL!!!!!',
        content: 'hello',
        tag: '2',
        time: '2021-10-13 10:10:10',
        read: false,
      },
      {
        id: '4',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'New activate relased',
        content: 'hello',
        tag: '0',
        time: '2021-10-10 10:10:10',
        read: false,
      },
      {
        id: '5',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'Activate detail changed',
        content: 'world!!',
        tag: '1',
        time: '2021-12-11 10:10:10',
        read: false,
      },
      {
        id: '6',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'DDL!!!!!',
        content: 'hello',
        tag: '2',
        time: '2021-10-13 10:10:10',
        read: false,
      },
      {
        id: '7',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'New activate relased',
        content: 'hello',
        tag: '0',
        time: '2021-10-10 10:10:10',
        read: false,
      },
      {
        id: '8',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'Activate detail changed',
        content: 'world!!',
        tag: '1',
        time: '2021-10-12 10:10:10',
        read: false,
      },
      {
        id: '9',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'DDL!!!!!',
        content: 'hello',
        tag: '2',
        time: '2021-10-13 10:10:10',
        read: false,
      },
      {
        id: '10',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'New activate relased',
        content: 'hello',
        tag: '0',
        time: '2021-10-10 10:10:10',
        read: false,
      },
      {
        id: '11',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'Activate detail changed',
        content: 'world!!',
        tag: '1',
        time: '2021-10-11 10:10:10',
        read: false,
      },
      {
        id: '12',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'DDL!!!!!',
        content: 'hello',
        tag: '2',
        time: '2021-10-13 10:10:10',
        read: false,
      },
      {
        id: '13',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'New activate relased',
        content: 'hello',
        tag: '0',
        time: '2021-10-13 10:10:10',
        read: false,
      },
      {
        id: '14',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'Activate detail changed',
        content: 'world!!',
        tag: '1',
        time: '2021-10-11 10:10:10',
        read: false,
      },
      {
        id: '15',
        activateid: '1',
        senderid: '99',
        reciverid: '88',
        title: 'DDL!!!!!',
        content: 'hello',
        tag: '2',
        time: '2021-10-13 10:10:10',
        read: false,
      },
    ];
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      ...testData,
    ]);
    setLoading(false);
  };

  useEffect(() => {
    getUserid().then(() => {
      setCurrentPage(1);
      setNotifications([]);
      getNotifications(userid, currentPage);
    });
  }, [userid]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    getNotifications(userid, currentPage + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar routes={routes} sticky />
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
