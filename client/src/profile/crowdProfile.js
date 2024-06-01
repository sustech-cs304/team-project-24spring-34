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
import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MKButton from '../components/MKButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import {Delete as DeleteIcon} from '@mui/icons-material';
function CrowdProfile(user) {
  const [selectedItem, setSelectedItem] = useState('profile');
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({});
  const [events, setEvents] = useState({});

  setFormData({
    username: user.username,
    gender: user.gender || '男',
    age: user.age || 23,
    phone: user.phone || '131212344231',
    email: user.email,
    intro: user.intro || '',
  });

  const handleEditClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: true}));
  };

  const handleSaveClick = async (field) => {
    setEditMode((prev) => ({...prev, [field]: false}));
    try {
      await axios.put('/api/me', {[field]: formData[field]});
      // Update the user state to reflect the new data
      user[field] = formData[field];
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

  function handleDelete(id) {}

  const renderContent = () => {
    switch (selectedItem) {
      case 'profile':
        return (
          <Box>
            <Box>
              <Typography variant='h6' gutterBottom>
                个人资料
              </Typography>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>ID:</strong> {user.id}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                {editMode.username ? (
                  <>
                    <TextField
                      name='username'
                      value={formData.username}
                      onChange={handleChange}
                      size='small'
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleSaveClick('username')}
                      sx={{ml: 1}}>
                      <SaveIcon fontSize='small' />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => handleCancelClick('username')}
                      sx={{ml: 1}}>
                      <CancelIcon fontSize='small' />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      <strong>用户名:</strong> {user.username}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleEditClick('username')}
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
                      <strong>性别:</strong> {user.gender || '男'}
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
                      <strong>年龄:</strong> {user.age || 23}
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
                      <strong>电话:</strong> {user.phone || '131212344231'}
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
                      <strong>邮箱:</strong> {user.email}
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
                  <strong>个人介绍:</strong>
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
            <Typography variant='h6'>安全设置</Typography>
            <MKButton
              variant='contained'
              sx={{
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}>
              修改密码
            </MKButton>
          </Box>
        );
      case 'history':
        return (
          <Box>
            <Typography variant='h6'>历史记录</Typography>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
            <ListItem sx={{borderBottom: '1px solid #ddd'}}>
              <ListItemText
                primary='Title'
                secondary='Time | Location | Organizer'
              />
            </ListItem>
          </Box>
        );
      case 'reserve':
        return (
          <Box>
            <Typography variant='h6'>预约的活动</Typography>
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
            <Typography variant='h6'>{user.username}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {user.user_group}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {user.id}
            </Typography>
            {/*<Typography variant='h6'>哈哈</Typography>*/}
            {/*<Typography variant='body2' color='textSecondary'>*/}
            {/*  学生*/}
            {/*</Typography>*/}
            {/*<Typography variant='body2' color='textSecondary'>*/}
            {/*  123*/}
            {/*</Typography>*/}
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
            <ListItemText primary='个人资料' />
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
            <ListItemText primary='安全' />
          </ListItem>
          <ListItem
            button
            onClick={() => setSelectedItem('history')}
            sx={{
              backgroundColor: selectedItem === 'history' ? 'black' : 'inherit',
              color: selectedItem === 'history' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='历史记录' />
          </ListItem>
          <ListItem
            button
            onClick={() => setSelectedItem('reserve')}
            sx={{
              backgroundColor: selectedItem === 'reserve' ? 'black' : 'inherit',
              color: selectedItem === 'reserve' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='预约的活动' />
          </ListItem>
        </List>
      </Box>
      {/* 右侧内容区 */}
      <Box sx={{flexGrow: 1, paddingLeft: 3}}>{renderContent()}</Box>
    </Container>
  );
}

export default CrowdProfile;
