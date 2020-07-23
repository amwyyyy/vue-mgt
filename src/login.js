import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import VueRouter from 'vue-router';
import resource from 'vue-resource';

import Login from './components/Login.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(resource);

var routes = [{
    path: '/',
    component: Login,
}];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    components: {
        App
    }
}).$mount('#app');