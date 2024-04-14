
import TextInput from "./components/textInput";
import NumInput from './components/numInput';

const Publish = () =>{
  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <div style={{ flex: 1, backgroundColor: '#f0f0f0' ,height:'50vh'}}>
        <h1>发布页面</h1>
      </div>
      <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            
            <TextInput name = "活动标题" width = {300} height = {100}/>
            <NumInput name = "活动时长" />
            <TextInput name = "活动地点" width = {300} height = {100}/>
            
          </div>
          <div style={{ flex: 2, backgroundColor: '#e0e0e0' }}>
            <TextInput name = "活动内容" width = {1000} height = {200}/>
            
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
