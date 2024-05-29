import React from 'react';

import TextInput from './textInput';
import NumInput from './numInput';
import AddPics from './addPics';
function FormInput(props) {
  const handleClick = () => {
    // TODO: 发送给后端
    window.location.href = '/';
  };
  const handleUpload = () => {
    // window.location.href = '/';
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '100px',
        marginTop: '100px',
      }}>
      <div style={{flex: 1, backgroundColor: '#f0f0f0', height: '50vh'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            height: '10vh',
          }}>
          <h1>主办方发布页面</h1>
        </div>
      </div>
      <div style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1, backgroundColor: '#f0f0f0'}}>
            <TextInput name='活动标题' width={300} height={100} />
            <TextInput name='活动简介' width={300} height={100} />
            <NumInput name='活动时间' text='MM/DD/YYYY' />
            <NumInput name='活动开始时间' text='HH/MM' />
            <NumInput name='活动结束时间' text='HH/MM' />
            <NumInput name='活动地点' />
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                height: '30vh',
              }}>
              <button
                style={{width: '300px', height: '100px'}}
                onClick={handleClick}>
                提交
              </button>
            </div>
          </div>
          <div style={{flex: 1, backgroundColor: '#f0f0f0'}}>
            <TextInput name='活动内容' width={500} height={400} />
            <label>上传示例图片</label>
            <AddPics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormInput;
