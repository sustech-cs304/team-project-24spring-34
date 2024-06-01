import React from 'react';
import example_img from './example-poster.jpg';
import sample_text from './sample-text.txt';

// load the activity description from the server
async function fetchActivityDescription() {
  try {
    // const response = await fetch('http://localhost:3306/activity-description');
    // const data = await response.json();

    // use fake data for testing
    const response = await fetch(sample_text);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchActivityImage() {
  try {
    // const response = await fetch('http://localhost:3306/activity-image');
    // const data = await response.json();

    // use fake data for testing
    const data = example_img;
    return data;
  } catch (error) {
    console.error(error);
  }
}

const Introduction = () => {
  const [activityImage, setActivityImage] = React.useState(''); //activity image
  const [activityDescription, setActivityDescription] = React.useState(''); //user text

  React.useEffect(() => {
    async function fetchData() {
      const data = await fetchActivityDescription();
      setActivityDescription(data);
    }
    fetchData();
    async function fetchImage() {
      const data = await fetchActivityImage();
      setActivityImage(data);
    }
    fetchImage();
  }, []);

  return (
    <div className='introduction-container'>
      <div className='image'>
        <img src={activityImage} alt='activity poster' />
      </div>
      <div className='text'>
        <p>{activityDescription}</p>
      </div>
    </div>
  );
};

export default Introduction;
