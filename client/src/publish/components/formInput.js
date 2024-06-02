import React, {useState, useRef} from 'react';
import styled, {ThemeProvider} from 'styled-components';

import TextInput from './textInput';
import NumInput from './numInput';
import AddPics from './addPics';
import MKButton from '../../components/MKButton';
import ThemeBox from './themeBox';
import ThemeInput from './themeInput';
import ThemeTimePicker from './themeTimePicker';
import ThemeDatePicker from './themeDatePicker';
import ThemeTitle from './themeTitle';
import ThemeUpload from './themeUpload';
import ThemeNumInput from './themeNumInput';
import ThemeButton from './themeButton';

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

function FormInput(props) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventIntro, setEventIntro] = useState('');
  const [eventContent, setEventContent] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [eventCap, setEventCap] = useState('');

  const updateEventCap = (cap) => {
    setEventCap(cap);
  };
  const [error, setError] = useState('');

  const handleClick = (e) => {
    console.log(eventCap);
    console.log('111');
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
    console.log('Form submitted');
    window.location.href = '/';
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
            <ThemeDatePicker />
            <ThemeTimePicker name='Starting Time' />
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
            <ThemeUpload />
            <ThemeNumInput cap={updateEventCap} />
            <ThemeButton onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInput;
