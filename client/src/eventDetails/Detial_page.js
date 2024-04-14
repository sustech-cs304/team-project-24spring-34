// ActivityDetails.js
import React, {useState, useEffect} from 'react';
import example_img from './example-poster.jpg';
import sample_text from './sample-text.txt';
import {TextField, Button} from '@mui/material';

async function fetchActivityDescription() {
  try {
    // const response = await fetch('http://localhost:3306/activity-description');
    // const data = await response.json();

    // 用于测试的假数据
    const response = await fetch(sample_text);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function ActivityDetails() {
  const [activityDescription, setActivityDescription] = React.useState(''); //用户文本
  const [activityTitle, setActivityTitle] = React.useState(''); //活动标题

  const redirectToBookingPage = () => {
    window.location.href = '/booking';
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchActivityDescription();
      setActivityDescription(data);
    }
    fetchData();
    async function fetchTitle() {
      // const response = await fetch('http://localhost:3306/activity-title');
      // const data = await response.json();

      // 用于测试的假数据
      const data = '示例标题';
      setActivityTitle(data);
    }
    fetchTitle();
  }, []);

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1 style={{textAlign: 'center', fontSize: '4rem'}}>{activityTitle}</h1>
      </div>

      <div
        style={{
          justifyContent: 'space-around',
          display: 'flex',
          width: '100%',
        }}>
        {/* 图片 */}
        <img
          src={example_img}
          alt='活动海报'
          style={{display: 'flex', width: '50%', height: 'auto'}}
        />
        <div
          style={{
            display: 'flex',
            width: '50%',
            fontSize: '2rem',
            flexDirection: 'column',
          }}>
          {/* 活动信息模块 */}
          <p>活动时间：2024-04-015 12:00</p>
          <p>活动地点：示例地点</p>
          <p>活动主办方：示例主办方</p>
          <p>活动介绍</p>
          <div>
            {/* 用户自定义文本模块 */}
            {activityDescription}
          </div>
        </div>
      </div>

      <div style={{textAlign: 'center', marginTop: '20px', fontSize: '2rem'}}>
        <div>
          <p>剩余座位数：50</p>
          <Button variant='contained' onClick={redirectToBookingPage}>
            预定
          </Button>
        </div>

        <div style={{marginTop: '20px'}}>{/* 评论区 */}</div>
      </div>
    </div>
  );
}

export default ActivityDetails;
