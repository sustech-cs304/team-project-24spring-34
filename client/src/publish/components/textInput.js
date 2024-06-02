import React from 'react';
import MKInput from '../../components/MKInput';
import MKProgress from '../../components/MKProgress';
import MKButton from '../../components/MKButton';
import MKBox from '../../components/MKBox';
import MKSocialButton from '../../components/MKSocialButton';
import MKAvatar from '../../components/MKAvatar';
import MKBadge from '../../components/MKBadge';
import ThemeBox from './themeBox';
function TextInput(props) {
  const inputStyle = {
    width: props.width + 'px',
    height: props.height + 'px',
  };
  return (
    <div>
      <MKBox>{props.name}</MKBox>

      <textarea type='text' style={inputStyle} />
      {/* <ThemeBox/> */}
    </div>
  );
}

export default TextInput;
