import axios from '@/plugins/axios';

export async function signup(credentials) {
	try {
		const { data } = await axios.post('/register', {
			...credentials
		});

		return data;
	} catch(error) {
		throw error.response.data.errors;
	}
}

export async function signin(credentials) {
	try {
		const { data } = await axios.post('/token/get', {
			...credentials
		});

		return data;
	} catch(error) {
        throw error.response.data.errors;
	}
}
