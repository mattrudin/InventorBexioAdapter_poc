import React from 'react';
import './CardContainer.css';
import Card from '../Card/Card';
//import { fromBexio } from '../../data/fromBexio';
import { getDataArray } from '../../utilities/bexio';

const CardContainer = (props) => {

	const cards = getDataArray.map((card, index)=> <Card key={index} value={card}/>)

	return(
		<div className="CardContainer">
			{cards}      
	    </div>
	);
};

export default CardContainer;