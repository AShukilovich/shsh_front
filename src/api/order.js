import axios from '@/plugins/axios';

export async function order() {
    try {
        const {data} = await axios.post('/orders/create');

        return data;
    } catch (error) {
        throw error.response.data.errors;
    }
}

export async function getOrder(orderId) {
    try {
        const {data} = await axios.get(`/orders/info?order_id=${orderId}`);

        return data;
    } catch (error) {
        throw error.response.data.errors;
    }
}
