const redirectURI = 'http://localhost:3000/';

const BexioOAuth = {
  getCode = (clientID) => {
    const authorizeUrl = 'https://office.bexio.com/oauth/authorize';
    const state = this.generateState(); //secure random number
    location.href = `${authorizeUrl}?client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`;
    const code = window.location.href.match(/code=([^&]*)/);
    const stateReceived = window.location.href.match(/state=([^&]*)/);
    const isState = this.compareState(state, stateReceived);
    return isState ? code : alert('State is not the same. Function terminated');
  },
  
  generateState = () => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const UintArray = new Uint8Array(40);
    window.crypto.getRandomValues(UintArray);
    const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
    const randomState = String.fromCharCode.apply(null, array);
    return randomState;
  },

  compareState = (stateSend, stateReceived) => {
    return stateSend === stateReceived ? true : false;
  },
  
  getAccessToken = (clientID, clientSecret) => {
    const code = getCode(clientID);
    const accessTokenUrl = 'https://office.bexio.com/oauth/access_token';
    const accessToken = '';
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
  }
}
