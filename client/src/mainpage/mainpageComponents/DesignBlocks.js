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
  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}/${month}/${day}..${hours}:${minutes}`;
  }
  const renderData = data.events.map((event) => (
    <Grid item xs={12} sm={6} md={4} sx={{mb: 4}} key={event.title}>
      <Link to={`/details/${event.id}`}>
        <DefaultInfoCard
          title={event.title}
          description={event.description}
          start_time={formatDateTime(event.start_time)}
          end_time={formatDateTime(event.end_time)}
          site={event.location}
          host={event.poster}
        />
      </Link>
    </Grid>
  ));

  return (
    <MKBox component='section' my={6} py={6}>
      <Container sx={{mt: 6, px: 4}}>
        <Grid container spacing={4} sx={{mb: 10}}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {renderData}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default DesignBlocks;
