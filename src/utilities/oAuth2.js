const requestUrl = 'https://office.bexio.com/oauth/authorize';
const ClientOAuth2 = require('client-oauth2')
const clientId = //client id
const redirectUri = 'http://localhost:3000/';
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

const getAuthenticationUrl = () => {

};

const getAccessToken = () => {

};