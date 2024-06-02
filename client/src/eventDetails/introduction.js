import React, {useState, useEffect} from 'react';

const Introduction = ({activityImage, activityDescription}) => {
  return (
    <div className='introduction-container'>
      <div className='image'>
        {activityImage && <img src={activityImage} alt='activity poster' />}
      </div>
      <div className='text'>
        <p>{activityDescription}</p>
      </div>
    </div>
  );
};

export default Introduction;
