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
    description: sample_text,
    poster: example_img,
    organizerid: 10,
    start_time: '09:00',
    end_time: '17:00',
    location: '格赫娜学院·社团大楼本馆前广场',
    capacity: 100,
    remaining_capacity: 50,
    tags: [
      {
        id: 1,
        name: '偷跑',
      },
      {
        id: 2,
        name: '基窝托斯',
      },
      {
        id: 3,
        name: '装甲',
      },
    ],
    rating: 9.9,
    rating_num: 100,
  });

  useEffect(() => {
    async function fetchActivityDetails() {
      try {
        //test
        const response = await fetch(
          'http://10.27.41.93:5000/api/events/' + activeid,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          },
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .catch((error) => {
            console.error('Error fetching activity details:', error);
          });
        setActive(response);
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
            startTime={active.start_time}
            endTime={active.end_time}
            rating={active.rating}
            rating_num={active.rating_num}
            classifications={active.tags}
          />
          <OrganizerInfo organizerid={10} />
          {/*need to upadate*/}
        </section>

        <Introduction
          activityImage={active.poster}
          activityDescription={active.description}
        />
        <Reserve capacity={active.capacity} seats={active.remaining_capacity} />
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
