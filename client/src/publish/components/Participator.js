import react, {useEffect} from 'react';
import {Typography, Avatar, Card, Box} from '@mui/material';
import {useState} from 'react';
import {MdOutlineDeleteForever} from 'react-icons/md';

const ParticipatorList = ({}) => {
  const [participators, setParticipators] = useState([
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

  useEffect(() => {
    // fetch data from backend
  }, []);

  return (
    <Box
      className='participator-list'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        mt: 4,
        width: '100%',
        maxWidth: '200px',
      }}>
      {participators.map((participator, index) => (
        <Participator key={index} participator={participator} />
      ))}
    </Box>
  );
};

const Participator = ({participator}) => {
  const {name, avatar} = participator;
  const handleDelete = () => {
    console.log('delete', name);
  };

  return (
    <Card
      className='participator'
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        p: 2,
        mb: 2,
        boxShadow: 3,
        borderRadius: 2,
        ':hover': {
          boxShadow: 6,
        },
      }}>
      <Avatar
        src={avatar}
        sx={{
          width: 56,
          height: 56,
          mr: 2,
        }}
      />
      <Typography variant='body1'>{name}</Typography>
      <MdOutlineDeleteForever onClick={handleDelete} />
    </Card>
  );
};

const InputBox = ({}) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, avatar);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Name'
      />
      {/* select a image as avatar*/}
      <input
        type='file'
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

const ParticipatorComponent = ({}) => {
  return (
    <div>
      <ParticipatorList />
      <InputBox />
    </div>
  );
};

export default ParticipatorComponent;
