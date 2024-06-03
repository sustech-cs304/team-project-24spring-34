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
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import {
  Delete as DeleteIcon,
  DeleteOutline as DeleteOutlineIcon,
  PersonOutline as PersonIcon,
} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import AvatarUpload from './AvatarUpload';
function HostProfile() {
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [selectedItem, setSelectedItem] = useState('profile');
  const [editMode, setEditMode] = useState({});
  const [user, setUser] = useState({});
  const [userHard, setUserHard] = useState({});
  const [allUsers, setUsers] = useState([]);
  const [allEvents, setEvents] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [formData, setFormData] = useState({
  //   username: user.username,
  //   nickname: user.nickname,
  //   user_group: user.user_group,
  //   avatar: user.avatar,
  //   user_intro: user.user_intro,
  //   user_email: user.user_email,
  //   password: user.password,
  //   gender: user.gender,
  //   birthday: user.birthday,
  //   following: user.following || [],
  //   followers: user.followers || [],
  // });
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
        },
      });
      console.log('Fetched data:', response.data); // Add a log statement
      setUser(response.data);
      setUserHard(response.data);
    } catch (error) {
      console.error('Error fetching data:', error); // Add error log
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchDataAll = async () => {
    setLoading(true);
    try {
      const usersResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMxODQ1LCJleHAiOjE3MTc0MTgyNDV9.Cp30IBolsYEIoslPH-UBBk_EWKJEbMAGil118Hltt0A`,
          },
        },
      );
      const eventsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/events`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMxODQ1LCJleHAiOjE3MTc0MTgyNDV9.Cp30IBolsYEIoslPH-UBBk_EWKJEbMAGil118Hltt0A`,
          },
        },
      );

      setUsers(usersResponse.data);
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataAll();
  }, []);

  const handleEditClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: true}));
  };

  const handleSaveClick = async (field) => {
    // 对字段进行保存操作
    setEditMode((prev) => ({...prev, [field]: false}));
    // setUser(prevFormData => ({
    //   ...prevFormData,
    //   gender: tempGender
    // }));
    try {
      // const updatedUser = { ...user, ...formData };
      await axios.put(`${process.env.REACT_APP_API_URL}/me`, user, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
        },
      });
      // 更新用户数据状态
      // setUser(updatedUser);
      fetchData();
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleCancelClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: false}));
    setUser((prev) => ({...prev, [field]: user[field]}));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'gender') {
      if (value === 'null1') {
        setUser((prev) => ({...prev, [name]: null}));
        // setTempGender(null);
      } else {
        setUser((prev) => ({...prev, [name]: value}));
        // setTempGender(value);
      }
    } else {
      setUser((prev) => ({...prev, [name]: value}));
    }
  };

  // function handleChangeGender(e) {
  //   setTempGender(e.target.value === 'null' ? null : e.target.value);
  // }

  const handleFollow = (userToFollow) => {
    setUser((prev) => ({
      ...prev,
      following: [...prev.following, userToFollow],
    }));
  };

  const handleUnfollow = (id) => {
    setUser((prev) => ({
      ...prev,
      following: prev.following.filter((userId) => userId !== id),
    }));
  };

  const isFollowing = (followerId, followingList) => {
    return followingList.includes(followerId);
  };

  // 定义更改用户类别函数
  const handleChangeUserType = (userId, user_type) => {};

  // 定义删除用户函数
  const handleDeleteUser = async (username) => {
    try {
      // 发起删除请求
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${username}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
        },
      });

      // 删除成功后重新获取数据
      fetchDataAll();
    } catch (error) {
      setError(`Failed to delete event with username ${username}:`);
    }
  };

  const handleDelete = async (id) => {
    try {
      // 发起删除请求
      await axios.delete(`${process.env.REACT_APP_API_URL}/events/${id}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
        },
      });

      // 删除成功后重新获取数据
      fetchDataAll();
    } catch (error) {
      setError(`Failed to delete event with id ${id}:`);
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

  const genderOptions = [
    {value: null, label: ''},
    {value: 1, label: 'Male'},
    {value: 2, label: 'Female'},
    {value: 3, label: 'Other'},
  ];

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderContent = () => {
    if (showAvatarUpload) {
      return <AvatarUpload onBack={() => setShowAvatarUpload(false)} />;
    }

    const renderContent = () => {
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
                    <strong>Username:</strong> {user.username}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mb={2}>
                  {editMode.nickname ? (
                    <>
                      <strong>Nickname:</strong>
                      <TextField
                        name='nickname'
                        value={user.nickname}
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
                        <strong>Nickname:</strong> {user.nickname}
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
                      <strong>Gender:</strong>
                      <select
                        name='gender'
                        value={user.gender}
                        onChange={handleChange}
                        style={{width: '100px'}}>
                        <option value='null1'></option>
                        <option value='1'>Male</option>
                        <option value='2'>Female</option>
                        <option value='3'>Other</option>
                      </select>
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
                        <strong>Gender:</strong>
                        {getUserGenderText(user.gender)}
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
                  {editMode.birthday ? (
                    <>
                      <strong>Birthday:</strong>
                      <TextField
                        name='birthday'
                        value={user.birthday}
                        onChange={handleChange}
                        size='small'
                      />
                      <IconButton
                        size='small'
                        onClick={() => handleSaveClick('birthday')}
                        sx={{ml: 1}}>
                        <SaveIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        onClick={() => handleCancelClick('birthday')}
                        sx={{ml: 1}}>
                        <CancelIcon fontSize='small' />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant='body1'>
                        <strong>Birthday:</strong> {user.birthday}
                      </Typography>
                      <IconButton
                        size='small'
                        onClick={() => handleEditClick('birthday')}
                        sx={{ml: 1}}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </>
                  )}
                </Box>
                <Box display='flex' alignItems='center' mb={2}>
                  {editMode.user_email ? (
                    <>
                      <strong>Email:</strong>
                      <TextField
                        name='user_email'
                        value={user.user_email}
                        onChange={handleChange}
                        size='small'
                      />
                      <IconButton
                        size='small'
                        onClick={() => handleSaveClick('user_email')}
                        sx={{ml: 1}}>
                        <SaveIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        onClick={() => handleCancelClick('user_email')}
                        sx={{ml: 1}}>
                        <CancelIcon fontSize='small' />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant='body1'>
                        <strong>Email:</strong> {user.user_email}
                      </Typography>
                      <IconButton
                        size='small'
                        onClick={() => handleEditClick('user_email')}
                        sx={{ml: 1}}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </>
                  )}
                </Box>
                <Box display='flex' alignItems='center' mb={2}>
                  {editMode.user_intro ? (
                    <>
                      <strong>Introduction:</strong>
                      <TextField
                        name='user_intro'
                        value={user.user_intro}
                        onChange={handleChange}
                        size='small'
                      />
                      <IconButton
                        size='small'
                        onClick={() => handleSaveClick('user_intro')}
                        sx={{ml: 1}}>
                        <SaveIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        onClick={() => handleCancelClick('user_intro')}
                        sx={{ml: 1}}>
                        <CancelIcon fontSize='small' />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant='body1'>
                        <strong>Introduction:</strong> {user.user_intro}
                      </Typography>
                      <IconButton
                        size='small'
                        onClick={() => handleEditClick('user_intro')}
                        sx={{ml: 1}}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
              {error && (
                <Typography variant='body2' color='error'>
                  {error}
                </Typography>
              )}
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
        case 'history':
          return (
            <Box>
              <Typography variant='h6'>history</Typography>
              <List>
                {user.event_history.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{borderBottom: '1px solid #ddd'}}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.time} | ${event.location} | ${event.organizer}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        case 'publish':
          return (
            <Box p={3}>
              <Typography variant='h6' gutterBottom>
                Event Management
              </Typography>
              <List>
                {user.publish_events.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{borderBottom: '1px solid #ddd'}}>
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
              <Typography variant='h6' gutterBottom>
                Followers
              </Typography>
              <List>
                {user.followers.map((follower) => (
                  <ListItem key={follower.id}>
                    {/* 根据followingId获取用户信息 */}
                    {/* 显示用户信息，包括头像、昵称、邮箱 */}
                    {isFollowing(follower, user.followers) ? (
                      <IconButton
                        edge='end'
                        onClick={() => handleUnfollow(follower.id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        edge='end'
                        onClick={() => handleFollow(follower.id)}>
                        <PersonIcon />
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
              <Typography variant='h6' gutterBottom>
                Following
              </Typography>
              <List>
                {user.following.map((following) => (
                  <ListItem key={following.id}>
                    <Avatar alt={following.nickname} src={following.avatar} />
                    <ListItemText
                      primary={following.nickname}
                      secondary={following.user_email}
                    />
                    <IconButton
                      edge='end'
                      onClick={() => handleUnfollow(following.id)}>
                      <DeleteIcon />
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
              src={user.avatar}
              sx={{width: 60, height: 60, marginRight: 2}}
              onClick={() => setShowAvatarUpload(true)}
            />
            <Box>
              <Typography variant='h6'>{userHard.nickname}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {getUserGroupText(userHard.user_group)}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                onClick={() => setSelectedItem('followers')}>
                followers: {user.followers}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                onClick={() => setSelectedItem('following')}>
                following: {user.following}
              </Typography>
            </Box>
          </Box>
          {/* 菜单项 */}
          <List component='nav'>
            <ListItem
              button
              onClick={() => setSelectedItem('profile')}
              sx={{
                backgroundColor:
                  selectedItem === 'profile' ? 'black' : 'inherit',
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
              onClick={() => setSelectedItem('history')}
              sx={{
                backgroundColor:
                  selectedItem === 'history' ? 'black' : 'inherit',
                color: selectedItem === 'history' ? 'white' : 'inherit',
                marginY: '10px',
              }}>
              <ListItemText primary='History' />
            </ListItem>
            <ListItem
              button
              onClick={() => setSelectedItem('publish')}
              sx={{
                backgroundColor:
                  selectedItem === 'publish' ? 'black' : 'inherit',
                color: selectedItem === 'publish' ? 'white' : 'inherit',
                marginY: '10px',
              }}>
              <ListItemText primary='Event Management' />
            </ListItem>
          </List>
        </Box>
        {/* 右侧内容区 */}
        <Box sx={{flexGrow: 1, paddingLeft: 3}}>{renderContent()}</Box>
      </Container>
    );
  };
}
export default HostProfile;
