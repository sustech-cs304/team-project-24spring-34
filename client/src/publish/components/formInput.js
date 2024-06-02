import React, {useState, useRef} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Modal} from 'antd';
import axios from 'axios';

import TextInput from './textInput';
import NumInput from './numInput';
import MKButton from '../../components/MKButton';
import ThemeBox from './themeBox';
import ThemeInput from './themeInput';
import ThemeTimePicker from './themeTimePicker';
import ThemeDatePicker from './themeDatePicker';
import ThemeTitle from './themeTitle';
import ThemeUpload from './themeUpload';
import ThemeNumInput from './themeNumInput';
import ThemeButton from './themeButton';
import Tags from './tags';
import Avatar from './avatarInput';
import ParticipatorComponent from './Participator';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;
const theme = {
  colors: {
    primary: '#2C3E50',
    secondary: '#E67E22',
    background: '#ECF0F1',
    cardBackground: '#FFFFFF',
    text: '#34495E',
    secondaryText: '#7F8C8D',
    buttonHover: '#D35400',
  },
};
function FormInput(props) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventIntro, setEventIntro] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [eventCap, setEventCap] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('00:00:00');
  const [endTime, setEndTime] = useState('00:00:00');

  const updateEventCap = (cap) => {
    setEventCap(cap);
  };
  const updateStartDate = (changeStartDate) => {
    setStartDate(changeStartDate);
  };
  const updateEndDate = (changeEndDate) => {
    setEndDate(changeEndDate);
  };
  const updateStartTime = (changeStartTime) => {
    setStartTime(changeStartTime);
  };
  const updateEndTime = (changeEndTime) => {
    setEndTime(changeEndTime);
  };

  const [tags, setTags] = useState([]);
  const updateTags = (changeTags) => {
    setTags(changeTags);
  };
  const [pics, setPics] = useState('');
  const UpdatePicsChange = (changePics) => {
    setPics(changePics);
  };
  const [error, setError] = useState('');

  const getDateTime = ({dateProp, timeProp}) => {
    const [hours, minutes, seconds] = timeProp.split(':');
    const combinedDateTime = new Date(dateProp);
    combinedDateTime.setHours(parseInt(hours, 10));
    combinedDateTime.setMinutes(parseInt(minutes, 10));
    combinedDateTime.setSeconds(parseInt(seconds, 10));
    return combinedDateTime;
  };

  const requestBody = {
    title: eventTitle.trim(),
    description: eventIntro.trim(),
    poster: pics,
    publish_organization: eventOrganizer.trim(),
    participants: [
      {
        name: 'string',
        description: 'string',
        avatar: 'string',
      },
    ],
    start_time: getDateTime({dateProp: startDate, timeProp: startTime}),
    end_time: getDateTime({dateProp: endDate, timeProp: endTime}),
    tags: tags,
    location: eventLocation,
    capacity: eventCap,
  };

  const handleClick = (e) => {
    console.log(eventCap);
    console.log(startDate);
    console.log(tags);
    console.log(pics);
    e.preventDefault();
    if (
      eventIntro.trim() === '' ||
      eventTitle.trim() === '' ||
      eventContent.trim() === '' ||
      eventLocation.trim() === '' ||
      eventOrganizer.trim() === '' ||
      eventCap === undefined
    ) {
      let missingFields = [];
      if (eventTitle.trim() === '') missingFields.push('Event Title');
      if (eventIntro.trim() === '') missingFields.push('Event Introduction');
      if (eventContent.trim() === '') missingFields.push('Event Content');
      if (eventLocation.trim() === '') missingFields.push('Event Location');
      if (eventOrganizer.trim() === '') missingFields.push('Event Organizer');
      if (eventCap === undefined) missingFields.push('Max Capacity');
      setError(
        `Please fill in the following fields: ${missingFields.join(', ')}`,
      );
      return;
    }
    if (
      getDateTime({dateProp: startDate, timeProp: startTime}) >=
      getDateTime({dateProp: endDate, timeProp: endTime})
    ) {
      setError(`Event starting time must be earlier than ending time.`);
      return;
    }
    const tagSet = new Set(tags);
    if (tagSet.size !== tags.length) {
      setError(`You have added duplicate tags for this event.`);
      return;
    }
    console.log('Form submitted');
    axios
      .post(
        'http://10.27.41.93:5000/api/events',
        requestBody,
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
        {
          withCredentials: true, // 发送请求时包括Cookie
        },
      )
      .then((response) => {
        console.log('Event created successfully:', response.data);
        Modal.success({
          title: 'New Event Created!',
          content: 'You can check out your events now.',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // window.location.href = '/';
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
        marginTop: '100px',
      }}>
      <div style={{flex: 1, height: '50vh'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            height: '10vh',
          }}>
          <ThemeTitle name='Edit Your Event Page' />
        </div>
        <div
          style={{
            background: theme.colors.background,
            padding: '20px',
            marginTop: '0px',
          }}>
          <Tags onTagsChange={updateTags} />
          <ParticipatorComponent />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <div style={{flex: 1}}>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}}>
            <ThemeInput
              name='Event Title'
              id='EventTitle'
              onChange={(e) => setEventTitle(e.target.value)}
              width='500px'
              height='100px'
              msg='Type your event title...'
            />
            <ThemeInput
              name='Event Intro'
              id='EventIntro'
              onChange={(e) => setEventIntro(e.target.value)}
              width='500px'
              height='100px'
              msg='Type your event introduction...'
            />
            <ThemeDatePicker
              changeStart={updateStartDate}
              changeEnd={updateEndDate}
            />
            <ThemeTimePicker
              changeStart={updateStartTime}
              changeEnd={updateEndTime}
            />
            <ThemeInput
              name='Event Location'
              id='EventLocation'
              onChange={(e) => setEventLocation(e.target.value)}
              width='300px'
              height='40px'
              msg=''
            />
            <ThemeInput
              name='Event Organizer'
              id='EventOrganizer'
              onChange={(e) => setEventOrganizer(e.target.value)}
              width='300px'
              height='40px'
              msg=''
            />
          </div>
          <div style={{flex: 1}}>
            <ThemeInput
              name='Edit Detailed Event Content'
              id='EventContent'
              onChange={(e) => setEventContent(e.target.value)}
              width='600px'
              height='600px'
              msg='Type your detailed event description here...'
            />
            <ThemeUpload onPicsChange={UpdatePicsChange} />
            <ThemeNumInput cap={updateEventCap} />
            <ThemeButton onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInput;
