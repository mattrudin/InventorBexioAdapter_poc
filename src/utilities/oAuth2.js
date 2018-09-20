//4. Receive the access token

const redirectUri = 'http://localhost:3000/';
const clientId = //clientID
const state = //state

const ClientOAuth2 = require('client-oauth2')
const auth0-authorize = //string
const encodedString = btoa(auth0-authorize);
//use the string as state parameter
const decodedString = atoa(encodedString);

//https://docs.bexio.com/oauth/oauth/
const bexioAuth = new ClientOAuth2({
  clientId: clientId,
  redirectUri: redirectUri,
  state: encodedString
})

//1. Request access to the bexio account
const getAuthenticationUrl = (clientID, redirectUri, state) => {
	const authEndpoint = 'https://office.bexio.com/oauth/authorize';
	return `${authEndpoint}?${clientID}&${redirectUri}&${state}`;
};
//2. bexio redirects the user to the authorization page

//3. Request an access token
const getAccessToken = () => {

};
//5. Call any resource-->getData.js