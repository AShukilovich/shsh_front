import {getCategories} from '@/api/category';

export const GET_CATEGORIES = 'GET_CATEGORIES';

const state = {
    categories: [],
};

const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
};

const actions = {
    [GET_CATEGORIES]: async ({commit}) => {
        try {
            commit('SET_PROCESSING', true);

            const categories = await getCategories();

            commit('SET_CATEGORIES', categories);

            commit('SET_PROCESSING', false);

            return categories;
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