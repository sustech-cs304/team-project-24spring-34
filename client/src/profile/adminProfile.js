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
import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import MKButton from '../components/MKButton';
import AvatarUpload from './AvatarUpload'; // 引入头像上传组件
import {
  Delete as DeleteIcon,
  PersonOutline as PersonIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material'; // 导入需要的图标组件

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
  const [selectedItem, setSelectedItem] = useState('profile');
  const [events, setEvents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 用于存储选中的用户
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [users, setUsers] = useState([]); // 定义用户数据状态

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

  const handleDelete = (id) => {
    // 模拟删除事件
    setEvents(events.filter((event) => event.id !== id));
  };

  //显示粉丝
  const handleUserClick = (user) => {
    setSelectedUser(user); // 将选中的用户信息存储在 selectedUser 状态中
  };

  // 关注用户
  const handleFollow = (user) => {
    setFollowing([...following, user]);
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

  const isFollowing = (follower, followingList) => {
    // 遍历关注列表
    for (const followedUser of followingList) {
      // 如果当前用户的 id 与被检查用户的 id 匹配，则返回 true
      if (followedUser.id === follower.id) {
        return true;
      }
    }
    // 如果未找到匹配项，则返回 false
    return false;
  };

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
                color: 'white',
                fontWeight: 'bold',
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
              活动管理
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
            <Typography variant='h6'>所有粉丝</Typography>
            <List>
              {followers.map((follower) => (
                <ListItem
                  key={follower.id}
                  button
                  onClick={() => handleUserClick(follower)}
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    alt={follower.name}
                    src={follower.avatar}
                    sx={{width: 40, height: 40, marginRight: 2}}
                  />
                  <ListItemText primary={follower.name} />
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
                        取消关注
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
                        关注
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
            <Typography variant='h6'>所有关注</Typography>
            <List>
              {following.map((followed) => (
                <ListItem
                  key={followed.id}
                  button
                  onClick={() => handleUserClick(followed)}
                  sx={{display: 'flex', alignItems: 'center'}}>
                  <Avatar
                    alt={followed.name}
                    src={followed.avatar}
                    sx={{width: 40, height: 40, marginRight: 2}}
                  />
                  <ListItemText primary={followed.name} />
                  <IconButton
                    edge='end'
                    aria-label='unfollow'
                    onClick={() => handleUnfollow(followed.id)}>
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
                      取消关注
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
            onClick={() => setShowAvatarUpload(true)} // 添加点击事件
          />
          <Box>
            <Typography variant='h6'>{user.username}</Typography>
            <Typography variant='body2' color='textSecondary'>
              {user.user_group}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {user.id}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              onClick={handleFollowersClick}>
              粉丝数: {followers.length}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              onClick={handleFollowingClick}>
              关注数: {following.length}
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
