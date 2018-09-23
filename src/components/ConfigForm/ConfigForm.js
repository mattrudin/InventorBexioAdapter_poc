import React from 'react';
import './ConfigForm.css';
import { resources } from './resources';
import Bexio from '../../utilities/bexio';

class ConfigForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			client_id: '',
			client_secret: '',
			resources: 'article'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleSecretChange = this.handleSecretChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
	    Bexio.getData(this.state.client_id, this.state.client_secret);
	    event.preventDefault();
	}

	handleIdChange(event) {
		this.setState({
			client_id: event.target.value
		});
	}

	handleSecretChange(event) {
		this.setState({
			client_secret: event.target.value
		});
	}

	handleChange(event) {
    	this.setState({
    		resources: event.target.value
    	});
  	}

	render() {

		const dropdownList = resources.map(item => <option value={item}>{item}</option>)

		return(
			<form onSubmit={this.handleSubmit}>
				<label>
		          Client ID:
		          <input type="text" value={this.state.client_id} onChange={this.handleIdChange} />
		        </label>
		        <label>
		          Client Secret:
		          <input type="text" value={this.state.client_secret} onChange={this.handleSecretChange} />
		        </label>
       			<select value={this.state.resources} onChange={this.handleChange}>
       				{dropdownList}
          		</select>
        		<input type="submit" value="Get data from Bexio" />
      		</form>
		);
	}
}

export default ConfigForm;