import Vue from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    created() {
        //debug flag
        if( this.$route.query.debug ) {
            store.commit('SET_DEBUG', true);
        }
    }
}).$mount('#app');
