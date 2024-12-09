import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import NekaRuta from '@/components/NekaRuta.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
}); 