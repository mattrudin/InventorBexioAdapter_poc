import React, { Component } from 'react';
import './App.css';
import ConfigForm from './components/ConfigForm/ConfigForm';
import CardContainer from './components/CardContainer/CardContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConfigForm />
        <CardContainer />
      </div>
    );
  }
}

export default App;
