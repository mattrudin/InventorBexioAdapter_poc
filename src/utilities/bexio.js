import {JSO} from 'jso';

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
    client_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    redirect_uri: "http://localhost:3000/",
    authorization: "https://office.bexio.com/oauth/authorize",
    scopes: { request: ['article_show']},
    request: {state: state},
    response_type: 'code',
	client_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    token: "https://office.bexio.com/oauth/access_token",
    debug: true
};

let client = new JSO(config);

export const connectToBexio = () => {
    client.callback();
    let token = client.getToken()
    return token;
};