import React from "react";
function TextInput(props) {
	
	const inputStyle = {
		width: props.width+'px', 
		height: props.height+'px',
	}
	return (
	  <div>
		<label>{props.name}</label><br/>
		<textarea type="text" style={inputStyle}/>
	  </div>
	);
  }
  
  export default TextInput;