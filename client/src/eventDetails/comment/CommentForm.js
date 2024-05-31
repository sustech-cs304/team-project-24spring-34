import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  TextField,
  Divider,
  Pagination,
  IconButton,
  Typography,
} from '@mui/material';
import {IoIosCloseCircleOutline} from 'react-icons/io';

const StarRating = ({handleRatingChange}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (index, event) => {
    const {left, width} = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const hoverValue = x < width / 2 ? index - 0.5 : index;
    setHoverRating(hoverValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (value) => {
    setRating(value);
    handleRatingChange(value);
  };

  const renderStar = (index) => {
    const fill =
      hoverRating >= index
        ? 'full'
        : hoverRating + 0.5 === index
          ? 'half'
          : 'none';
    const isFilled =
      rating >= index ? 'full' : rating + 0.5 === index ? 'half' : 'none';

    return (
      <svg
        key={index}
        width='24'
        height='24'
        viewBox='0 0 24 24'
        onMouseMove={(event) => handleMouseMove(index, event)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(hoverRating)}
        style={{cursor: 'pointer'}}>
        <defs>
          <linearGradient id='halfGradient'>
            <stop offset='50%' stopColor='gold' />
            <stop offset='50%' stopColor='gray' stopOpacity='1' />
          </linearGradient>
        </defs>
        <polygon
          fill={
            fill === 'full'
              ? 'gold'
              : fill === 'half'
                ? 'url(#halfGradient)'
                : 'gray'
          }
          points='12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8'
        />
        <polygon
          fill={
            isFilled === 'full'
              ? 'gold'
              : isFilled === 'half'
                ? 'url(#halfGradient)'
                : 'gray'
          }
          points='12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8'
          opacity={hoverRating ? 0 : 1}
        />
      </svg>
    );
  };

  return (
    <div style={{display: 'flex'}}>
      {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
    </div>
  );
};

const CommentForm = ({onSubmit, onClose}) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = (newRate) => {
    setRating(newRate);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating <= 0) {
      setError('Rating must be greater than 0');
      return;
    }
    if (content.length <= 0 || content.length > 500) {
      setError('Comment length must be between 1 and 500 characters');
      return;
    }
    setError('');
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
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}>
          <StarRating handleRatingChange={handleRatingChange} />
          <IconButton onClick={onClose} color='error'>
            <IoIosCloseCircleOutline size={24} />
          </IconButton>
        </Box>
        {error && (
          <Typography color='error' variant='body2' sx={{marginBottom: 2}}>
            {error}
          </Typography>
        )}
        <TextField
          label='Comment'
          variant='outlined'
          multiline
          fullWidth
          value={content}
          onChange={handleContentChange}
          rows={4}
          sx={{marginBottom: 2}}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          style={{color: '#ffffff'}}
          fullWidth>
          Submit
        </Button>
      </form>
      <Divider sx={{marginTop: 2}} />
    </Box>
  );
};

export default CommentForm;
