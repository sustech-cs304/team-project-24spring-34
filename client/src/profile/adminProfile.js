import {
  Container,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MKButton from '../components/MKButton';
function AdminProfile(user) {
  const [selectedItem, setSelectedItem] = useState('profile');
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
                  <strong>ID:</strong> 12123
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>用户名:</strong> 廖辰益
                </Typography>
                <IconButton size='small' sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>用户类别:</strong> 观众
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>性别:</strong> 男
                </Typography>
                <IconButton size='small' sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>年龄:</strong> 23
                </Typography>
                <IconButton size='small' sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>创建日期:</strong> {user.creationDate}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>电话:</strong> 131212344231
                </Typography>
                <IconButton size='small' sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>邮箱:</strong> 1211111@example.com
                </Typography>
                <IconButton size='small' sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>
                  <strong>个人介绍:</strong>
                </Typography>
                <IconButton size='small' sx={{ml: 1}}>
                  <EditIcon fontSize='small' />
                </IconButton>
              </Box>
              <Box ml={4}>
                <Typography variant='body1'>好</Typography>
              </Box>
            </Box>

            {/*<Typography variant="h6" gutterBottom>个人资料</Typography>*/}
            {/*<Typography variant="body1"><strong>ID:</strong> 12123</Typography>*/}
            {/*<Typography variant="body1"><strong>用户名:</strong> 廖辰益</Typography>*/}
            {/*<Typography variant="body1"><strong>用户类别:</strong> 观众</Typography>*/}
            {/*<Typography variant="body1"><strong>性别:</strong> 男</Typography>*/}
            {/*<Typography variant="body1"><strong>年龄:</strong> 23</Typography>*/}
            {/*<Typography variant="body1"><strong>创建日期:</strong> {user.creationDate}</Typography>*/}
            {/*<Typography variant="body1"><strong>电话:</strong> 131212344231</Typography>*/}
            {/*<Typography variant="body1"><strong>邮箱:</strong> 1211111@example.com</Typography>*/}
            {/*<Typography variant="body1"><strong>个人介绍:</strong> 好</Typography>*/}
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
      case 'manageUsers':
        return (
          <Box>
            <Typography variant='h6'>用户管理</Typography>
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
      case 'manageEvents':
        return (
          <Box>
            <Typography variant='h6'>活动管理</Typography>
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
            {/*  举办者*/}
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
            onClick={() => setSelectedItem('manageEvents')}
            sx={{
              backgroundColor:
                selectedItem === 'manageEvents' ? 'black' : 'inherit',
              color: selectedItem === 'manageEvents' ? 'white' : 'inherit',
              marginY: '10px',
            }}>
            <ListItemText primary='管理活动' />
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
            <ListItemText primary='管理用户' />
          </ListItem>
        </List>
      </Box>
      {/* 右侧内容区 */}
      <Box sx={{flexGrow: 1, paddingLeft: 3}}>{renderContent()}</Box>
    </Container>
  );
}

export default AdminProfile;
