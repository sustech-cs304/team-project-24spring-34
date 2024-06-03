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

const mockEvents = [
  {
    id: 1,
    title: 'Event 1',
    time: '2024-06-01 10:00',
    location: 'Location 1',
    organizer: 'Organizer 1',
  },
  {
    id: 2,
    title: 'Event 2',
    time: '2024-06-02 11:00',
    location: 'Location 2',
    organizer: 'Organizer 2',
  },
  {
    id: 3,
    title: 'Event 3',
    time: '2024-06-03 12:00',
    location: 'Location 3',
    organizer: 'Organizer 3',
  },
  // 添加更多模拟事件数据
];

const mockFollowers = [
  {id: 1, name: '粉丝1', avatar: '/path-to-avatar1.jpg'},
  {id: 2, name: '粉丝2', avatar: '/path-to-avatar2.jpg'},
  {id: 3, name: '粉丝3', avatar: '/path-to-avatar3.jpg'},
  // 更多粉丝数据
];

const mockFollowing = [
  {id: 1, name: '关注1', avatar: '/path-to-avatar4.jpg'},
  {id: 2, name: '关注2', avatar: '/path-to-avatar5.jpg'},
  {id: 3, name: '关注3', avatar: '/path-to-avatar6.jpg'},
  // 更多关注数据
];

const mockUsers = [
  {id: 1, name: '关注1', avatar: '/path-to-avatar4.jpg'},
  {id: 2, name: '关注2', avatar: '/path-to-avatar5.jpg'},
  {id: 3, name: '关注3', avatar: '/path-to-avatar6.jpg'},
  // 更多关注数据
];

function OtherProfilePage() {
  const [selectedItem, setSelectedItem] = useState('profile');
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 用于存储选中的用户
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [users, setUsers] = useState([]); // 定义用户数据状态
  const {userId} = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  useEffect(() => {
    // 使用模拟数据
    setEvents(mockEvents);
    setFollowers(mockFollowers);
    setFollowing(mockFollowing);
    setUsers(mockUsers);
  }, []);

  const handleDelete = (id) => {
    // 模拟删除事件
    setEvents(events.filter((event) => event.id !== id));
  };

  //显示粉丝
  const handleUserClick = (user) => {
    setSelectedUser(user); // 将选中的用户信息存储在 selectedUser 状态中
  };

  // 关注用户
  const handleFollow = () => {
    // setFollowing([...following, user]);
  };

  // 取消关注用户
  const handleUnfollow = (id) => {
    setFollowing(following.filter((user) => user.id !== id));
  };

  // 显示粉丝
  const handleFollowersClick = () => {
    setSelectedItem('followers');
  };

  //显示关注的用户
  const handleFollowingClick = () => {
    setSelectedItem('following');
  };

  const isFollowing = () => {
    // 遍历关注列表
    // for (const followedUser of followingList) {
    //   // 如果当前用户的 id 与被检查用户的 id 匹配，则返回 true
    //   if (followedUser.id === follower.id) {
    //     return true;
    //   }
    // }
    // 如果未找到匹配项，则返回 false
    return false;
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
                src={user.avatar}
                sx={{width: 60, height: 60, marginRight: 2}}
              />
              <Box>
                <Typography variant='h6'>{user.username}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {user.user_group}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {user.id}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  followers: {followers.length}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  following: {following.length}
                </Typography>
              </Box>
            </Box>
            {isFollowing() ? (
              <IconButton
                edge='end'
                aria-label='unfollow'
                onClick={() => handleUnfollow(following.id)}>
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
                  <strong>ID:</strong> {user.id}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Username:</strong> {user.nickname}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Gender:</strong> {user.gender}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Age:</strong> {user.age || 23}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Phone:</strong> {user.phone}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Introduction:</strong>
                </Typography>
              </Box>
              <Box ml={4}>
                <Typography variant='body1'>{user.intro}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default OtherProfilePage;
