import React from 'react';
import './ConfigFormInput.css';

const ConfigFormInput = (props) => {
	return(
		<div className="ConfigFormInput">
			<label>
	          	{props.title}:
				<input type="text"/>
        	</label>      
	    </div>
	);
};

export default ConfigFormInput;