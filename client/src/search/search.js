// src/pages/SearchPage.js
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  ListItem,
  Card,
  CardContent,
  Grid,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import theme from '../assets/theme';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {IoIosSearch} from 'react-icons/io';
import axios from 'axios';
import DefaultNavbar from '../mainpage/mainpageComponents/DefaultNavbar';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterAll, setFilterAll] = useState(false);
  const [filterUsers, setFilterUsers] = useState(false);
  const [filterEvents, setFilterEvents] = useState(false);

  const [searchByAll, setSearchByAll] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState(false);
  const [searchByTag, setSearchByTag] = useState(false);
  const [searchByDescription, setSearchByDescription] = useState(false);
  const [searchByOrganizer, setSearchByOrganizer] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get('/users.json');
        const eventsResponse = await axios.get('/events.json');

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

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      const newValue = !filterAll;
      setFilterAll(newValue);
      setFilterUsers(newValue);
      setFilterEvents(newValue);
    } else if (filter === 'users') {
      const newValue = !filterUsers;
      setFilterUsers(newValue);
      setFilterAll(newValue && filterEvents); // Update "All" based on the new state of "users" and current state of "events"
    } else if (filter === 'events') {
      const newValue = !filterEvents;
      setFilterEvents(newValue);
      setFilterAll(newValue && filterUsers); // Update "All" based on the new state of "events" and current state of "users"
    }
  };

  const handleSearchByChange = (type) => {
    if (type === 'all') {
      const newValue = !searchByAll;
      setSearchByAll(newValue);
      setSearchByTitle(newValue);
      setSearchByTag(newValue);
      setSearchByDescription(newValue);
      setSearchByOrganizer(newValue);
    } else if (type === 'title') {
      const newValue = !searchByTitle;
      setSearchByTitle(newValue);
      setSearchByAll(
        newValue && searchByTag && searchByDescription && searchByOrganizer,
      );
    } else if (type === 'tag') {
      const newValue = !searchByTag;
      setSearchByTag(newValue);
      setSearchByAll(
        newValue && searchByTitle && searchByDescription && searchByOrganizer,
      );
    } else if (type === 'description') {
      const newValue = !searchByDescription;
      setSearchByDescription(newValue);
      setSearchByAll(
        newValue && searchByTitle && searchByTag && searchByOrganizer,
      );
    } else if (type === 'organizer') {
      const newValue = !searchByOrganizer;
      setSearchByOrganizer(newValue);
      setSearchByAll(
        newValue && searchByTitle && searchByTag && searchByDescription,
      );
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredEvents = events.filter((event) => {
    const term = searchTerm.toLowerCase();
    return (
      (searchByTitle && event.title.toLowerCase().includes(term)) ||
      (searchByTag && event.tag.toLowerCase().includes(term)) ||
      (searchByDescription && event.description.toLowerCase().includes(term)) ||
      (searchByOrganizer && event.organizer.toLowerCase().includes(term))
    );
  });

  const displayResults = searchTerm !== '';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar sticky />
      <Box sx={{width: 100, height: 100}} />
      <Box p={3}>
        <Typography variant='h4' gutterBottom>
          <IoIosSearch />
          Search
        </Typography>
        <TextField
          label='Search'
          variant='outlined'
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin='normal'
        />
        <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={filterAll}
                onChange={() => handleFilterChange('all')}
              />
            }
            label='All'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterUsers}
                onChange={() => handleFilterChange('users')}
              />
            }
            label='User'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filterEvents}
                onChange={() => handleFilterChange('events')}
              />
            }
            label='Event'
          />
        </Box>
        {filterEvents && !filterAll && (
          <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchByAll}
                  onChange={() => handleSearchByChange('all')}
                />
              }
              label='All'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchByTitle}
                  onChange={() => handleSearchByChange('title')}
                />
              }
              label='Title'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchByTag}
                  onChange={() => handleSearchByChange('tag')}
                />
              }
              label='Tag'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchByDescription}
                  onChange={() => handleSearchByChange('description')}
                />
              }
              label='Description'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={searchByOrganizer}
                  onChange={() => handleSearchByChange('organizer')}
                />
              }
              label='Organizer'
            />
          </Box>
        )}
        {displayResults && (
          <Grid container spacing={3}>
            {filterUsers &&
              filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>{user.nickname}</Typography>
                      <Typography variant='body2'>ID: {user.id}</Typography>
                      <ListItem button component={Link} to={`/user/${user.id}`}>
                        Detail
                      </ListItem>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            {filterEvents &&
              filteredEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card>
                    <CardContent>
                      <Typography variant='h6'>{event.title}</Typography>
                      <Typography variant='body2'>ID: {event.id}</Typography>
                      <Typography variant='body2'>Tag: {event.tag}</Typography>
                      <Typography variant='body2'>
                        Description: {event.description}
                      </Typography>
                      <Typography variant='body2'>
                        Organizer: {event.organizer}
                      </Typography>
                      <ListItem
                        button
                        component={Link}
                        to={`/event/${event.id}`}>
                        Detail
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
