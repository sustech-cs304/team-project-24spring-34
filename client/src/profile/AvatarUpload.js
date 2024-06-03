// AvatarUpload.js
import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, Avatar} from '@mui/material';
import {Save as SaveIcon, Cancel as CancelIcon} from '@mui/icons-material';
import axios from 'axios';
import MKButton from '../components/MKButton';

function AvatarUpload({onClose, onUploadSuccess}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setPreview(user.avatar);
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();

    // 将 user 对象的属性添加到 formData 中
    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        formData.append(key, key === 'avatar' ? selectedFile : user[key]);
      }
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/me`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzcxNDYxLCJleHAiOjE3MTc0NTc4NjF9.pUArgG8Go2-ip7j9fJEQcsaf291AWzCKGdu6J_ULSmw`,
        },
      });
      onUploadSuccess(preview);
      fetchData();
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      onClose();
    }
  };

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Avatar alt='User Avatar' src={preview} sx={{width: 100, height: 100}} />
      <input
        accept='image/*'
        style={{display: 'none'}}
        id='avatar-upload'
        type='file'
        onChange={handleFileChange}
      />
      <label htmlFor='avatar-upload'>
        <MKButton variant='contained' component='span'>
          Choose File
        </MKButton>
      </label>
      <Box mt={2}>
        <IconButton color='primary' onClick={handleUpload}>
          <SaveIcon />
        </IconButton>
        <IconButton color='secondary' onClick={onClose}>
          <CancelIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default AvatarUpload;
