import React from 'react';
import './ConfigForm.css';
import ConfigFormInput from '../ConfigFormInput/ConfigFormInput';
import { resources } from './resources';

class ConfigForm extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			resources: { value: 'article'}
		};
	}

	render() {

		const dropdownList = resources.map(item => {
			return <option value={item}>{item}</option>
		})

		return(
			<form onSubmit={this.handleSubmit}>
       			<ConfigFormInput title="Client ID" />
       			<ConfigFormInput title="Client Secret" />
       			<select value={this.state.value} onChange={this.handleChange}>
       				{dropdownList}
          		</select>
        	<input type="submit" value="Submit" />
      		</form>
		);
	}
}

export default ConfigForm;