import {JSO} from 'jso';
let clientID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
let clientSecret = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
export let data = [];

export const getCode = () => {
    let accessCode = '';
    if(!accessCode) {
        accessCode = window.location.href.match(/code=([^&]*)/);
        localStorage.setItem('codeLong', accessCode);
    } else {
        return
    }
    return accessCode;
}

//Plan of acction for method "Get access data from Bexio"
//0. Wraper function for step 1 to 5
//1. set clientID and clientSecret in this file with a function in ConfigForm.js
//2. clearStorage
//3. oauthLogin
//4. shortenCode
//5. getAccessToken
//6. setState with new data

//7. getData, transfer the data to Card.js
//8. postData with uploaded file from user

export async function loginFunction(clientIDinput, clientSecretinput) {
    setLoginData(clientIDinput, clientSecretinput);
    clearStorage();
    await oauthLogin();
    getCode();
    shortenCode();
    await getAccessToken();
    alert('Async function complete');
}


export const setLoginData = (clientIDinput, clientSecretinput) => {
    clientID = clientIDinput;
    clientSecret = clientSecretinput;
}

export const clearStorage = () => {
    localStorage.clear();
}


export const oauthLogin = () => {
    let jso = new JSO({
        providerID: "bexio",
        client_id: clientID,
        redirect_uri: "http://localhost:3000/",
        authorization: "https://office.bexio.com/oauth/authorize/",
        scopes: { request: ["article_show"]},
        response_type: 'code',
        client_secret: clientSecret,
        token: "https://office.bexio.com/oauth/access_token/",
        request: { state: '1234567890'}
    });
    jso.getToken();
}

export const shortenCode = () => {
    const codeLong = localStorage.getItem('codeLong');
    const codeShort = codeLong.match("code=(.*),");
    localStorage.setItem('code', codeShort[1]);
}

export const getAccessToken = () => {
    
    //no 'access-control-allow-origin' header is present on the requested resource.

    let http = new XMLHttpRequest();
    const url = 'https://office.bexio.com/oauth/access_token/';
    const redirect_uri = 'http://localhost:3000/';
    const code = localStorage.getItem('code');

    const params = `client_id=${clientID}&redirect_uri=${redirect_uri}&client_secret=${clientSecret}&code=${code}`;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            const json = JSON.parse(http.responseText);
            const accessToken = json.access_token;
            const organisation = json.org;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('org', organisation);
            alert('got accessToken');
        }
    }
    http.send(params);
}



//Retriev data from ressources

export const getArticles = () => {
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/'
    const organisation = localStorage.getItem('org');
    const accessToken = localStorage.getItem('access_token')
    const url = `${baseUrl}${organisation}/article`;
    http.open( "GET", url, true );
    http.setRequestHeader("Accept",'application/json');
    http.setRequestHeader("Authorization",`Bearer ${accessToken}`);

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            let articles = JSON.parse(http.responseText);
            data = [...articles]; 
            console.log(articles);
        }
    }

    http.send();
}

export const sendData = () => {
    return data;
}