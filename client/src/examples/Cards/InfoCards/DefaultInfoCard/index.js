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
import MKBox from '../../../../components/MKBox';
import MKTypography from '../../../../components/MKTypography';

function DefaultInfoCard({
  title,
  description,
  date,
  time,
  site,
  host,
  direction,
  small,
}) {
  return (
    <MKBox
      lineHeight={1}
      p={direction === 'center' ? 2 : 0}
      textAlign={direction}>
      <MKTypography
        display='block'
        variant='5'
        fontWeight='bold'
        mt={direction === 'center' ? 1 : 2}
        mb={1.5}>
        {title}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        pr={direction === 'left' ? 6 : 0}
        pl={direction === 'right' ? 6 : 0}>
        {description}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        pr={direction === 'left' ? 6 : 0}
        pl={direction === 'right' ? 6 : 0}>
        {description}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        pr={direction === 'left' ? 6 : 0}
        pl={direction === 'right' ? 6 : 0}>
        {date}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        pr={direction === 'left' ? 6 : 0}
        pl={direction === 'right' ? 6 : 0}>
        {time}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        pr={direction === 'left' ? 6 : 0}
        pl={direction === 'right' ? 6 : 0}>
        {site}
      </MKTypography>
      <MKTypography
        display='block'
        variant={small ? 'button' : 'body2'}
        color='text'
        pr={direction === 'left' ? 6 : 0}
        pl={direction === 'right' ? 6 : 0}>
        {host}
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
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['left', 'right', 'center']),
  small: PropTypes.bool,
};

export default DefaultInfoCard;
