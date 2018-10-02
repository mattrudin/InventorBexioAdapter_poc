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

	componentDidMount() {
		this.timerID = setInterval(
		  () => getCode(),
		  1000
		);
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
				<div className="App">
					<button className="button" onClick={clearStorage}>Clear Storage</button>
					<button className="button" onClick={oauthLogin}>Get Code</button>
					<button className="button" onClick={shortenCode}>Shorten Code</button>
					<button className="button" onClick={getAccessToken}>Get AccessToken</button>
					<button className="button" onClick={getArticles}>Get Articles</button>
				</div>
				<form className="Token" onSubmit={this.handleSubmitToken}>
					<label>
						Client ID:
						<input type="text" value={this.state.client_id} onChange={this.handleIdChange} />
					</label>
					<label>
						Client Secret:
						<input type="text" value={this.state.client_secret} onChange={this.handleSecretChange} />
					</label>
					<input className="button" type="submit" value="Get AccesToken from Bexio" />
				</form>
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