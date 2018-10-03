import React from 'react';
import './Card.css';
import CardOutput from '../CardOutput/CardOutput';
//import { fromBexio } from '../../data/fromBexio';

const Card = (props) => {
	let data = props.date;
	let dataArray = Object.entries(data);
	const cardItems = dataArray.map((item, index) => <CardOutput key={index} value={item} />)

	return(
		<div className="Card">
			{cardItems}
	    </div>
	);
};

export default Card;