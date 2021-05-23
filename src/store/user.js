import {getUser} from '@/api/user';

export const GET_USER = 'GET_USER';

const state = {
    user: {
        roles: [],
    },
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    FLUSH_USER() {
        state.user = {};
    }
};

const actions = {
    [GET_USER]: async ({commit}) => {
        try {
            commit('SET_PROCESSING', true);

            const user = await getUser();

            commit('SET_USER', user);

            commit('SET_PROCESSING', false);

            return user;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
};

const getters = {
    getRoles: (state) => state.user.roles,
    hasRoles: (state) => (roles) => {
        let rolesArr = roles;

        if(typeof rolesArr !== 'object') {
            rolesArr = [roles];
        }

        return state.user?.roles?.filter((role) => rolesArr.includes(role)).length
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}