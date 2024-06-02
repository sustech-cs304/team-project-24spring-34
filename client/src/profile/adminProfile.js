// import {
//   Container,
//   Box,
//   Typography,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   TextField,
// } from '@mui/material';
// import React, {useEffect, useState} from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import MKButton from '../components/MKButton';
// import AvatarUpload from './AvatarUpload'; // 引入头像上传组件
// import {
//   Delete as DeleteIcon,
//   PersonOutline as PersonIcon,
//   DeleteOutline as DeleteOutlineIcon,
// } from '@mui/icons-material';
// import {Link} from 'react-router-dom';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import axios from 'axios';
//
// const mockEvents = [
//   {
//     id: 1,
//     title: 'Event 1',
//     time: '2024-06-01 10:00',
//     location: 'Location 1',
//     organizer: 'Organizer 1',
//   },
//   {
//     id: 2,
//     title: 'Event 2',
//     time: '2024-06-02 11:00',
//     location: 'Location 2',
//     organizer: 'Organizer 2',
//   },
//   {
//     id: 3,
//     title: 'Event 3',
//     time: '2024-06-03 12:00',
//     location: 'Location 3',
//     organizer: 'Organizer 3',
//   },
//   // 添加更多模拟事件数据
// ];
//
// const mockFollowers = [
//   {id: 1, name: '粉丝1', avatar: '/path-to-avatar1.jpg'},
//   {id: 2, name: '粉丝2', avatar: '/path-to-avatar2.jpg'},
//   {id: 3, name: '粉丝3', avatar: '/path-to-avatar3.jpg'},
//   // 更多粉丝数据
// ];
//
// const mockFollowing = [
//   {id: 1, name: '关注1', avatar: '/path-to-avatar4.jpg'},
//   {id: 2, name: '关注2', avatar: '/path-to-avatar5.jpg'},
//   {id: 3, name: '关注3', avatar: '/path-to-avatar6.jpg'},
//   // 更多关注数据
// ];
//
// const mockUsers = [
//   {id: 1, name: '关注1', avatar: '/path-to-avatar4.jpg'},
//   {id: 2, name: '关注2', avatar: '/path-to-avatar5.jpg'},
//   {id: 3, name: '关注3', avatar: '/path-to-avatar6.jpg'},
//   // 更多关注数据
// ];
//
// function AdminProfile({user}) {
//   const [showAvatarUpload, setShowAvatarUpload] = useState(false);
//   const [users, setUsers] = useState([]); // 定义用户数据状态
//   const [selectedItem, setSelectedItem] = useState('profile');
//   const [editMode, setEditMode] = useState({});
//   const [formData, setUser] = useState({});
//   const [followers, setFollowers] = useState([]);
//   const [following, setFollowing] = useState([]);
//   const [events, setEvents] = useState({});
//   const [error, setError] = useState(null);
//
//   setUser({
//     username: user.nickname,
//     gender: user.gender,
//     age: user.age,
//     phone: user.phone,
//     email: user.email,
//     intro: user.intro,
//   });
//
//   const handleEditClick = (field) => {
//     setEditMode((prev) => ({...prev, [field]: true}));
//   };
//
//   const handleSaveClick = async (field) => {
//     setEditMode((prev) => ({...prev, [field]: false}));
//     try {
//       // Email format validation
//       if (field === 'email') {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//           setError('Invalid email format');
//           setEditMode((prev) => ({...prev, [field]: true}));
//           return;
//         }
//       }
//       await axios.put('/api/me', {[field]: formData[field]});
//       // Update the user state to reflect the new data
//       // user[field] = formData[field];
//       // setUser({
//       //   username: user.nickname,
//       //   gender: user.gender,
//       //   age: user.age,
//       //   phone: user.phone,
//       //   email: user.email,
//       //   intro: user.intro,
//       // });
//     } catch (error) {
//       console.error('Error saving user data:', error);
//     }
//   };
//
//   const handleCancelClick = (field) => {
//     setEditMode((prev) => ({...prev, [field]: false}));
//     setUser((prev) => ({...prev, [field]: user[field]}));
//   };
//
//   const handleChange = (e) => {
//     const {name, value} = e.target;
//     setUser((prev) => ({...prev, [name]: value}));
//   };
//
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/events/${id}`);
//     } catch (error) {
//       setError(`Failed to delete event with id ${id}:`);
//     }
//   };
//
//   // 关注用户
//   const handleFollow = (user) => {
//     setFollowing([...following, user]);
//   };
//
//   // 取消关注用户
//   const handleUnfollow = (id) => {
//     setFollowing(following.filter((user) => user.id !== id));
//   };
//
//   const isFollowing = (follower, followingList) => {
//     // 遍历关注列表
//     for (const followingUser of followingList) {
//       // 如果当前用户的 id 与被检查用户的 id 匹配，则返回 true
//       if (followingUser.id === follower.id) {
//         return true;
//       }
//     }
//     // 如果未找到匹配项，则返回 false
//     return false;
//   };
//
//   // 定义更改用户类别函数
//   const handleChangeUserType = (userId) => {
//     // 执行更改用户类别的逻辑操作
//   };
//
//   // 定义删除用户函数
//   const handleDeleteUser = (id) => {
//     // 执行删除用户的逻辑操作
//     setEvents(events.filter((user) => user.id !== id));
//   };
//
//   useEffect(() => {
//     // 使用模拟数据
//     setEvents(mockEvents);
//     setFollowers(mockFollowers);
//     setFollowing(mockFollowing);
//     setUsers(mockUsers);
//   }, []);
//
//   const renderContent = () => {
//     if (showAvatarUpload) {
//       return <AvatarUpload onBack={() => setShowAvatarUpload(false)} />;
//     }
//
//     switch (selectedItem) {
//       case 'profile':
//         return (
//           <Box>
//             <Box>
//               <Typography variant='h6' gutterBottom>
//                 Personal Profile
//               </Typography>
//               <Box display='flex' alignItems='center' mb={2}>
//                 <Typography variant='body1'>
//                   <strong>ID:</strong> {user.id}
//                 </Typography>
//               </Box>
//               <Box display='flex' alignItems='center' mb={2}>
//                 {editMode.nickname ? (
//                   <>
//                     <TextField
//                       name='nickname'
//                       value={formData.nickname}
//                       onChange={handleChange}
//                       size='small'
//                     />
//                     <IconButton
//                       size='small'
//                       onClick={() => handleSaveClick('nickname')}
//                       sx={{ml: 1}}>
//                       <SaveIcon fontSize='small' />
//                     </IconButton>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleCancelClick('nickname')}
//                       sx={{ml: 1}}>
//                       <CancelIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant='body1'>
//                       <strong>Username:</strong> {user.nickname}
//                     </Typography>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleEditClick('nickname')}
//                       sx={{ml: 1}}>
//                       <EditIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>
//               <Box display='flex' alignItems='center' mb={2}>
//                 {editMode.gender ? (
//                   <>
//                     <TextField
//                       name='gender'
//                       value={formData.gender}
//                       onChange={handleChange}
//                       size='small'
//                     />
//                     <IconButton
//                       size='small'
//                       onClick={() => handleSaveClick('gender')}
//                       sx={{ml: 1}}>
//                       <SaveIcon fontSize='small' />
//                     </IconButton>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleCancelClick('gender')}
//                       sx={{ml: 1}}>
//                       <CancelIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant='body1'>
//                       <strong>Gender:</strong> {user.gender}
//                     </Typography>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleEditClick('gender')}
//                       sx={{ml: 1}}>
//                       <EditIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>
//               <Box display='flex' alignItems='center' mb={2}>
//                 {editMode.age ? (
//                   <>
//                     <TextField
//                       name='age'
//                       value={formData.age}
//                       onChange={handleChange}
//                       size='small'
//                     />
//                     <IconButton
//                       size='small'
//                       onClick={() => handleSaveClick('age')}
//                       sx={{ml: 1}}>
//                       <SaveIcon fontSize='small' />
//                     </IconButton>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleCancelClick('age')}
//                       sx={{ml: 1}}>
//                       <CancelIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant='body1'>
//                       <strong>Age:</strong> {user.age}
//                     </Typography>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleEditClick('age')}
//                       sx={{ml: 1}}>
//                       <EditIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>
//               <Box display='flex' alignItems='center' mb={2}>
//                 {editMode.phone ? (
//                   <>
//                     <TextField
//                       name='phone'
//                       value={formData.phone}
//                       onChange={handleChange}
//                       size='small'
//                     />
//                     <IconButton
//                       size='small'
//                       onClick={() => handleSaveClick('phone')}
//                       sx={{ml: 1}}>
//                       <SaveIcon fontSize='small' />
//                     </IconButton>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleCancelClick('phone')}
//                       sx={{ml: 1}}>
//                       <CancelIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant='body1'>
//                       <strong>Phone:</strong> {user.phone}
//                     </Typography>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleEditClick('phone')}
//                       sx={{ml: 1}}>
//                       <EditIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>
//               <Box display='flex' alignItems='center' mb={2}>
//                 {editMode.email ? (
//                   <>
//                     <TextField
//                       name='email'
//                       value={formData.email}
//                       onChange={handleChange}
//                       size='small'
//                     />
//                     <IconButton
//                       size='small'
//                       onClick={() => handleSaveClick('email')}
//                       sx={{ml: 1}}>
//                       <SaveIcon fontSize='small' />
//                     </IconButton>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleCancelClick('email')}
//                       sx={{ml: 1}}>
//                       <CancelIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant='body1'>
//                       <strong>Email:</strong> {user.email}
//                     </Typography>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleEditClick('email')}
//                       sx={{ml: 1}}>
//                       <EditIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 )}
//               </Box>
//               <Box display='flex' alignItems='center' mb={2}>
//                 <Typography variant='body1'>
//                   <strong>Introduction:</strong>
//                 </Typography>
//                 <IconButton
//                   size='small'
//                   onClick={() => handleEditClick('intro')}
//                   sx={{ml: 1}}>
//                   <EditIcon fontSize='small' />
//                 </IconButton>
//               </Box>
//               <Box ml={4}>
//                 {editMode.intro ? (
//                   <>
//                     <TextField
//                       name='intro'
//                       value={formData.intro}
//                       onChange={handleChange}
//                       multiline
//                       size='small'
//                       rows={4}
//                     />
//                     <IconButton
//                       size='small'
//                       onClick={() => handleSaveClick('intro')}
//                       sx={{ml: 1}}>
//                       <SaveIcon fontSize='small' />
//                     </IconButton>
//                     <IconButton
//                       size='small'
//                       onClick={() => handleCancelClick('intro')}
//                       sx={{ml: 1}}>
//                       <CancelIcon fontSize='small' />
//                     </IconButton>
//                   </>
//                 ) : (
//                   <Typography variant='body1'>{user.intro}</Typography>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         );
//       case 'security':
//         return (
//           <Box>
//             <Typography variant='h6'>Security</Typography>
//             <MKButton
//               component={Link}
//               to='/changePassword'
//               variant='contained'
//               sx={{
//                 backgroundColor: 'red',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                   backgroundColor: '#d32f2f',
//                 },
//               }}>
//               Password Modification
//             </MKButton>
//           </Box>
//         );
//       case 'manageUsers':
//         return (
//           <Box>
//             <Typography variant='h6'>User Management</Typography>
//             <List>
//               {mockUsers.map((user) => (
//                 <ListItem key={user.id} sx={{borderBottom: '1px solid #ddd'}}>
//                   <ListItemText
//                     primary={user.username}
//                     secondary={user.user_group}
//                   />
//                   <IconButton
//                     edge='end'
//                     aria-label='change-user-type'
//                     onClick={() => handleChangeUserType(user.id)}>
//                     <PersonIcon /> {/* 更改用户类别图标按钮 */}
//                   </IconButton>
//                   <IconButton
//                     edge='end'
//                     aria-label='delete-user'
//                     onClick={() => handleDeleteUser(user.id)}>
//                     <DeleteIcon /> {/* 删除用户图标按钮 */}
//                   </IconButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         );
//       case 'manageEvents':
//         return (
//           <Box p={3}>
//             <Typography variant='h6' gutterBottom>
//               Event Management
//             </Typography>
//             <List>
//               {events.map((event) => (
//                 <ListItem key={event.id} sx={{borderBottom: '1px solid #ddd'}}>
//                   <ListItemText
//                     primary={event.title}
//                     secondary={`${event.time} | ${event.location} | ${event.organizer}`}
//                   />
//                   <IconButton
//                     edge='end'
//                     aria-label='delete'
//                     onClick={() => handleDelete(event.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         );
//       case 'followers':
//         return (
//           <Box>
//             <Typography variant='h6'>All followers</Typography>
//             <List>
//               {followers.map((follower) => (
//                 <ListItem
//                   key={follower.id}
//                   sx={{display: 'flex', alignItems: 'center'}}>
//                   <Avatar
//                     alt={follower.nickname}
//                     src={follower.avatar}
//                     sx={{width: 40, height: 40, marginRight: 2}}
//                   />
//                   <ListItemText primary={follower.nickname} />
//                   {isFollowing(follower) ? (
//                     <IconButton
//                       edge='end'
//                       aria-label='unfollow'
//                       onClick={() => handleUnfollow(following.id)}>
//                       <MKButton
//                         variant='contained'
//                         sx={{
//                           backgroundColor: 'red',
//                           color: 'white',
//                           fontWeight: 'bold',
//                           '&:hover': {
//                             backgroundColor: '#d32f2f',
//                           },
//                         }}>
//                         unfollow
//                       </MKButton>
//                     </IconButton>
//                   ) : (
//                     <IconButton
//                       edge='end'
//                       aria-label='follow'
//                       onClick={() => handleFollow(follower)}>
//                       <MKButton
//                         variant='contained'
//                         sx={{
//                           backgroundColor: 'white',
//                           color: 'white',
//                           fontWeight: 'bold',
//                           '&:hover': {
//                             backgroundColor: '#F5F5F5',
//                           },
//                         }}>
//                         follow
//                       </MKButton>
//                     </IconButton>
//                   )}
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         );
//       case 'following':
//         return (
//           <Box>
//             <Typography variant='h6'>All following</Typography>
//             <List>
//               {following.map((following) => (
//                 <ListItem
//                   key={following.id}
//                   sx={{display: 'flex', alignItems: 'center'}}>
//                   <Avatar
//                     alt={following.name}
//                     src={following.avatar}
//                     sx={{width: 40, height: 40, marginRight: 2}}
//                   />
//                   <ListItemText primary={following.nickname} />
//                   <IconButton
//                     edge='end'
//                     aria-label='unfollow'
//                     onClick={() => handleUnfollow(following.id)}>
//                     <MKButton
//                       variant='contained'
//                       sx={{
//                         backgroundColor: 'red',
//                         color: 'white',
//                         fontWeight: 'bold',
//                         '&:hover': {
//                           backgroundColor: '#d32f2f',
//                         },
//                       }}>
//                       unfollow
//                     </MKButton>
//                   </IconButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };
//
//   return (
//     <Container sx={{display: 'flex', height: '100vh', paddingTop: 2}}>
//       {/* 左侧边栏 */}
//       <Box
//         sx={{
//           width: 250,
//           borderRight: '1px solid #ddd',
//           paddingRight: 2,
//         }}>
//         {/* 头像和名字 */}
//         <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
//           <Avatar
//             alt='User Avatar'
//             src='/path-to-avatar.jpg' // 替换成实际的头像路径
//             sx={{width: 60, height: 60, marginRight: 2}}
//           />
//           <Box>
//             <Typography variant='h6'>{user.nickname}</Typography>
//             <Typography variant='body2' color='textSecondary'>
//               {user.user_group}
//             </Typography>
//             <Typography variant='body2' color='textSecondary'>
//               {user.id}
//             </Typography>
//             <Typography
//               variant='body2'
//               color='textSecondary'
//               onClick={() => setSelectedItem('followers')}>
//               followers: {followers.length}
//             </Typography>
//             <Typography
//               variant='body2'
//               color='textSecondary'
//               onClick={() => setSelectedItem('following')}>
//               following: {following.length}
//             </Typography>
//           </Box>
//         </Box>
//         {/* 菜单项 */}
//         <List component='nav'>
//           <ListItem
//             button
//             onClick={() => setSelectedItem('profile')}
//             sx={{
//               backgroundColor: selectedItem === 'profile' ? 'black' : 'inherit',
//               color: selectedItem === 'profile' ? 'white' : 'inherit',
//               marginY: '10px',
//             }}>
//             <ListItemText primary='Personal Profile' />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => setSelectedItem('security')}
//             sx={{
//               backgroundColor:
//                 selectedItem === 'security' ? 'black' : 'inherit',
//               color: selectedItem === 'security' ? 'white' : 'inherit',
//               marginY: '10px',
//             }}>
//             <ListItemText primary='Security' />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => setSelectedItem('manageEvents')}
//             sx={{
//               backgroundColor:
//                 selectedItem === 'manageEvents' ? 'black' : 'inherit',
//               color: selectedItem === 'manageEvents' ? 'white' : 'inherit',
//               marginY: '10px',
//             }}>
//             <ListItemText primary='Event Management' />
//           </ListItem>
//           <ListItem
//             button
//             onClick={() => setSelectedItem('manageUsers')}
//             sx={{
//               backgroundColor:
//                 selectedItem === 'manageUsers' ? 'black' : 'inherit',
//               color: selectedItem === 'manageUsers' ? 'white' : 'inherit',
//               marginY: '10px',
//             }}>
//             <ListItemText primary='User Management' />
//           </ListItem>
//         </List>
//       </Box>
//       {/* 右侧内容区 */}
//       <Box sx={{flexGrow: 1, paddingLeft: 3}}>{renderContent()}</Box>
//     </Container>
//   );
// }
//
// export default AdminProfile;
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
  MenuItem,
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
import Popover from '@mui/material/Popover';

function AdminProfile() {
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [selectedItem, setSelectedItem] = useState('profile');
  const [editMode, setEditMode] = useState({});
  const [user, setUser] = useState({});
  const [otherUser, setOtherUser] = useState({});
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
  const handleChangeUserType = async (username, user_group) => {
    try {
      const otherUserResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${username}`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
          },
        },
      );

      const updatedOtherUser = {...otherUserResponse.data, user_group};
      setOtherUser(updatedOtherUser);

      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${username}`,
        updatedOtherUser,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE3MzMzNDkzLCJleHAiOjE3MTc0MTk4OTN9.gdlRLzY-ameUBM9TFptGYx_pFCbBzgmbF5BOt6YScUk',
          },
        },
      );
      fetchDataAll();
    } catch (error) {
      setError(`Error`);
    }
  };

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
      case 'manageUsers':
        return (
          <Box p={3}>
            <Typography variant='h6' gutterBottom>
              User Management
            </Typography>
            <List>
              {allUsers.users.map(
                (userTemp) =>
                  userTemp.user_group !== 3 && (
                    <ListItem
                      key={userTemp.id}
                      sx={{borderBottom: '1px solid #ddd'}}>
                      <ListItemText
                        primary={userTemp.nickname}
                        secondary={getUserGroupText(userTemp.user_group)}
                      />
                      <IconButton
                        edge='end'
                        aria-label='change-user-type'
                        onClick={handleOpenMenu}>
                        <PersonIcon />
                      </IconButton>
                      <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}>
                        <MenuItem
                          onClick={() =>
                            handleChangeUserType(userTemp.username, 1)
                          }>
                          Audience
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleChangeUserType(userTemp.username, 2)
                          }>
                          Organizer
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleChangeUserType(userTemp.username, 3)
                          }>
                          Admin
                        </MenuItem>
                      </Popover>
                      <IconButton
                        edge='end'
                        aria-label='delete-user'
                        onClick={() => handleDeleteUser(userTemp.username)}>
                        <DeleteIcon /> {/* 删除用户图标按钮 */}
                      </IconButton>
                    </ListItem>
                  ),
              )}
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
              {allEvents.events.map((event) => (
                <ListItem key={event.id} sx={{borderBottom: '1px solid #ddd'}}>
                  <ListItemText
                    primary={event.title}
                    secondary={`${event.poster} | ${event.location}`}
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
            src='/path-to-avatar.jpg' // 替换成实际的头像路径
            sx={{width: 60, height: 60, marginRight: 2}}
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

// <Container>
//   <Box display="flex" alignItems="center" mb={2}>
//     <Avatar alt={user.nickname} src={user.avatar} />
//     <Typography variant="h6" ml={2}>
//       {user.nickname}
//     </Typography>
//   </Box>
//   <Box display="flex" justifyContent="space-between" mb={2}>
//     <MKButton onClick={() => setSelectedItem('profile')} color={selectedItem === 'profile' ? 'info' : 'default'}>
//       Profile
//     </MKButton>
//     <MKButton onClick={() => setSelectedItem('followers')} color={selectedItem === 'followers' ? 'info' : 'default'}>
//       Followers
//     </MKButton>
//     <MKButton onClick={() => setSelectedItem('following')} color={selectedItem === 'following' ? 'info' : 'default'}>
//       Following
//     </MKButton>
//     <MKButton onClick={() => setShowAvatarUpload(true)}>
//       Upload Avatar
//     </MKButton>
//   </Box>
//   {renderContent()}
// </Container>
