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

const SingleComment = ({comment, authority}) => {
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
  const [hovered, setHovered] = useState({like: false, dislike: false});

  const handleClickOnUserInfo = () => {
    navigate('/profilePage');
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
          <Typography variant='caption'>{timestamp}</Typography>
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
      // 假数据
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
          userName:
            'user2user2user2user2user2user2user2user2user2user2user2user2',
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
          content:
            'comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4comment4',
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
      ];
      const total = 11;
      setComments(data);
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
