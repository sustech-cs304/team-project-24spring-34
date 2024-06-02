import React, {useState, useEffect} from 'react';
import {
  Typography,
  Avatar,
  Card,
  Box,
  TextField,
  Button,
  IconButton,
  Container,
} from '@mui/material';
import {MdOutlineDeleteOutline} from 'react-icons/md';

const ParticipatorList = ({participators, setParticipators}) => {
  useEffect(() => {
    // 如果有初始数据，可以在这里设置
    setParticipators([
      {
        name: 'Alice',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        name: 'Bob',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        name: 'Charlie',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ]);
  }, [setParticipators]);

  const handleDelete = (name) => {
    setParticipators(
      participators.filter((participator) => participator.name !== name),
    );
  };

  return (
    <Box
      className='participator-list'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mt: 4,
        minWidth: 50,
        overflowX: 'auto', // 如果 participators 列表很长，可以滚动
      }}>
      {participators.map((participator, index) => (
        <Participator
          key={index}
          participator={participator}
          onDelete={handleDelete}
        />
      ))}
    </Box>
  );
};

const Participator = ({participator, onDelete}) => {
  const {name, avatar} = participator;
  const handleDelete = () => {
    onDelete(name);
  };

  return (
    <Card
      className='participator'
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        minWidth: 200,
        margin: 2,
        ':hover': {
          boxShadow: 6,
        },
        width: '100%',
      }}>
      <Avatar
        src={avatar}
        sx={{
          width: 56,
          height: 56,
          mr: 2,
        }}
      />
      <Typography variant='body1' sx={{flexGrow: 1}}>
        {name}
      </Typography>
      <IconButton onClick={handleDelete}>
        <MdOutlineDeleteOutline />
      </IconButton>
    </Card>
  );
};

const InputBox = ({addParticipator}) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !avatar) return;
    addParticipator({name, avatar});
    setName('');
    setAvatar('');
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mt: 4,
        p: 2,
        background: 'white',
        boxShadow: 3,
        borderRadius: 2,
        width: '100%',
        maxHeight: 150,
        maxWidth: 400,
        mx: 'auto',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin='normal'
          placeholder='Type participator name'
        />
        <input
          type='file'
          onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
          margin='normal'
        />
      </Box>
      <Button
        type='submit'
        variant='contained'
        sx={{
          width: '15%',
          height: '100%',
          borderRadius: 1,
          marginLeft: 2,
          padding: 1,
          background: '#E67E22',
        }}>
        +
      </Button>
    </Box>
  );
};

const ParticipatorComponent = () => {
  const [participators, setParticipators] = useState([]);

  const addParticipator = (newParticipator) => {
    setParticipators([...participators, newParticipator]);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        mt: 4,
      }}>
      <ParticipatorList
        participators={participators}
        setParticipators={setParticipators}
      />
      <InputBox addParticipator={addParticipator} />
    </Container>
  );
};

export default ParticipatorComponent;
