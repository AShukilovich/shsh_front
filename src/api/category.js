import axios from '@/plugins/axios';

export async function getCategories() {
	try {
		const { data } = await axios.get('/public/categories/listx');

		return data;
	} catch(error) {
		throw error.response.data.errors;
	}
}
