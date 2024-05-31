/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Material Kit 2 React components
import MKBox from '../components/MKBox';
import MKTypography from '../components/MKTypography';

import {AiOutlineHome} from 'react-icons/ai';
import {BiAlarm, BiCalendar, BiHomeAlt2} from 'react-icons/bi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function DefaultInfoCard({
  title,
  description,
  start_time,
  end_time,
  site,
  host,
  direction,
  small,
}) {
  return (
    <MKBox
      lineHeight={1}
      p={direction === 'center' ? 2 : 0}
      textAlign={direction}
      sx={{
        wordWrap: 'break-word',
        border: '2px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        boxSizing: 'border-box',
        width: '300px',
        height: '300px',
      }}>
      <MKBox display='flex' alignItems='center' pr={2}>
        <BiAlarm style={{marginRight: 4}} />
        <MKTypography
          display='inline'
          variant={small ? 'button' : 'body2'}
          color='text'>
          {start_time} {/* 格式化后的时间 */}
          --
          {end_time}
        </MKTypography>
        {/*<div style={{width: '20px'}}></div>*/}
        {/*<BiCalendar style={{marginRight: 4}} />*/}
        {/*<MKTypography*/}
        {/*  display='inline'*/}
        {/*  variant={small ? 'button' : 'body2'}*/}
        {/*  color='text'>*/}
        {/*  {date} /!* 格式化后的日期 *!/*/}
        {/*</MKTypography>*/}
      </MKBox>
      <MKBox display='flex' alignItems='center' pr={2}>
        <AiOutlineHome style={{marginRight: 4}} />
        <MKTypography
          display='inline'
          variant={small ? 'button' : 'body2'}
          color='text'>
          {site}
        </MKTypography>
      </MKBox>
      <MKTypography display='block' variant='5' fontWeight='bold' mb={2.5}>
        {title}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        mb={2.5}>
        {host}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'>
        {description}
      </MKTypography>
    </MKBox>
  );
}

// Setting default props for the DefaultInfoCard
DefaultInfoCard.defaultProps = {
  direction: 'left',
  small: false,
};

// Typechecking props for the DefaultInfoCard
DefaultInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right', 'center']),
  small: PropTypes.bool,
};

export default DefaultInfoCard;
