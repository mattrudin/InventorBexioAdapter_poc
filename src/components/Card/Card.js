import React from 'react';
import './Card.css';
import CardOutput from '../CardOutput/CardOutput';
import { fromBexio } from '../../data/fromBexio';

const Card = (props) => {
	
	const cardItems = fromBexio.map(item => <CardOutput key={item} value={item} />)

	return(
		<div className="Card">
			{cardItems}      
	    </div>
	);
};

export default Card;