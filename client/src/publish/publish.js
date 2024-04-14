import TextInput from './components/textInput';
import NumInput from './components/numInput';

const Publish = () => {
  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{flex: 1, backgroundColor: '#f0f0f0', height: '50vh'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
          }}>
          <h1>发布页面</h1>
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
          </div>
          <div style={{flex: 1, backgroundColor: '#f0f0f0'}}>
            <TextInput name='活动内容' width={500} height={400} />
          </div>
        </div>
      </div>
      <div style={{flex: 1, backgroundColor: '#f0f0f0', height: '50vh'}}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '10vh',
          }}>
          <button
            style={{width: '150px', height: '50px'}}
            onClick={handleClick}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
