// ActivityDetails.js
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import EventDetails from './event_detail';
import OrganizerInfo from './OrganizerInfo';
import Introduction from './introduction';
import Reserve from './reserve';
import './Detail_page.css';
import DefaultNavbar from './DetailPageComponents/DefaultNavbar';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '../publicAssets/detailPageRoutes';
import theme from '../assets/theme';
import Container from '@mui/material/Container';
import CommentsSection from './comment/comment';
import example_img from './example-poster.jpg';
import sample_text from './sample-text.txt';

function ActivityDetails() {
  let {activeid} = useParams();
  const [active, setActive] = useState({
    id: 1,
    title: '基窝托斯偷跑大赛',
    rating: 9.9,
    rating_num: 100,
    organizerid: 10,
    date: '2024-04-06', // 改正的日期格式
    beginTime: '09:00',
    endTime: '17:00',
    location: '格赫娜学院·社团大楼本馆前广场',
    capacity: 100,
    seats: 50,
    poster: example_img,
    introduction: sample_text,
    classifications: ['偷跑', '装甲'],
  });

  useEffect(() => {
    async function fetchActivityDetails() {
      try {
        // const response = await fetch(`/api/activity/${activeid}`);
        // const data = await response.json();
        // For now using static data as example
        const data = {
          id: activeid,
          title: '基窝托斯偷跑大赛',
          rating: 9.9,
          rating_num: 100,
          organizerid: 10,
          date: '2024-04-06', // Example date
          beginTime: '09:00',
          endTime: '17:00',
          location: '格赫娜学院·社团大楼本馆前广场',
          capacity: 100,
          seats: 50,
          poster: example_img,
          introduction: sample_text,
          classifications: ['偷跑', '装甲'],
        };
        setActive(data);
      } catch (error) {
        console.error('Error fetching activity details:', error);
      }
    }

    if (activeid) {
      fetchActivityDetails();
    }
  }, [activeid]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className='frontLine'>
        <DefaultNavbar routes={routes} sticky />
      </header>
      <Container>
        <section className='title'>
          <h1>{active.title}</h1>
        </section>

        <section className='details-container'>
          <EventDetails
            date={active.date}
            location={active.location}
            startTime={active.beginTime}
            endTime={active.endTime}
            rating={active.rating}
            rating_num={active.rating_num}
            classifications={active.classifications}
          />
          <OrganizerInfo organizerid={active.organizerid} />
        </section>

        <Introduction
          activityImage={active.poster}
          activityDescription={active.introduction}
        />
        <Reserve capacity={active.capacity} seats={active.seats} />
        <hr />
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            marginTop: '30px',
          }}>
          <CommentsSection active_id={active.id} />
        </section>
      </Container>
    </ThemeProvider>
  );
}

export default ActivityDetails;
