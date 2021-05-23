import axios from '@/plugins/axios';

export async function addToCart(item) {
    try {
        const { data } = await axios.post('/basket/add', { ...item });

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}

export async function deleteInCart(id) {
    try {
        const { data } = await axios.delete(`/points/delete?id=${id}`);

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}

export async function getCart() {
    try {
        const { data } = await axios.get('/basket/list');

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}
