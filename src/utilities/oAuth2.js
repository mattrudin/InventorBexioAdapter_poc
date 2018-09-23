import ClientOAuth2 from 'client-oauth2'; 
import express from 'express';

//Configuration
const bexioAuth = new ClientOAuth2({
  clientId: 'abc',
  clientSecret: '123',
  accessTokenUri: 'https://office.bexio.com/oauth/access_token',
  authorizationUri: 'https://office.bexio.com/oauth/authorize',
  redirectUri: 'http://localhost:3000/', //oder requestb.in
  state: 'abc123'
})

//Authorization Code Grant
const app = express()

app.get('/auth/bexio', function (req, res) {
  const uri = bexioAuth.code.getUri()
  res.redirect(uri)
})

app.get('/auth/bexio/callback', function (req, res) {
  githubAuth.code.getToken(req.originalUrl)
    .then(function (user) {
      console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }

      // Refresh the current users access token.
      user.refresh().then(function (updatedUser) {
        console.log(updatedUser !== user) //=> true
        console.log(updatedUser.accessToken)
      })

      // Sign API requests on behalf of the current user.
      user.sign({
        method: 'get',
        url: 'http://example.com'
      })

      // We should store the token into a database.
      return res.send(user.accessToken)
    })
})