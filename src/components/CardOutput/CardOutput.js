import React from 'react';
import './CardOutput.css';

const CardOutput = (props) => {
	return(
		<div className="CardOutput">
			<p>{props.key}</p>
			<p>{props.value}</p>   
	    </div>
	);
};

export default CardOutput;