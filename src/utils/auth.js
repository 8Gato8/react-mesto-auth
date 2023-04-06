export const BASE_URL = 'https://auth.nomoreparties.co';

async function makeRequest(url, method, body, token) {

	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	if (token !== undefined) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const config = {
		method,
		headers
	}

	if (body !== undefined) {
		config.body = JSON.stringify(body);
	}

	const response = await fetch(`${BASE_URL}${url}`, config);

	return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
}

export function register(password, email) {
	return makeRequest('/signup', 'POST', { password, email });
}

export function authorize(password, email) {
	return makeRequest('/signin', 'POST', { password, email });
}

export function checkToken(token) {
	return makeRequest('/users/me', 'GET', undefined, token);
}