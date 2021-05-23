const state = {
    debug: false,
    processing: false,
    pageLoaded: false,
    alert: {
        type: '', //info, success, error
        message: '',
    },
};

const mutations = {
    SET_DEBUG(state, debug) {
        state.debug = debug;
    },
    SET_PROCESSING(state, processing) {
        state.processing = processing;
    },
    SET_ALERT(state, {type, message}) {
        if (message) {
            state.alert = {type: (type ?? 'info'), message};
        } else {
            state.alert = {message: ''};
        }
    },
};

const actions = {};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}