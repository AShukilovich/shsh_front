import axios from '@/plugins/axios';

export async function getProducts(categoryId) {
    try {
        const {data} = await axios.get(`/public/items/list?category_id=${categoryId}`);

        return data;
    } catch (error) {
        throw error.response.data.errors;
    }
}

export async function getPrice(itemId, time) {
    try {
        const {timeFrom, timeTo} = time;

        const query = `?item_id=${itemId}&time_from=${timeFrom}&time_to=${timeTo}`;

        const {data} = await axios.get(`/public/items/getprice${query}`);

        return data.price;
    } catch (error) {
        throw error.response.data.errors;
    }
}
