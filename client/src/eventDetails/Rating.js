import {border, borderRadius} from '@mui/system';
import React from 'react';
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';

const Rating = ({rating, rating_num}) => {
  const getRatingShow = () => {
    if (rating_num < 10) {
      return '评分人数过少';
    } else {
      return rating.toFixed(1);
    }
  };

  const ratingShow = getRatingShow();
  const style = {
    fontSize: '40px',
  };

  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating / 2 - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      {rating_num >= 10 && (
        <>
          {/* 渲染整颗星星 */}
          {Array(fullStars)
            .fill()
            .map((_, i) => (
              <FaStar key={`full-${i}`} color='gold' style={style} />
            ))}
          {/* 渲染半颗星星 */}
          {hasHalfStar && <FaStarHalfAlt color='gold' style={style} />}
          {/* 渲染空星星 */}
          {Array(emptyStars)
            .fill()
            .map((_, i) => (
              <FaRegStar key={`empty-${i}`} color='gold' style={style} />
            ))}
        </>
      )}
      {/* 显示评分数字或提示信息 */}
      <strong style={{marginLeft: '15px', fontSize: '40px'}}>
        {ratingShow}
      </strong>
    </div>
  );
};

export default Rating;
