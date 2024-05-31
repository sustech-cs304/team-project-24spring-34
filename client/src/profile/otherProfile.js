import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, IconButton, TextField, Typography} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

function OtherProfilePage() {
  const {userId} = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 这里可以替换成实际的 API 调用
    const fetchUser = async () => {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
          <Typography variant='body1'>
            <strong>用户名:</strong> {user.username}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='body1'>
            <strong>性别:</strong> {user.gender || '男'}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='body1'>
            <strong>年龄:</strong> {user.age || 23}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='body1'>
            <strong>电话:</strong> {user.phone || '131212344231'}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='body1'>
            <strong>邮箱:</strong> {user.email}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography variant='body1'>
            <strong>个人介绍:</strong>
          </Typography>
        </Box>
        <Box ml={4}>
          <Typography variant='body1'>{user.intro}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default OtherProfilePage;
