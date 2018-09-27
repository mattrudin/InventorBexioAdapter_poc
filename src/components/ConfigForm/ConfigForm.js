import React from 'react';
import './ConfigForm.css';
import { resources } from './resources';
import { connectToBexio } from '../../utilities/bexio';

class ConfigForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			client_id: '',
			client_secret: '',
			resources: 'article',
			access_token: '',
			tokenRecived: 'false'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleSecretChange = this.handleSecretChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		let token = connectToBexio();
		this.setState({
			access_token: token,
			tokenRecived: 'true'
		});
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
			<div className="configform">
				<form onSubmit={this.handleSubmit}>
					<label>
						Client ID:
						<input type="text" value={this.state.client_id} onChange={this.handleIdChange} />
					</label>
					<label>
						Client Secret:
						<input type="text" value={this.state.client_secret} onChange={this.handleSecretChange} />
					</label>
					<label>
						Rescource:
						<select value={this.state.resources} onChange={this.handleChange}>
							{dropdownList}
						</select>
					</label>
					<input className="button" type="submit" value="Get Token from Bexio" />
					<p>Token:{this.state.access_token}</p>
					<p>Token:{this.state.tokenRecived}</p>
				</form>
				<button onClick={this.handleSubmit} />
			</div>
		);
	}
}

export default ConfigForm;