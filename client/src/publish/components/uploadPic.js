import React, {useState, Component} from 'react';
function UploadPic(props) {
  const [imgState, setimgState] = useState(true);
  const [imgData, setimgData] = useState('');
  const _upImg = () => {
    let upimgs = document.getElementById('upimg');
    upimgs.click();
  };
  const upChange = (event) => {
    let imgfile = event.currentTarget.files[0]; ///获得input的第一个图片
    console.log('我是图片源文件', imgfile);
    if (imgfile.size > 10240000) {
      alert('大于了10m，请重新上传', 3);
      let upimgs = document.getElementById('upimg');
      upimgs.value = '';
    } else {
      //使用readAsDataURL来进行回显图片
      let reader = new FileReader(); //filereader.readasdataurl读取图像文件转换为流
      reader.readAsDataURL(imgfile);

      reader.onload = function (event) {
        //读取数据时会触发一个load事件
        let imgs = this.result;
        console.log('我是回显的Base64图片文件', imgs);
        setimgState(false);
        setimgData(imgs);
      };
    }
  };
  return (
    <div className='page-body'>
      <button onClick={_upImg}>{imgState ? '上传' : '重新上传'}</button>
      <div>
        <img src={imgData} style={{width: '200px', height: '200px'}} />
      </div>
      <input
        id='upimg'
        type='file'
        style={{display: 'none'}}
        accept='image/png'
        onChange={upChange}
      />
    </div>
  );
}

class WebStylec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgState: true,
      imgData: '',
    };
  }
  _upImg = () => {
    let upimgs = document.getElementById('upimg');
    upimgs.click();
  };
  upChange = (event) => {
    let _this = this; //烦人的this
    let imgfile = event.currentTarget.files[0]; ///获得input的第一个图片
    console.log('我是图片源文件', imgfile);
    if (imgfile.size > 10240000) {
      alert('大于了10m，请重新上传', 3);
      let upimgs = document.getElementById('upimg');
      upimgs.value = '';
    } else {
      //使用readAsDataURL来进行回显图片
      let reader = new FileReader(); //filereader.readasdataurl读取图像文件转换为流
      reader.readAsDataURL(imgfile);

      reader.onload = function (event) {
        //读取数据时会触发一个load事件
        let imgs = this.result;
        console.log('我是回显的Base64图片文件', imgs);
        _this.state.imgState = false;
        _this.state.imgData = imgs;
        _this.setState(_this.state);
      };
    }
  };
  render() {
    return (
      <div className='page-body'>
        <button onClick={this._upImg}>
          {this.state.imgState ? '上传' : '重新上传'}
        </button>
        <div>
          <img
            src={this.state.imgData}
            style={{width: '200px', height: '200px'}}
          />
        </div>
        <input
          id='upimg'
          type='file'
          style={{display: 'none'}}
          accept='image/png'
          onChange={this.upChange}
        />
      </div>
    );
  }
}

export default UploadPic;
