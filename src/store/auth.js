import {signup, signin} from '@/api/auth';
import axios from '@/plugins/axios';
import router from '@/routes';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';

const state = {
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
    rememberMe: false
};

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
        if (state.rememberMe) {
            localStorage.setItem('token', token ?? '');
        } else {
            sessionStorage.setItem('token', token ?? '');
        }

        axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : '';
    },
    UNSET_USER(state) {
        state.token = '';
        if (state.rememberMe) {
            localStorage.removeItem('token');
        } else {
            sessionStorage.removeItem('token');
        }
        axios.defaults.headers.common['Authorization'] = '';
    },
    REMEMBER_ME(state) {
        state.rememberMe = true;
    }
};

const actions = {
    [SIGNUP]: async ({commit}, credentials) => {
        try {
            commit('SET_PROCESSING', true);

            const data = await signup(credentials);

            if(data.data.token) {
                commit('SET_TOKEN', data.data.token);
            }

            commit('SET_PROCESSING', false);

            return data;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [SIGNIN]: async ({commit}, credentials) => {
        try {
            commit('SET_PROCESSING', true);

            const data = await signin(credentials);

            commit('SET_TOKEN', data.token);

            commit('SET_PROCESSING', false);

            return data;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [SIGNOUT]: async ({commit}) => {
        commit('UNSET_USER');

        router.push({name: 'signin'});
    }
};

const getters = {
    isAuthenticated: (state) => !!state.token,
};

export default {
    state,
    mutations,
    actions,
    getters
}