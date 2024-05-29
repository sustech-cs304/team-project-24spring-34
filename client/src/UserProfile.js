import React, {useState} from 'react';
import {Box, Typography, IconButton, TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const UserProfile = ({user}) => {
  const [editMode, setEditMode] = useState({});
  const [formData, setFormData] = useState({
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

  const handleSaveClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: false}));
    // 模拟API调用
    user[field] = formData[field];
  };

  const handleCancelClick = (field) => {
    setEditMode((prev) => ({...prev, [field]: false}));
    setFormData((prev) => ({...prev, [field]: user[field]}));
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  return (
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
  );
};

export default UserProfile;
