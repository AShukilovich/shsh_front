import {getPoints, addPoint, deletePoint, updatePoint} from '@/api/points';

export const GET_POINTS = 'GET_POINTS';
export const ADD_POINT = 'ADD_POINT';
export const DELETE_POINT = 'DELETE_POINT';
export const UPDATE_POINT = 'UPDATE_POINT';

const state = {
    allPoints: [],
    userPoints: [],
    fields: [],
};

const mutations = {
    SET_ALL_POINTS(state, points) {
        state.allPoints = points;
    },
    SET_USER_POINTS(state, points) {
        state.userPoints = points;
    },
    PUSH_USER_POINT(state, point) {
        state.userPoints = [...state.userPoints, point];
    },
    UPDATE_USER_POINT(state, point) {
        state.userPoints = state.userPoints.map((p) => p.id == point.id ? point : p);
    },
    DELETE_USER_POINT(state, pointId) {
        state.userPoints = state.userPoints.filter((p) => p.id !== pointId);
    },
    SET_POINT_FIELDS(state, fields) {
        state.fields = fields;
    },
};

const actions = {
    [GET_POINTS]: async ({commit}, userId) => {
        try {
            commit('SET_PROCESSING', true);

            const points = await getPoints(userId);

            if (userId) {
                commit('SET_USER_POINTS', points);
            } else{
                commit('SET_ALL_POINTS', points);
            }

            commit('SET_PROCESSING', false);

            return points;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [ADD_POINT]: async ({commit}, point) => {
        try {
            commit('SET_PROCESSING', true);

            const newPoint = await addPoint(point);

            commit('PUSH_USER_POINT', newPoint);

            commit('SET_PROCESSING', false);

            return point;
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [DELETE_POINT]: async ({commit}, pointId) => {
        try {
            commit('SET_PROCESSING', true);

            await deletePoint(pointId);

            commit('DELETE_USER_POINT', pointId);

            commit('SET_PROCESSING', false);
        } catch (error) {
            commit('SET_PROCESSING', false);

            throw error;
        }
    },
    [UPDATE_POINT]: async ({commit}, point) => {
        try {
            commit('SET_PROCESSING', true);

            const updatedPoint = await updatePoint(point);

            commit('UPDATE_USER_POINT', updatedPoint);

            commit('SET_PROCESSING', false);

            return updatedPoint;
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