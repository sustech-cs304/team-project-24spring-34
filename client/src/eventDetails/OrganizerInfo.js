import React from 'react';
import example_org_img from './example_org_img.jpg';
import {Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const OrganizerInfo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile');
  };
  return (
    <div className='organizer-info' onClick={handleClick}>
      <div className='organizer-photo'>
        <img src={example_org_img} alt='organizer' />
      </div>
      <div className='detail'>
        <p>主办方: 格赫娜学院</p>
        <p>联系人: iroha</p>
        <p>电话: 1942-88-312</p>
      </div>
    </div>
  );
};
export default OrganizerInfo;
