import axios from '@/plugins/axios';

export async function addPoint(point) {
    try {
        const { data } = await axios.post('/points/create', { ...point });

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}

export async function deletePoint(id) {
    try {
        const { data } = await axios.delete(`/points/delete?id=${id}`);

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}

export async function getPoints(userId) {
    try {
        let query = '';

        if(userId) {
            query = `?user_id=${userId}`;
        }

        const { data } = await axios.get(`/public/points/list${query}`);

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}

export async function updatePoint(point) {
    try {
        const { data } = await axios.post('/points/update', { ...point });

        return data;
    } catch(error) {
        throw error.response.data.errors;
    }
}