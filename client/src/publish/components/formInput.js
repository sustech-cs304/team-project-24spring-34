import React from 'react';

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

function FormInput(props) {
  const handleClick = () => {
    window.location.href = '/';
  };
  const handleUpload = () => {
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
      </div>
      <div style={{flex: 1}}>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}}>
            <ThemeInput
              name='Event Title'
              width='500px'
              height='100px'
              msg='Type your event title...'
            />
            <ThemeInput
              name='Event Intro'
              width='500px'
              height='100px'
              msg='Type your event introduction...'
            />
            <ThemeDatePicker />
            <ThemeTimePicker name='Starting Time' />
            <ThemeInput
              name='Event Location'
              width='300px'
              height='40px'
              msg=''
            />
            {/* <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                height: '30vh',
              }}>
              <MKButton
                style={{width: '300px', height: '100px',fontSize: '30px'}}
                onClick={handleClick}>
                SUBMIT
              </MKButton>
            </div> */}
          </div>
          <div style={{flex: 1}}>
            <ThemeInput
              name='Edit Detailed Event Content'
              width='500px'
              height='400px'
              msg='Type your detailed event description here...'
            />
            <ThemeUpload />
          </div>
        </div>
      </div>
      <div style={{flex: 1, backgroundColor: '#f0f0f0', height: '50vh'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
          }}>
          <button
            style={{width: '150px', height: '50px'}}
            onClick={handleClick}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormInput;
