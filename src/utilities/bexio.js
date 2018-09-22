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

const authorizeUrl = 'https://office.bexio.com/oauth/authorize';
const clientID;
const redirectURI = 'http://localhost:3000/';
const state;

const code;
const accessToken;
const accessTokenUrl = 'https://office.bexio.com/oauth/access_token';
const clientSecret;

const organisation = //company identifier
const resource = resource;

const dataUrl = 'https://office.bexio.com/api2.php/'



const Bexio = () => {
	getAccessToken() {
		if (accessToken) {
			return accessToken;
		} 

		//step 1 & 2
		const authorizeEndpoint = `${authorizeUrl}?client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}`;
		window.location = authorizeEndpoint;
		code = window.location.href.match(/code=([^&]*)/);
		
		//step 3 & 4
		return fetch(accessTokenUrl, {
			method: 'post';
			client_id: clientID,
			redirect_uri: redirectURI,
			client_secret: clientSecret,
			code: code
		})	.then(response => return response.json())
			.then(jsonResponse => return accessToken = jsonResponse.access_token)
	},
	getData() {
		let token = Bexio.getAccessToken();
		const dataUrl = 'https://office.bexio.com/api2.php/';
		const organisation = '%org%';
		const resource = 'article';
		const url = `${dataUrl}${organisation}/${resource}`;
		return fetch(url, {
			headers: {
				Accept: application/json,
				Authorization: `Bearer ${token}`
		}
		})	.then(response => return response.json())
			.then(jsonResponse => console.log(jsonResponse))
	};
}