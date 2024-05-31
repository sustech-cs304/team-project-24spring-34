// src/pages/SearchPage.js
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import theme from '../assets/theme';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {IoIosSearch} from 'react-icons/io';
import axios from 'axios';

// const users = [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' }
// ];
//
// const events = [
//   { id: 1, title: 'Event 1' },
//   { id: 2, title: 'Event 2' },
//   { id: 3, title: 'Event 3' },
//
// ];

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取用户和事件数据的函数
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get('/api/users/');
        const eventsResponse = await axios.get('/api/events/');

        setUsers(usersResponse.data);
        setEvents(eventsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayResults = searchTerm !== '';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={3}>
        <Typography variant='h4' gutterBottom>
          <IoIosSearch />
          搜索
        </Typography>
        <TextField
          label='Search'
          variant='outlined'
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin='normal'
        />
        <InputLabel>Filter</InputLabel>
        <FormControl fullWidth margin='normal'>
          <Select
            value={filter}
            onChange={handleFilterChange}
            sx={{height: 35}}>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='users'>User</MenuItem>
            <MenuItem value='events'>Event</MenuItem>
          </Select>
        </FormControl>
        {displayResults && (
          <Grid container spacing={3}>
            {filter !== 'events' &&
              filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>{user.nickname}</Typography>
                      <Typography variant='body2'>
                        用户 ID: {user.id}
                      </Typography>
                      <ListItem button component={Link} to={`/user/${user.id}`}>
                        查看详情
                      </ListItem>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            {filter !== 'users' &&
              filteredEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>{event.title}</Typography>
                      <Typography variant='body2'>
                        事件 ID: {event.id}
                      </Typography>
                      <ListItem
                        button
                        component={Link}
                        to={`/event/${event.id}`}>
                        查看详情
                      </ListItem>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default SearchPage;
