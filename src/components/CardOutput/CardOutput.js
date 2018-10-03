import React from 'react';
import './CardOutput.css';

const CardOutput = (props) => {
	let keyValue = props.value.join(": ")
	return(
		<div className="CardOutput">
			<p>{keyValue}</p>   
	    </div>
	);
};

export default CardOutput;