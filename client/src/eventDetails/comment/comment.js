import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import RatingMini from './RatingMini';
import CommentForm from './CommentForm';
import ReactDOM from 'react-dom';
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
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import axios from 'axios';

const SingleComment = ({comment, authority}) => {
  const authToken = localStorage.getItem('authToken');
  const {
    id,
    content,
    username,
    event_id,
    likes,
    dislikes,
    rating,
    createdAt,
    updatedAt,
  } = comment;

  const navigate = useNavigate();
  const [hovered, setHovered] = useState({like: false, dislike: false});
  const [userName, setUserName] = useState('user');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://http://10.27.41.93:5000/api/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
          {
            withCredentials: true,
          },
        );
        setUserName(response.data.nickname);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [authToken, username]);

  const handleClickOnUserInfo = () => {
    navigate('/profilePage/' + username);
    // TODO
  };
  const handleClickLike = () => {
    console.log('like');
  };

  const handleClickDislike = () => {
    console.log('dislike');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <Box className='single-comment' mb={2} width={'100%'}>
      <Box
        className='comment-header'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        width={'100%'}>
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
      <Typography variant='body1' mt={1} style={{wordBreak: 'break-all'}}>
        {content}
      </Typography>
      <Box
        className='comment-footer'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mt={1}>
        <section>
          <Typography variant='caption'>{updatedAt}</Typography>
          {authority && (
            <Button
              variant='contained'
              onClick={handleDelete}
              style={{
                marginLeft: '10px',
                maxHeight: '10px',
                //lucency
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: 'red',
                boxShadow: 'none',
                fontSize: '10px',
              }}>
              Delete
            </Button>
          )}
        </section>
        <Box display='flex' alignItems='center'>
          <Box display='flex' alignItems='center' mr={2}>
            <Box
              display='flex'
              alignItems='center'
              mr={1}
              onMouseEnter={() =>
                setHovered({
                  like: true,
                  dislike: false,
                })
              }
              onMouseLeave={() =>
                setHovered({
                  like: false,
                  dislike: false,
                })
              }
              onMouseClick={() => handleClickLike()}>
              {hovered.like ? <AiFillLike color='red' /> : <AiOutlineLike />}
              <Typography variant='caption' ml={1} style={{width: '30px'}}>
                {dislikes}
              </Typography>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              ml={1}
              onMouseEnter={() =>
                setHovered({
                  like: false,
                  dislike: true,
                })
              }
              onMouseLeave={() =>
                setHovered({
                  like: false,
                  dislike: false,
                })
              }
              onMouseClick={() => handleClickDislike()}>
              {hovered.dislike ? (
                <AiFillDislike color='blue' />
              ) : (
                <AiOutlineDislike />
              )}
              <Typography variant='caption' ml={1} style={{width: '30px'}}>
                {likes}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider sx={{my: 2}} />
    </Box>
  );
};

const CommentList = ({
  comments,
  authority,
  user,
  onPageChange,
  currentPage,
  totalPage,
}) => {
  return (
    <>
      <List className='comment-list'>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <SingleComment
              comment={comment}
              authority={authority || comment.userId === user.id}
            />
          </ListItem>
        ))}
      </List>
      <Box display='flex' justifyContent='center' mt={2}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={onPageChange}
        />
      </Box>
    </>
  );
};

// 主组件
const CommentsSection = ({active_id}) => {
  const authToken = localStorage.getItem('authToken');
  const commentPerPage = 10;
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const titletext = {zh: '评论', en: 'Comments'};
  const [authority, setAuthority] = useState(false);
  const [user, setUser] = useState({id: 4, name: 'user4'});
  const [isLogin, setIsLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchComments = async (page) => {
    try {
      console.log(
        `http://10.27.41.93:5000/api/comments/${active_id}?limit=${commentPerPage}&offset=${page - 1}`,
      );
      const response = await axios.get(
        `http://10.27.41.93:5000/api/comments/${active_id}?limit=${commentPerPage}&offset=${page - 1}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
        {
          withCredentials: true,
        },
      );
      const total = response.data.total;
      setComments(response.data.comments);
      console.log(response.data.comments);
      setTotalPage(Math.ceil(total / commentPerPage));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setShowForm(false);
  };

  const handleLogin = async () => {
    setIsLogin(true);
    setUser({id: 1, name: 'user'});
    setAuthority(true);
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
          color='inherit'
          onClick={() => setShowForm(true)}>
          Add Comment
        </Button>
      </Box>
      <Divider sx={{my: 2}} />
      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        closeAfterTransition>
        <Fade in={showForm}>
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}>
            <CommentForm
              onSubmit={handleCommentSubmit}
              onClose={() => setShowForm(false)}
            />
          </Box>
        </Fade>
      </Modal>
      <CommentList
        comments={comments}
        authority={authority}
        user={user}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPage={totalPage}
      />
    </Box>
  );
};

export default CommentsSection;
