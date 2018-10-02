import {JSO} from 'jso';
import { generateState } from './utils';


let accessToken = '';
export let getDataArray = [];
  
export const connectToBexio = (clientID, clientSecret) => {
    let state = generateState();
    
    let config = {
        providerID: "bexio",
        client_id: clientID,
        redirect_uri: "http://localhost:3000/",
        authorization: "https://office.bexio.com/oauth/authorize",
        scopes: { request: ['article_show']},
        request: {state: state},
        response_type: 'code',
        client_secret: clientSecret,
        token: "https://office.bexio.com/oauth/access_token",
        debug: true
    };

    let client = new JSO(config);
    client.callback();
    accessToken = client.getToken()
    //return accessToken;
};

export const getData = (ressource) => {
    const dataUrl = 'https://office.bexio.com/api2.php/';
    const organisation = '%org%';
    const resource = ressource;
    const url = `${dataUrl}${organisation}/${resource}`;
    return fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
    }
    }).then(response => {return response.json()
    }).then(jsonResponse => {getDataArray = [...jsonResponse]
    });
};

export const postData = (ressource) => {

};