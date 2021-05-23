import {getEvents} from '@/api/event';

export const GET_EVENTS = 'GET_EVENTS';

const state = {
    events: [],
};

const mutations = {
    SET_EVENTS(state, events) {
        state.events = events;
    },
};

const actions = {
    [GET_EVENTS]: async ({commit}) => {
        try {
            commit('SET_PROCESSING', true);

            const data = await getEvents();

            commit('SET_EVENTS', data);

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