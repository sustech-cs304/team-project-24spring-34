import React from "react";
function NumInput(props) {
	
	const inputStyle = {
		pattern: "[0-9]*",
	}
	return (
	  <div>
		<label>{props.name}</label><br/>
		<input type="text" style={inputStyle}/>
	  </div>
	);
  }
  
  export default NumInput;