import React from 'react';
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';

const RatingMini = ({rating}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
      {/* 渲染整颗星星 */}
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <FaStar key={`full-${i}`} color='gold' />
        ))}
      {/* 渲染半颗星星 */}
      {hasHalfStar && <FaStarHalfAlt color='gold' />}
      {/* 渲染空星星 */}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} color='gold' />
        ))}
      <strong style={{marginLeft: '8px'}}>{Number(rating).toFixed(1)}</strong>
    </div>
  );
};

export default RatingMini;
