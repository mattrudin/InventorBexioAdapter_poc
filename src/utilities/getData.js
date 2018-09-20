//method: 'GET'
//resource: 'article'

const getDate = (method, resource) => {
	const baseUrl = 'https://office.bexio.com/api2.php/';
	const organisation = //company identifier
	const resource = resource;
	const url = `${baseUrl}${organisation}/${resource}`
	const parameter = {
		headers: {
			Accept: application/json
			Authorization: Bearer %access_token% //%access_token% = Acces token received from bexio
		},
		method: method
	};
	fetch(url, parameter)
	.then(response => return response.json())
	.then(jsonResponse => console.log(jsonResponse))
};