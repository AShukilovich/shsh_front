import Vue from 'vue';
import Vuex from 'vuex';
import general from '@/store/general';
import auth from '@/store/auth';
import category from '@/store/category';
import products from '@/store/products';
import user from '@/store/user';
import points from '@/store/points';
import cart from '@/store/cart';
import event from '@/store/event';
import order from '@/store/order';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        general,
        auth,
        category,
        products,
        user,
        points,
        cart,
        event,
        order,
    },
    state: {

    },
    mutations: {

    },
    actions: {

    }
})
