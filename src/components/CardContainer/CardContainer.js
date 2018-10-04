import React from 'react';
import './CardContainer.css';
import Card from '../Card/Card';
//import { fromBexio } from '../../data/fromBexio';
//import { getDataArray } from '../../utilities/bexio';

const CardContainer = (props) => {
	let data = props.data;
	const cards = data.map((card, index)=> <Card key={index} data={card}/>);

	return(
		<div className="CardContainer">
			{cards}      
	    </div>
	);
};

export default CardContainer;