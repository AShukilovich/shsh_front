import {getProducts, getPrice} from '@/api/products';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRICE = 'GET_PRICE';

const state = {
    products: [],
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
};

const actions = {
    [GET_PRODUCTS]: async ({commit}, categoryId) => {
        try {
            commit('SET_PROCESSING', true);

            const { data } = await getProducts(categoryId);

            commit('SET_PRODUCTS', data);

            commit('SET_PROCESSING', false);

            return data;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [GET_PRICE]: async ({commit}, {itemId, time}) => {
        try {
            const price = await getPrice(itemId, time);

            return price;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}