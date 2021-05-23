import {order, getOrder} from '@/api/order';

export const ORDER = 'ORDER';
export const GET_ORDER = 'GET_ORDER';

const state = {
    order: {},
};

const mutations = {
    SET_ORDER(state, order) {
        state.order = order;
    },
};

const actions = {
    [ORDER]: async ({commit}) => {
        try {
            commit('SET_PROCESSING', true);

            const data = await order();

            commit('SET_ORDER', data);

            commit('SET_PROCESSING', false);

            return data;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [GET_ORDER]: async ({commit}, orderId) => {
        try {
            commit('SET_PROCESSING', true);

            const data = await getOrder(orderId);

            commit('SET_ORDER', data);

            commit('SET_PROCESSING', false);

            return data;
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