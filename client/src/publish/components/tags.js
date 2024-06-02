import React, {useState, useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';

const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%; /* 让按钮变成圆形 */
  background-color: #ffa500; /* 浅橙色背景 */
  color: #ffffff; /* 白色文字 */
  border: 2px solid #d3d3d3; /* 浅灰色边框 */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
`;

const Tags = ({onTagsChange}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    onTagsChange(tags);
  }, [tags, onTagsChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (tags.length < 8) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const handleTagRemove = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px'}}>
      {tags.map((tag, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}>
          <span style={{marginRight: '5px'}}>{tag}</span>
          <button
            onClick={() => handleTagRemove(index)}
            style={{
              position: 'relative',
              top: '-15px',
              right: '-15px',
              border: 'none',
              background: 'orange',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            x
          </button>
        </div>
      ))}

      <div style={{marginTop: '0px'}}>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder='Add a tag'
          style={{marginBottom: '5px', padding: '5px', borderRadius: '3px'}}
        />
        <button
          onClick={() => handleInputKeyPress({key: 'Enter'})}
          disabled={tags.length >= 8}
          style={{
            padding: '5px 10px',
            borderRadius: '3px',
            background: tags.length >= 8 ? '#7F8C8D' : '#E67E22',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
          }}>
          +
        </button>
      </div>
    </div>
  );
};

export default Tags;
