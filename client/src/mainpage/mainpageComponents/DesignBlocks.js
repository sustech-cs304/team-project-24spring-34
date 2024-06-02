// DesignBlocks.js
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MKBox from '../../components/MKBox';
import MKTypography from '../../components/MKTypography';
import DefaultInfoCard from '../../publicAssets/DefaultInfoCard';
import axios from 'axios';

const authToken = localStorage.getItem('authToken');
function DesignBlocks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.27.41.93:5000/api/events', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log(response);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <MKTypography variant='h6'>Loading...</MKTypography>;
  }

  if (error) {
    return <MKTypography variant='h6'>Error: {error.message}</MKTypography>;
  }

  const renderData = data.events.map((event) => (
    <Grid item xs={10} md={4} sx={{mb: 2}} key={event.title}>
      <Link to={`/event/${event.id}`}>
        <DefaultInfoCard
          title={event.title}
          description={event.description}
          start_time={event.start_time}
          end_time={event.end_time}
          site={event.location}
          host={event.poster}
        />
      </Link>
    </Grid>
  ));

  return (
    <MKBox component='section' my={6} py={6}>
      <Container sx={{mt: 6}}>
        <Grid container spacing={3} sx={{mb: 10}}>
          <Grid item xs={12} lg={9}>
            <Grid container spacing={3}>
              {renderData}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default DesignBlocks;
