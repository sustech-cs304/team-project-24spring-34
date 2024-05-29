// ActivityDetails.js
import React, {useState, useEffect} from 'react';
import EventDetails from './event_detail';
import OrganizerInfo from './OrganizerInfo';
import Introduction from './introduction';
import Reserve from './reserve';
import './Detail_page.css';
import DesignBlocks from './DetailPageComponents/DesignBlocks';
import DefaultNavbar from './DetailPageComponents/DefaultNavbar';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '../publicAssets/detailPageRoutes';
import theme from '../assets/theme';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MKTypography from '../components/MKTypography';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DefaultNavbar routes={routes} sticky />
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
    </ThemeProvider>
  );
}

export default ActivityDetails;
