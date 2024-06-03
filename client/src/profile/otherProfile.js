import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import MKButton from '../components/MKButton';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../assets/theme';
import CssBaseline from '@mui/material/CssBaseline';
import MKBox from '../components/MKBox';
import MKTypography from '../components/MKTypography';
import {IoIosSearch} from 'react-icons/io';
import {AiOutlineHome} from 'react-icons/ai';
import {MdOutlinePublish} from 'react-icons/md';
import {PiEnvelopeSimpleLight} from 'react-icons/pi';
import {RxPerson} from 'react-icons/rx';
import {VscSignIn, VscSignOut} from 'react-icons/vsc';
import DefaultNavbar_1 from '../mainpage/mainpageComponents/DefaultNavbar_1';
import axios from 'axios';

const authToken = localStorage.getItem('authToken');
function OtherProfilePage() {
  let {username} = useParams();
  const [selectedItem, setSelectedItem] = useState('profile');
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 用于存储选中的用户
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [users, setUsers] = useState([]); // 定义用户数据状态
  const [data, setData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const fetchUser = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${username}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3Mzk3OTg5LCJleHAiOjE3MTc0ODQzODl9.9F-O9zfHZad_wnsF40dht9mYK7lV9AFAQjwMgh8Vpss',
        },
      },
    );
    setData(response.data);
  };

  const fetchMe = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setFollowers(response.data.followers);
    setFollowing(response.data.following);
  };

  useEffect(() => {
    fetchUser();
    fetchMe();
  }, [username]);

  // 关注用户
  const handleFollow = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/${username}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3Mzk3OTg5LCJleHAiOjE3MTc0ODQzODl9.9F-O9zfHZad_wnsF40dht9mYK7lV9AFAQjwMgh8Vpss`,
        },
      },
    );
    fetchUser();
    fetchMe();
  };

  // 取消关注用户
  const handleUnfollow = async () => {
    const Response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/${username}/follow`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3Mzk3OTg5LCJleHAiOjE3MTc0ODQzODl9.9F-O9zfHZad_wnsF40dht9mYK7lV9AFAQjwMgh8Vpss',
        },
      },
    );
    fetchUser();
    fetchMe();
  };

  useEffect(() => {
    const checkIsFollowing = () => {
      for (const followedUser of followers) {
        if (followedUser.username === data.username) {
          return true;
        }
      }
      return false;
    };

    setIsFollowing(checkIsFollowing());
  }, [followers, data.username]);

  const getUserGenderText = (gender) => {
    switch (gender) {
      case 1:
        return 'Male';
      case 2:
        return 'Female';
      case 3:
        return 'Other';
      default:
        return '';
    }
  };

  const getUserGroupText = (group) => {
    switch (group) {
      case 1:
        return 'Audience';
      case 2:
        return 'Organizer';
      case 3:
        return 'Admin';
      default:
        return '';
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultNavbar_1 />
        <Container sx={{display: 'flex', height: '100vh', paddingTop: 2}}>
          {/* 左侧边栏 */}
          <Box
            sx={{
              width: 250,
              borderRight: '1px solid #ddd',
              paddingRight: 2,
            }}>
            {/* 头像和名字 */}
            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
              <Avatar
                alt='User Avatar'
                src={data.avatar}
                sx={{width: 60, height: 60, marginRight: 2}}
              />
              <Box>
                <Typography variant='h6'>{data.username}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {getUserGroupText(data.user_group)}
                </Typography>
              </Box>
            </Box>
            {isFollowing ? (
              <IconButton
                edge='end'
                aria-label='unfollow'
                onClick={() => handleUnfollow()}>
                <MKButton
                  variant='contained'
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    },
                  }}>
                  unfollow
                </MKButton>
              </IconButton>
            ) : (
              <IconButton
                edge='end'
                aria-label='follow'
                onClick={() => handleFollow()}>
                <MKButton
                  variant='contained'
                  sx={{
                    backgroundColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#F5F5F5',
                    },
                  }}>
                  follow
                </MKButton>
              </IconButton>
            )}
          </Box>
          {/* 右侧内容区 */}
          <Box>
            <Box>
              <Typography variant='h6' gutterBottom>
                Personal Profile
              </Typography>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Username:</strong> {data.username}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Nickname:</strong> {data.nickname}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Gender:</strong> {getUserGenderText(data.gender)}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Birthday:</strong> {data.birthday}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Email:</strong> {data.user_email}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Introduction:</strong> {data.user_intro}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default OtherProfilePage;
