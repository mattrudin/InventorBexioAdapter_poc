import React from 'react';
import './ConfigForm.css';
import { resources } from './resources';
import { clearStorage, getCode, oauthLogin, getAccessToken, shortenCode, getArticles } from '../../utilities/oauth';

class ConfigForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			client_id: '',
			client_secret: '',
			resources: 'article',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleSecretChange = this.handleSecretChange.bind(this);
	}

	/* componentDidMount() {
		this.timerID = setInterval(
		  () => getCode(),
		  1000
		);
	  } */

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

	handleSubmitToken() {
		//TODO
	}

	handleSubmitRessource() {
		//TODO
	}


	render() {

		const dropdownList = resources.map(item => <option value={item}>{item}</option>)

		return(
			<div className="configform">
				<form className="GetRessource">
					<label>
						Rescource:
						<select value={this.state.resources} onChange={this.handleChange}>
							{dropdownList}
						</select>
					</label>
					<input className="button" type="submit" value="Get ressource from Bexio" />				
				</form>
				<form className="PostRessource">
					<label>
						Rescource:
						<select value={this.state.resources} onChange={this.handleChange}>
							{dropdownList}
						</select>
					</label>
					<input className="button" type="submit" value="Post ressource to Bexio" />				
				</form>
			</div>
		);
	}
}

export default ConfigForm;