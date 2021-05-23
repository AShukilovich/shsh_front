import {getCart, addToCart, deleteInCart} from '@/api/cart';

export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_IN_CART = 'DELETE_IN_CART';

const state = {
    cart: [],
};

const mutations = {
    SET_CART(state, cart) {
        state.cart = cart;
    },
};

const actions = {
    [GET_CART]: async ({commit}) => {
        try {
            commit('SET_PROCESSING', true);

            const cart = await getCart();

            commit('SET_CART', cart);

            commit('SET_PROCESSING', false);

            return cart;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [ADD_TO_CART]: async ({commit}, item) => {
        try {
            commit('SET_PROCESSING', true);

            const cart = await addToCart(item);

            commit('SET_CART', cart);

            commit('SET_PROCESSING', false);

            return cart;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [DELETE_IN_CART]: async ({commit}, cartId) => {
        try {
            commit('SET_PROCESSING', true);

            const cart = await deleteInCart(cartId);

            commit('SET_CART', cart);

            commit('SET_PROCESSING', false);
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