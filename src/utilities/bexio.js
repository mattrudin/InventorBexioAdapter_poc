import {JSO, Popup} from 'jso';

const generateState = () => {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const UintArray = new Uint8Array(40);
    window.crypto.getRandomValues(UintArray);
    const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
    const randomState = String.fromCharCode.apply(null, array);
    return randomState;
  }

const state = generateState();

let config = {
    providerID: "bexio",
    client_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    redirect_uri: "http://localhost:3000/", // The URL where you is redirected back, and where you perform run the callback() function.
    authorization: "https://office.bexio.com/oauth/authorize",
    request: {state: state},
    response_type: 'code',
	client_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	token: "https://office.bexio.com/oauth/access_token"
};

let client = new JSO(config);

export const connectToBexio = () => {
    console.log('authorize');
    client.callback();
    console.log('callback initialized');
    let token = client.getToken()
    if (token !== null) {
        console.log("I got the token: ", token)
    }
};