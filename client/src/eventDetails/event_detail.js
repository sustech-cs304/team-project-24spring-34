import React from 'react';
import Rating from './Rating';

const dateComponent = (date) => {
  const dateEmoji = {en: '📅', zh: '📅'};
  const dateTitle = {en: 'Date', zh: '日期'};

  return (
    <p>
      {dateEmoji.zh}
      <strong>{dateTitle.zh}</strong>: {date}
    </p>
  );
};

const timeComponent = (startTime, endTime) => {
  const timeEmoji = {en: '⏰', zh: '⏰'};
  const timeTitle = {en: 'Time', zh: '时间'};

  return (
    <p>
      {timeEmoji.zh}
      <strong>{timeTitle.zh}</strong>: {startTime} - {endTime}
    </p>
  );
};

const locationComponent = (location) => {
  const locationEmoji = {en: '📍', zh: '📍'};
  const locationTitle = {en: 'Location', zh: '地点'};
  return (
    <p>
      {locationEmoji.zh}
      <strong>{locationTitle.zh}</strong>: {location}
    </p>
  );
};

const classificationComponent = (classifications) => {
  // classifications is an array of strings
  const classificationEmoji = {en: '🏷️', zh: '🏷️'};
  const classificationTitle = {en: 'Classification', zh: '分类'};
  return (
    <p>
      {classificationEmoji.zh}
      <strong>{classificationTitle.zh}</strong>: {classifications.join(', ')}
    </p>
  );
};

const EventDetails = () => {
  return (
    <div className='event-details'>
      <Rating rating={4.0} rating_num={19} />
      {dateComponent('2024-4-26')}
      {timeComponent('10:00', '12:00')}
      {locationComponent('格赫娜学院')}
      {classificationComponent(['偷跑', '装甲'])}
    </div>
  );
};

export default EventDetails;
