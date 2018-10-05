import React, { Component } from 'react';
import './App.css';
import { JSO } from 'jso';
import ConfigForm from './components/ConfigForm/ConfigForm';
import CardContainer from './components/CardContainer/CardContainer';
//import { data, sendData } from './utilities/oauth';

//TODO: componentDidMount() with prevProps.dataObject and this.props.data 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      clientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      dataArray: [],
      gotData: false
    };
    this.oauthLogin = this.oauthLogin.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.getTimesheet = this.getTimesheet.bind(this);
  }

  componentDidMount() {
		this.timerID = setInterval(
		  () => this.getCode(),
		  1000
		);
	}

  getCode() {
    let accessCode = '';
    if(!accessCode) {
        accessCode = window.location.href.match(/code=([^&]*)/);
        localStorage.setItem('codeLong', accessCode);
    } else {
        return
    }
    return accessCode;
  }

  clearStorage() {
    localStorage.clear();
  }

  oauthLogin() {
    let jso = new JSO({
        providerID: "bexio",
        client_id: this.state.clientID,
        redirect_uri: "http://localhost:3000/",
        authorization: "https://office.bexio.com/oauth/authorize/",
        scopes: { request: ["article_show", "monitoring_show"]},
        response_type: 'code',
        client_secret: this.state.clientSecret,
        token: "https://office.bexio.com/oauth/access_token/",
        request: { state: '1234567890'}
    });
    jso.getToken();
  }

  shortenCode = () => {
    const codeLong = localStorage.getItem('codeLong');
    const codeShort = codeLong.match("code=(.*),");
    localStorage.setItem('code', codeShort[1]);
  }

  getAccessToken = () => {
    
    //no 'access-control-allow-origin' header is present on the requested resource.

    let http = new XMLHttpRequest();
    const url = 'https://office.bexio.com/oauth/access_token/';
    const redirect_uri = 'http://localhost:3000/';
    const code = localStorage.getItem('code');

    const params = `client_id=${this.state.clientID}&redirect_uri=${redirect_uri}&client_secret=${this.state.clientSecret}&code=${code}`;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            const json = JSON.parse(http.responseText);
            const accessToken = json.access_token;
            const organisation = json.org;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('org', organisation);
            alert('got accessToken');
        }
    }
    http.send(params);
  }



//Retriev data from ressources

  getArticles = () => {
    let data = [];
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/'
    const organisation = localStorage.getItem('org');
    const accessToken = localStorage.getItem('access_token')
    const url = `${baseUrl}${organisation}/article`;
    http.open( "GET", url, true );
    http.setRequestHeader("Accept",'application/json');
    http.setRequestHeader("Authorization",`Bearer ${accessToken}`);

    http.onreadystatechange = function() {
      if(http.readyState === 4 && http.status === 200) {
          let articles = JSON.parse(http.responseText);
          data = [...articles]; 
          console.log(articles);
        }
      }
        
    http.send();
  }

  getTimesheet = () => {
    let data = [];
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/'
    const organisation = localStorage.getItem('org');
    const accessToken = localStorage.getItem('access_token')
    const url = `${baseUrl}${organisation}/timesheet`;
    http.open( "GET", url, true );
    http.setRequestHeader("Accept",'application/json');
    http.setRequestHeader("Authorization",`Bearer ${accessToken}`);

    http.onreadystatechange = function() {
      if(http.readyState === 4 && http.status === 200) {
          let articles = JSON.parse(http.responseText);
          data = [...articles]; 
          console.log(articles);
        }
      }
        
    http.send();
  }



  render() {
    return (
      <div className="App">
        {/* <ConfigForm /> */}
        {/* <CardContainer /> */}
        <button className="button" onClick={this.clearStorage}>Clear Storage</button>
        <button className="button" onClick={this.oauthLogin}>Get Code</button>
        <button className="button" onClick={this.shortenCode}>Shorten Code</button>
        <button className="button" onClick={this.getAccessToken}>Get AccessToken</button>
        <button className="button" onClick={this.getArticles}>Get Articles</button>
        <button className="button" onClick={this.getTimesheet}>Get Timesheets</button>
        <p>{this.state.gotData ? this.state.dataArray.join(': ') : 'No Data'}</p>
      </div>
    );
  }
}

export default App;
