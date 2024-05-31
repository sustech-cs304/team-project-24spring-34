import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import RatingMini from './RatingMini';
import './comment.css';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  Button,
  TextField,
  Divider,
  Pagination,
} from '@mui/material';

const SingleComment = ({comment}) => {
  const {
    id,
    userId,
    userName,
    avatar,
    rating,
    content,
    timestamp,
    likes,
    dislikes,
  } = comment;

  const navigate = useNavigate();

  const handleClickOnUserInfo = () => {
    navigate('/profilePage');
  };

  return (
    <Box className='single-comment' mb={2}>
      <Box
        className='comment-header'
        display='flex'
        justifyContent='space-between'
        alignItems='center'>
        <Box
          className='user-info'
          onClick={handleClickOnUserInfo}
          display='flex'
          alignItems='center'
          sx={{cursor: 'pointer'}}>
          <Avatar src={avatar} alt={userName}>
            {!avatar && userName[0]}
          </Avatar>
          <Typography variant='subtitle1' ml={2}>
            {userName}
          </Typography>
        </Box>
        <RatingMini rating={rating} />
      </Box>
      <Typography variant='body1' mt={1}>
        {content}
      </Typography>
      <Box
        className='comment-footer'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mt={1}>
        <Typography variant='caption'>
          {new Date(timestamp).toLocaleString()}
        </Typography>
        <Box>
          <Typography variant='caption' mr={2}>
            {likes} likes
          </Typography>
          <Typography variant='caption'>{dislikes} dislikes</Typography>
        </Box>
      </Box>
      <Divider sx={{my: 2}} />
    </Box>
  );
};

const CommentList = ({comments}) => {
  const commentPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentComments, setCurrentComments] = useState([]);
  const totalPage = Math.ceil(comments.length / commentPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const sortedComments = [...comments].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
    );
    const start = (currentPage - 1) * commentPerPage;
    const end = start + commentPerPage;
    setCurrentComments(sortedComments.slice(start, end));
  }, [comments, currentPage]);

  return (
    <>
      <List className='comment-list'>
        {currentComments.map((comment) => (
          <ListItem key={comment.id}>
            <SingleComment comment={comment} />
          </ListItem>
        ))}
      </List>
      <Box display='flex' justifyContent='center' mt={2}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

const CommentForm = ({onSubmit}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 0,
      userName: 'user',
      avatar: null,
      rating: rating,
      content: content,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };
    onSubmit(newComment);
  };

  return (
    <Box
      component='form'
      className='comment-form'
      onSubmit={handleSubmit}
      mt={2}>
      <TextField
        type='number'
        id='rating'
        name='rating'
        label='Rating'
        inputProps={{min: 0, max: 5}}
        value={rating}
        onChange={handleRatingChange}
        fullWidth
        margin='normal'
      />
      <TextField
        id='content'
        name='content'
        label='Content'
        value={content}
        onChange={handleContentChange}
        fullWidth
        margin='normal'
        multiline
        rows={4}
      />
      <Button type='submit' variant='contained' color='primary' fullWidth>
        Submit
      </Button>
    </Box>
  );
};

// 主组件
const CommentsSection = ({active_id}) => {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const titletext = {zh: '评论', en: 'Comments'};

  useEffect(() => {
    const fetchComments = async () => {
      // 用于测试的假数据
      const data = [
        {
          id: 1,
          userId: 1,
          userName: 'user1',
          avatar: null,
          rating: 4,
          content: 'comment1',
          timestamp: '2021-08-01',
          likes: 10,
          dislikes: 2,
        },
        {
          id: 2,
          userId: 2,
          userName: 'user2',
          avatar: null,
          rating: 3,
          content: 'comment2',
          timestamp: '2021-08-02',
          likes: 5,
          dislikes: 1,
        },
        {
          id: 3,
          userId: 3,
          userName: 'user3',
          avatar: null,
          rating: 4.5,
          content: 'comment3',
          timestamp: '2021-08-03',
          likes: 20,
          dislikes: 0,
        },
        {
          id: 4,
          userId: 4,
          userName: 'user4',
          avatar: null,
          rating: 5,
          content: 'comment4',
          timestamp: '2021-08-04',
          likes: 30,
          dislikes: 0,
        },
        {
          id: 5,
          userId: 5,
          userName: 'user5',
          avatar: null,
          rating: 2,
          content: 'comment5',
          timestamp: '2021-08-05',
          likes: 1,
          dislikes: 10,
        },
        {
          id: 6,
          userId: 6,
          userName: 'user6',
          avatar: null,
          rating: 3.5,
          content: 'comment6',
          timestamp: '2021-08-06',
          likes: 4,
          dislikes: 3,
        },
        {
          id: 7,
          userId: 7,
          userName: 'user7',
          avatar: null,
          rating: 4,
          content: 'comment7',
          timestamp: '2021-08-07',
          likes: 15,
          dislikes: 5,
        },
        {
          id: 8,
          userId: 8,
          userName: 'user8',
          avatar: null,
          rating: 1,
          content: 'comment8',
          timestamp: '2021-08-08',
          likes: 0,
          dislikes: 20,
        },
        {
          id: 9,
          userId: 9,
          userName: 'user9',
          avatar: null,
          rating: 4,
          content: 'comment9',
          timestamp: '2021-08-09',
          likes: 10,
          dislikes: 1,
        },
        {
          id: 10,
          userId: 10,
          userName: 'user10',
          avatar: null,
          rating: 3,
          content: 'comment10',
          timestamp: '2021-08-10',
          likes: 5,
          dislikes: 2,
        },
        {
          id: 11,
          userId: 11,
          userName: 'user11',
          avatar: null,
          rating: 4.5,
          content: 'comment11',
          timestamp: '2021-08-11',
          likes: 20,
          dislikes: 0,
        },
      ];
      setComments(data);
      //   try {
      //     const response = await fetch(`/api/events/${active_id}/comments`);
      //     const data = await response.json();
      //     setComments(data);
      //   } catch (error) {
      //     console.error(error);
      //   }
    };

    fetchComments();
  }, [active_id]);

  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setShowForm(false);
  };

  return (
    <Box>
      <Box
        className='comment-header'
        display='flex'
        justifyContent='space-between'
        alignItems='center'>
        <Typography variant='h4'>{titletext.en}</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setShowForm(!showForm)}>
          Add Comment
        </Button>
      </Box>
      <Divider sx={{my: 2}} />
      {showForm && <CommentForm onSubmit={handleCommentSubmit} />}
      <CommentList comments={comments} />
    </Box>
  );
};

export default CommentsSection;
