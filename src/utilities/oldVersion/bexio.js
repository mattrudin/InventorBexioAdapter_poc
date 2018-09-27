//1. Request access to the bexio account
//		requires
//			clientID
//			redirectURI
//			state			
//2. bexio redirects the user to the authorization page
//		look for the acces token with:
//		const code = window.location.href.match(/code=([^&]*)/)
//3. Request an access token
//		requires
//			clientID
//			redirectURI
//			clientSecret
//			code
//4. Receive the access token
//		receive a json object with "acces_token"
//5. Call any resource
//		see getData

let accessToken = '';
const authorizeUrl = 'https://office.bexio.com/oauth/authorize';
const redirectURI = 'http://localhost:3000/';
const state = '';

const accessTokenUrl = 'https://office.bexio.com/oauth/access_token';

//const organisation = //company identifier
const resource = resource;

const dataUrl = 'https://office.bexio.com/api2.php/';



const Bexio = {
	getAccessToken(clientID, clientSecret) {
		console.log('getAccessToken is currently running');
		if (accessToken) {
			return accessToken;
		} 
		//step 1 & 2: get Code
		const code = window.location.href.match(/code=([^&]*)/);
		const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
		if(code && expiresIn) {
			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Code', null, '/');
			console.log('got code')
			return code;
		} else {
			console.log('go to authorizeurl')
			window.location = `${authorizeUrl}?client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`
		}
		//step 3 & 4: get AccessToken
		return fetch(accessTokenUrl, {
			method: 'post',
			client_id: clientID,
			redirect_uri: redirectURI,
			client_secret: clientSecret,
			code: code
		}).then(response => {return response.json()
		}).then(jsonResponse => {return accessToken = jsonResponse.access_token
		});
	},

	getData(clientID, clientSecret, resources) {
		console.log('getData is currently running', clientID, clientSecret);
		let token = Bexio.getAccessToken(clientID, clientSecret);
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

export default Bexio;