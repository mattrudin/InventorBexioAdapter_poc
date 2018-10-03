import React, { Component } from 'react';
import './App.css';
import ConfigForm from './components/ConfigForm/ConfigForm';
import CardContainer from './components/CardContainer/CardContainer';
import { data } from './utilities/oauth';

//TODO: componentDidMount() with prevProps.dataObject and this.props.data 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObject: data
    }
  }
  render() {
    return (
      <div className="App">
        <ConfigForm />
        <CardContainer data={data} />
      </div>
    );
  }
}

export default App;
