import axios from '@/plugins/axios';

export async function getUser() {
    try {
        const { data } = await axios.get('/users/info');

        return data;
    } catch(error) {
        throw error.response;
    }
}
