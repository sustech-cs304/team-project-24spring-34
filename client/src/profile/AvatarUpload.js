import React, {useState} from 'react';
import {Box, Typography, Button, IconButton} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import MKButton from '../components/MKButton';

function AvatarUpload({onBack}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg']; // 允许的文件类型
    if (file && allowedTypes.includes(file.type)) {
      setSelectedImage(URL.createObjectURL(file));
      setErrorMessage('');
    } else {
      setErrorMessage('只允许上传PNG和JPEG格式的图片');
    }
  };

  const handleUpload = () => {
    // 处理图片上传逻辑
    console.log('Image uploaded');
  };

  // const handleResize = (direction) => {
  //   switch (direction) {
  //     case 'up':
  //       setCropArea((prev) => ({
  //         ...prev,
  //         y: prev.y - 10,
  //         height: prev.height + 10,
  //       }));
  //       break;
  //     case 'down':
  //       setCropArea((prev) => ({...prev, height: prev.height + 10}));
  //       break;
  //     case 'left':
  //       setCropArea((prev) => ({
  //         ...prev,
  //         x: prev.x - 10,
  //         width: prev.width + 10,
  //       }));
  //       break;
  //     case 'right':
  //       setCropArea((prev) => ({...prev, width: prev.width + 10}));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <Box p={3}>
      <IconButton onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant='h6'>Upload Avatar</Typography>
      <Box my={2} position='relative' width='300px' height='300px'>
        {selectedImage && (
          <img
            src={selectedImage}
            alt='Selected'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              clipPath: `rect(${cropArea.y}px, ${cropArea.x + cropArea.width}px, ${cropArea.y + cropArea.height}px, ${cropArea.x}px)`,
            }}
          />
        )}
        <Box
          position='absolute'
          border='1px dashed #ccc'
          pointerEvents='none'
          width={`${cropArea.width}px`}
          height={`${cropArea.height}px`}
          top={`${cropArea.y}px`}
          left={`${cropArea.x}px`}
        />
      </Box>
      {errorMessage && (
        <Typography variant='body2' color='error'>
          {errorMessage}
        </Typography>
      )}
      <MKButton variant='contained' component='label' sx={{color: 'white'}}>
        Select image
        <input
          type='file'
          hidden
          onChange={handleImageChange}
          accept='image/png, image/jpeg'
        />
      </MKButton>
      {selectedImage && (
        <Box mt={2}>
          <MKButton variant='contained' color='primary' onClick={handleUpload}>
            Upload
          </MKButton>
          {/*<IconButton onClick={() => handleResize('up')}>*/}
          {/*  <ArrowUpIcon />*/}
          {/*</IconButton>*/}
          {/*<IconButton onClick={() => handleResize('down')}>*/}
          {/*  <ArrowDownIcon />*/}
          {/*</IconButton>*/}
          {/*<IconButton onClick={() => handleResize('left')}>*/}
          {/*  <ArrowBackIcon />*/}
          {/*</IconButton>*/}
          {/*<IconButton onClick={() => handleResize('right')}>*/}
          {/*  <ArrowForwardIcon />*/}
          {/*</IconButton>*/}
        </Box>
      )}
    </Box>
  );
}

export default AvatarUpload;
