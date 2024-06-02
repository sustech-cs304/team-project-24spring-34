import {
  Container,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MKButton from '../components/MKButton';
import AvatarUpload from './AvatarUpload'; // 引入头像上传组件
import {
  Delete as DeleteIcon,
  PersonOutline as PersonIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

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

function AdminProfile({user}) {
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [users, setUsers] = useState([]); // 定义用户数据状态
  const [selectedItem, setSelectedItem] = useState('profile');
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [events, setEvents] = useState({});
  const [error, setError] = useState(null);

  setFormData({
    username: user.nickname,
    gender: user.gender,
    age: user.age,
    phone: user.phone,
    email: user.email,
    intro: user.intro,
  });

  const handleEditClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: true}));
  };

  const handleSaveClick = async (field) => {
    setEditMode((prev) => ({...prev, [field]: false}));
    try {
      // Email format validation
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError('Invalid email format');
          setEditMode((prev) => ({...prev, [field]: true}));
          return;
        }
      }
      await axios.put('/api/me', {[field]: formData[field]});
      // Update the user state to reflect the new data
      // user[field] = formData[field];
      setFormData({
        username: user.nickname,
        gender: user.gender,
        age: user.age,
        phone: user.phone,
        email: user.email,
        intro: user.intro,
      });
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleCancelClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: false}));
    setFormData((prev) => ({...prev, [field]: user[field]}));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`);
    } catch (error) {
      setError(`Failed to delete event with id ${id}:`);
    }
  };

  // 关注用户
  const handleFollow = (user) => {
    setFollowing([...following, user]);
  };

  // 取消关注用户
  const handleUnfollow = (id) => {
    setFollowing(following.filter((user) => user.id !== id));
  };

  const isFollowing = (follower, followingList) => {
    // 遍历关注列表
    for (const followingUser of followingList) {
      // 如果当前用户的 id 与被检查用户的 id 匹配，则返回 true
      if (followingUser.id === follower.id) {
        return true;
      }
    }
    // 如果未找到匹配项，则返回 false
    return false;
  };

  // 定义更改用户类别函数
  const handleChangeUserType = (userId) => {
    // 执行更改用户类别的逻辑操作
  };

  // 定义删除用户函数
  const handleDeleteUser = (id) => {
    // 执行删除用户的逻辑操作
    setEvents(events.filter((user) => user.id !== id));
  };

  useEffect(() => {
    // 使用模拟数据
    setEvents(mockEvents);
    setFollowers(mockFollowers);
    setFollowing(mockFollowing);
    setUsers(mockUsers);
  }, []);

  const renderContent = () => {
    if (showAvatarUpload) {
      return <AvatarUpload onBack={() => setShowAvatarUpload(false)} />;
    }

    switch (selectedItem) {
      case 'profile':
        return (
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
                {editMode.nickname ? (
                  <>
                    <TextField
                      name='nickname'
                      value={formData.nickname}
                      onChange={handleChange}
                      size='small'
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('nickname')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('nickname')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      <strong>Username:</strong> {user.nickname}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleEditClick('nickname')}
                      sx={{ml: 1}}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                {editMode.gender ? (
                  <>
                    <TextField
                      name='gender'
                      value={formData.gender}
                      onChange={handleChange}
                      size='small'
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('gender')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('gender')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      <strong>Gender:</strong> {user.gender}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleEditClick('gender')}
                      sx={{ml: 1}}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                {editMode.age ? (
                  <>
                    <TextField
                      name='age'
                      value={formData.age}
                      onChange={handleChange}
                      size='small'
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('age')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('age')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      <strong>Age:</strong> {user.age}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleEditClick('age')}
                      sx={{ml: 1}}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                {editMode.phone ? (
                  <>
                    <TextField
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      size='small'
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('phone')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('phone')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      <strong>Phone:</strong> {user.phone}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleEditClick('phone')}
                      sx={{ml: 1}}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                {editMode.email ? (
                  <>
                    <TextField
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      size='small'
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('email')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('email')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleEditClick('email')}
                      sx={{ml: 1}}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>Introduction:</strong>
                </Typography>
                <IconButton
                  size='small'
                  onClick={() => handleEditClick('intro')}
                  sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box ml={4}>
                {editMode.intro ? (
                  <>
                    <TextField
                      name='intro'
                      value={formData.intro}
                      onChange={handleChange}
                      multiline
                      size='small'
                      rows={4}
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('intro')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('intro')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <Typography variant='body1'>{user.intro}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        );
      case 'security':
        return (
          <Box>
            <Typography variant='h6'>Security</Typography>
            <MKButton
              component={Link}
              to='/changePassword'
              variant='contained'
              sx={{
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}>
              Password Modification
            </MKButton>
          </Box>
        );
      case 'manageUsers':
        return (
          <Box>
            <Typography variant='h6'>User Management</Typography>
            <List>
              {mockUsers.map((user) => (
                <ListItem key={user.id} sx={{borderBottom: '1px solid #ddd'}}>
                  <ListItemText
                    primary={user.username}
                    secondary={user.user_group}
                  />
                  <IconButton
                    edge='end'
                    aria-label='change-user-type'
                    onClick={() => handleChangeUserType(user.id)}>
                    <PersonIcon /> {/* 更改用户类别图标按钮 */}
                  </IconButton>
                  <IconButton
                    edge='end'
                    aria-label='delete-user'
                    onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon /> {/* 删除用户图标按钮 */}
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'manageEvents':
        return (
          <Box p={3}>
            <Typography variant='h6' gutterBottom>
              Event Management
            </Typography>
            <List>
              {events.map((event) => (
                <ListItem key={event.id} sx={{borderBottom: '1px solid #ddd'}}>
                  <ListItemText
                    primary={event.title}
                    secondary={`${event.time} | ${event.location} | ${event.organizer}`}
                  />
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => handleDelete(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'followers':
        return (
          <Box>
            <Typography variant='h6'>All followers</Typography>
            <List>
              {followers.map((follower) => (
                <ListItem
                  key={follower.id}
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    alt={follower.nickname}
                    src={follower.avatar}
                    sx={{width: 40, height: 40, marginRight: 2}}
                  />
                  <ListItemText primary={follower.nickname} />
                  {isFollowing(follower) ? (
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
                      onClick={() => handleFollow(follower)}>
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
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'following':
        return (
          <Box>
            <Typography variant='h6'>All following</Typography>
            <List>
              {following.map((following) => (
                <ListItem
                  key={following.id}
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    alt={following.name}
                    src={following.avatar}
                    sx={{width: 40, height: 40, marginRight: 2}}
                  />
                  <ListItemText primary={following.nickname} />
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
                </ListItem>
              ))}
            </List>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
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
            src='/path-to-avatar.jpg' // 替换成实际的头像路径
            sx={{width: 60, height: 60, marginRight: 2}}
          />
          <Box>
            <Typography variant='h6'>{user.nickname}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {user.user_group}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {user.id}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              onClick={() => setSelectedItem('followers')}>
              followers: {followers.length}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              onClick={() => setSelectedItem('following')}>
              following: {following.length}
            </Typography>
          </Box>
        </Box>
        {/* 菜单项 */}
        <List component='nav'>
          <ListItem
            button
            onClick={() => setSelectedItem('profile')}
            sx={{
              backgroundColor: selectedItem === 'profile' ? 'black' : 'inherit',
              color: selectedItem === 'profile' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='Personal Profile' />
          </ListItem>
          <ListItem
            button
            onClick={() => setSelectedItem('security')}
            sx={{
              backgroundColor:
                selectedItem === 'security' ? 'black' : 'inherit',
              color: selectedItem === 'security' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='Security' />
          </ListItem>
          <ListItem
            button
            onClick={() => setSelectedItem('manageEvents')}
            sx={{
              backgroundColor:
                selectedItem === 'manageEvents' ? 'black' : 'inherit',
              color: selectedItem === 'manageEvents' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='Event Management' />
          </ListItem>
          <ListItem
            button
            onClick={() => setSelectedItem('manageUsers')}
            sx={{
              backgroundColor:
                selectedItem === 'manageUsers' ? 'black' : 'inherit',
              color: selectedItem === 'manageUsers' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='User Management' />
          </ListItem>
        </List>
      </Box>
      {/* 右侧内容区 */}
      <Box sx={{flexGrow: 1, paddingLeft: 3}}>{renderContent()}</Box>
    </Container>
  );
}

export default AdminProfile;
