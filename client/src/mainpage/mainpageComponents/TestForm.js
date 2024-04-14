import React, {useState} from 'react';
import DesignBlocks from './DesignBlocks';

function TestForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    site: '',
    host: '',
  });
  const [dataList, setDataList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // 将当前表单数据添加到数据列表中
    setDataList([...dataList, formData]);

    // 清空表单数据
    setFormData({
      username: '',
      email: '',
    });
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>表单提交示例</h1>
      <form onSubmit={handleSubmit}>
        <label>
          title
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          description
          <input
            type='text'
            name='description'
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          date:
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          time:
          <input
            type='time'
            name='time'
            value={formData.time}
            onChange={handleInputChange}
          />
        </label>
        <label>
          site:
          <input
            type='text'
            name='site'
            value={formData.site}
            onChange={handleInputChange}
          />
        </label>
        <label>
          host:
          <input
            type='text'
            name='host'
            value={formData.host}
            onChange={handleInputChange}
          />
        </label>
        <button type='submit'>提交</button>
      </form>
      <ul>
        <DesignBlocks datalist={dataList} />
      </ul>
    </div>
  );
}

export default TestForm;
