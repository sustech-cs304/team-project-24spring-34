import React from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const HistoryRecord = ({title, time, location, organizer}) => (
  <ListItem sx={{borderBottom: '1px solid #ddd'}}>
    <ListItemText
      primary={title}
      secondary={`${time} | ${location} | ${organizer}`}
    />
  </ListItem>
);

const HistoryPage = ({history}) => (
  <Container sx={{display: 'flex', height: '100vh', paddingTop: 2}}>
    {/* 左侧边栏 */}
    {/* 这里可以添加侧边栏，但是历史记录页面没有侧边栏，因此省略 */}

    {/* 右侧内容区 */}
    <Box sx={{flexGrow: 1, paddingLeft: 3}}>
      <Typography variant='h6'>历史记录</Typography>
      <List>
        {history.map((record, index) => (
          <HistoryRecord
            key={index}
            title={record.title}
            time={record.time}
            location={record.location}
            organizer={record.organizer}
          />
        ))}
      </List>
    </Box>
  </Container>
);

export default HistoryPage;
