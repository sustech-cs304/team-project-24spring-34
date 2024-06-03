import React, {useState} from 'react';
import axios from 'axios';

const ImageUploader = ({addPoster}) => {
  const authToken = localStorage.getItem('authToken');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.files[0]);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        'http://10.27.41.93:5000/api/images',
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data.url);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      console.error('No auth token available');
      return;
    }
    if (!avatar) {
      console.error('No file selected');
      return;
    }
    try {
      const avatarUrl = await uploadImage(avatar);
      setImageUrl(avatarUrl);
      addPoster({avatarUrl});
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={handleNameChange}
          placeholder='Name'
          required
        />
        <input
          type='file'
          onChange={handleAvatarChange}
          accept='image/*'
          required
        />
        <button type='submit'>Add Poster</button>
      </form>
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            src={imageUrl}
            alt='Uploaded Avatar'
            style={{maxWidth: '300px'}}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
