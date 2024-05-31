import React, {useEffect, useState} from 'react';
import Rating from '../Rating';
import './comment.css';

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

  return (
    <div className='single-comment'>
      <div className='comment-header'>
        <div className='user-info'>
          <div className='user-avatar'>
            {avatar ? (
              <img src={avatar} alt='avatar' />
            ) : (
              <div className='default-avatar'></div>
            )}
          </div>
          <div className='user-name'>
            <p>{userName}</p>
          </div>
        </div>
        <div className='comment-rating'>
          <Rating rating={rating} />
        </div>
      </div>
      <div className='comment-content'>
        <p>{content}</p>
      </div>
      <div className='comment-footer'>
        <div className='comment-timestamp'>
          <p>{timestamp}</p>
        </div>
        <div className='comment-likes'>
          <p>{likes} likes</p>
        </div>
        <div className='comment-dislikes'>
          <p>{dislikes} dislikes</p>
        </div>
      </div>
    </div>
  );
};

const CommentList = ({comments}) => {
  const commentPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentComments, setCurrentComments] = useState([]);
  const totalPage = Math.ceil(comments.length / commentPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const sortedComments = [...comments].sort(
      (a, b) => b.timestamp - a.timestamp,
    );
    const start = (currentPage - 1) * commentPerPage;
    const end = start + commentPerPage;
    setCurrentComments(sortedComments.slice(start, end));
  }, [comments, currentPage]);

  return (
    <>
      <div className='comment-list'>
        {currentComments.map((comment) => (
          <React.Fragment key={comment.id}>
            <SingleComment comment={comment} />
          </React.Fragment>
        ))}
      </div>
      <div className='pagination'>
        {Array.from({length: totalPage}, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </>
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
    // setComments([newComment, ...comments]);
    // setShowForm(false);
  };

  return (
    <>
      <header className='comment-header'>
        <section className='title-button'>
          <h2>{titletext.en}</h2>
          <button onClick={() => setShowForm(!showForm)}>Add Comment</button>
        </section>
        <section className='hr'>
          <hr />
        </section>
      </header>
      <section className='comments'>
        <CommentList comments={comments} />
      </section>
    </>
  );
};

export default CommentsSection;
