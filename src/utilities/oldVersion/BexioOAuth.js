const redirectURI = 'http://localhost:3000/';
let state = '';

const BexioOAuth = {

  makeCodeRequest(clientID) {
    this.goToUrl(clientID).then(this.getCode);
  },

  goToUrl(clientID) {
    console.log('goToUrl is running');
    const authorizeUrl = 'https://office.bexio.com/oauth/authorize';
    state = this.generateState(); //secure random number
    window.location.href = `${authorizeUrl}?client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`;
  },

  getCode() {
    console.log('getCode is running');
    const code = window.location.href.match(/code=([^&]*)/);
    /* const stateReceived = window.location.href.match(/state=([^&]*)/);
    const isState = this.compareState(state, stateReceived);
    return isState ? code : alert('State is not the same. Function terminated'); */
    return code;
  },
  
  generateState(){
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const UintArray = new Uint8Array(40);
    window.crypto.getRandomValues(UintArray);
    const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
    const randomState = String.fromCharCode.apply(null, array);
    return randomState;
  },

  /* compareState(stateSend, stateReceived) {
    return stateSend === stateReceived ? true : false;
  }, */
  
  getAccessToken(clientID, clientSecret) {
    const code = this.makeCodeRequest(clientID);
    const accessTokenUrl = 'https://office.bexio.com/oauth/access_token';
    let accessToken = '';
    fetch(accessTokenUrl, {
      method: 'post',
      client_id: clientID,
      redirect_uri: redirectURI,
      client_secret: clientSecret,
      code: code
    }).then(response => {return response.json()
    }).then(jsonResponse => {accessToken = jsonResponse.access_token
    });
    return accessToken;
  },

  getData(clientID, clientSecret, resources) {
		console.log('getData is currently running', clientID, clientSecret); //for debugging only
		let token = this.getAccessToken(clientID, clientSecret);
		const dataUrl = 'https://office.bexio.com/api2.php/';
		const organisation = '%org%';
		const resource = resources;
		const url = `${dataUrl}${organisation}/${resource}`;
		return fetch(url, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
		}
		}).then(response => {return response.json()
		}).then(jsonResponse => {console.log(jsonResponse)
		});
	}
}

export default BexioOAuth;