// ActivityDetails.js
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import EventDetails from './event_detail';
import Introduction from './introduction';
import Reserve from './reserve';
import './Detail_page.css';
import DefaultNavbar from './DetailPageComponents/DefaultNavbar';
import ParticipatorList from './Participator';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '../publicAssets/detailPageRoutes';
import theme from '../assets/theme';
import Container from '@mui/material/Container';
import CommentsSection from './comment/comment';
import example_img from './example-poster.jpg';
import sample_text from './sample-text.txt';
import avatar from './example_org_img.jpg';
import {useNavigate} from 'react-router-dom';
import {MdWidthFull} from 'react-icons/md';
import {Box} from '@mui/system';

function ActivityDetails() {
  let {activeid} = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const [active, setActive] = useState({
    id: 1,
    title: '基窝托斯偷跑大赛',
    description: sample_text,
    poster: 'https://i.pravatar.cc/150?img=1',
    organizer_id: 10,
    publish_organization: '格赫娜学院万魔殿',
    start_time: '2024-10-10T10:00:00.000Z',
    end_time: '2024-10-10T12:00:00.000Z',
    location: '格赫娜学院·社团大楼本馆前广场',
    capacity: 100,
    eventStatuesId: null,
    remaining_capacity: 50,
    participants: [
      {
        id: 1,
        name: 'iroha',
        avatar: {avatar},
      },
    ],
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
        if (!authToken) {
          navigate('/login');
        }
        const response = await fetch(
          'http://10.27.41.93:5000/api/events/' + activeid,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authToken}`,
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
        console.log(response);
        setActive(response);
      } catch (error) {
        console.error('Error fetching activity details:', error);
      }
    }

    if (activeid) {
      fetchActivityDetails();
      console.log('active');
      console.log(active);
    }
  }, [activeid]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header className='frontLine'>
        <DefaultNavbar routes={routes} sticky />
      </header>
      <Box
        sx={{
          width: 1112,
          height: 10,
        }}
      />
      <Container>
        <section className='title'>
          <h1>{active.title}</h1>
        </section>

        <section className='details-container'>
          <EventDetails
            location={active.location}
            startTime={active.start_time}
            endTime={active.end_time}
            rating={active.rating}
            rating_num={active.rating_num}
            classifications={active.tags}
          />
          <ParticipatorList Participators={active.participants} />
        </section>

        <Introduction
          activityImage={active.poster}
          activityDescription={active.description}
        />
        <Reserve
          capacity={active.capacity}
          seats={active.remaining_capacity}
          event_id={activeid}
          already_reserved={active.already_reserved}
        />
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
