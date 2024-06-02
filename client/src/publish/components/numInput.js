import React, {useState} from 'react';

function NumInput() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d+$/.test(inputValue)) {
      const number = parseInt(inputValue, 10);
      if (number >= 0 && number <= 10000) {
        setValue(number);
      }
    }
  };

  return (
    <div>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        placeholder=''
        required
      />
    </div>
  );
}

export default NumInput;
