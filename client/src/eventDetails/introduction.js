import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseURL = 'http://10.27.41.93:5000/api';
const fetchImage = async ({Url, authToken}) => {
  try {
    console.log('fetching image' + `http://10.27.41.93:5000/api/${Url}`);
    const response = await axios.get(`http://10.27.41.93:5000/api/${Url}`, {
      headers: {
        Accept: 'image/*',
        Authorization: `Bearer ${authToken}`,
      },
      responseType: 'blob', // Ensure response is treated as a Blob
    });

    // Create a URL for the image
    const url = URL.createObjectURL(response.data);
    return url;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
};

const Introduction = ({activityImage, activityDescription}) => {
  const authToken = localStorage.getItem('authToken');
  return (
    <div className='introduction-container'>
      <div className='image'>
        {activityImage && (
          <img
            src={fetchImage(activityImage, authToken)}
            alt='activity poster'
          />
        )}
      </div>
      <div className='text'>
        <p>{activityDescription}</p>
      </div>
    </div>
  );
};

export default Introduction;
