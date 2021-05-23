import axios from '@/plugins/axios';

export async function getEvents() {
    try {
        const {data} = await axios.get('/public/event/list');

        return data;
    } catch (error) {
        throw error.response.data.errors;
    }
}
