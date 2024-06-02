import React, {useState, useEffect} from 'react';

const Introduction = ({activityImage, activityDescription}) => {
  const [descriptionContent, setDescriptionContent] = useState('');

  useEffect(() => {
    async function fetchDescriptionContent() {
      try {
        const response = await fetch(activityDescription);
        const text = await response.text();
        setDescriptionContent(text);
      } catch (error) {
        console.error('Error fetching description content:', error);
      }
    }

    if (activityDescription) {
      fetchDescriptionContent();
    }
  }, [activityDescription]);

  return (
    <div className='introduction-container'>
      <div className='image'>
        {activityImage && <img src={activityImage} alt='activity poster' />}
      </div>
      <div className='text'>
        <p>{descriptionContent}</p>
      </div>
    </div>
  );
};

export default Introduction;
