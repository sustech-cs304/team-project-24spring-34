// ActivityDetails.js
import React, {useState, useEffect} from 'react';
import EventDetails from './event_detail';
import OrganizerInfo from './OrganizerInfo';
import Introduction from './introduction';
import Reserve from './reserve';
import './Detail_page.css';

function ActivityDetails() {
  const [activityTitle, setActivityTitle] = React.useState(''); //活动标题

  useEffect(() => {
    async function fetchTitle() {
      // const response = await fetch('http://localhost:3306/activity-title');
      // const data = await response.json();

      // 用于测试的假数据
      const data = 'exapmle title';
      setActivityTitle(data);
    }
    fetchTitle();
  }, []);

  return (
    <div className='detailPage'>
      <div className='title'>
        <h1>{activityTitle}</h1>
      </div>
      <div className='details-container'>
        <EventDetails />
        <OrganizerInfo />
      </div>
      <Introduction />
      <Reserve />
      <div style={{marginTop: '20px'}}>{/* 评论区 */}</div>
    </div>
  );
}

export default ActivityDetails;
