import React from 'react';
import './CardContainer.css';
import Card from '../Card/Card';
import { fromBexio } from '../../data/fromBexio';

const CardContainer = (props) => {

	const cards = fromBexio.map((card, index)=> <Card key={index} />)

	return(
		<div className="CardContainer">
			{cards}      
	    </div>
	);
};

export default CardContainer;