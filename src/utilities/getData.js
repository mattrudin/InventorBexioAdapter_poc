//5. Call any resource
//method: 'GET'
//resource: 'article'

const getDate = (method, resource, accesToken) => {
	const baseUrl = 'https://office.bexio.com/api2.php/';
	const organisation = //company identifier
	const resource = resource;
	const url = `${baseUrl}${organisation}/${resource}`;
	let token = accesToken//token from oAuth2.js
	const parameter = {
		headers: {
			Accept: application/json
			Authorization: `Bearer ${token}` //Acces token received from bexio
		},
		method: method
	};
	fetch(url, parameter)
	.then(response => return response.json())
	.then(jsonResponse => console.log(jsonResponse))
};