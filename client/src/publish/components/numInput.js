import React from 'react';
import MKInput from '../../components/MKInput';
import MKBox from '../../components/MKBox';
function NumInput(props) {
  const inputStyle = {
    pattern: '[0-9]*',
    backgroundColor: '#FFFFFF',
  };
  return (
    <div style={{backgroundColor: '#ADD8E6 '}}>
      <MKBox>{props.name}</MKBox>

      <MKInput type='text' style={inputStyle} placeholder={props.text} />
    </div>
  );
}

export default NumInput;
