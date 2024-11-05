import axios from 'axios';

const api = axios.create({
	baseURL: 'http://fazendaurbana.ddns.net/v1/api',
	headers: {
		'Content-Type': 'application/json',
	},
});


export default api;