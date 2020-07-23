import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import resource from 'vue-resource';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import NProgress from 'nprogress'; //页面顶部进度条
import 'nprogress/nprogress.css';

import util from './common/util';
import store from './vuex/store';

import App from './App';
import Home from './components/Home.vue';


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(resource);

NProgress.start();

util.get("/module/menus", null, result => {
    var routes = [{
        path: '/',
        redirect: '/main',
        component: Home,
        name: '首页',
        hidden: true,
        children: [{
            path: '/main',
            name: '首页',
            component: require('./components/Main.vue')
        }]
    }];

    if (result.errCode === 0) {
        var routeArr = loadMenu(0, result.data);
        routeArr.forEach(route => {
            routes.push(route);
        });
    } else {
        this.$message.error(result.msg);
    }

    const router = new VueRouter({
        routes
    })

    router.beforeEach((to, from, next) => {
        NProgress.start();
        next();
    })

    router.afterEach(transition => {
        NProgress.done();
    });

    const app = new Vue({
        el: '#app',
        template: '<App/>',
        router,
        store,
        components: {
            App
        }
    }).$mount('#app')
});

//加载菜单
function loadMenu(pid, datas) {
    var menus = [];
    datas.forEach(data => {
        if (data.pid === pid) {
            var menu = {};
            if (data.pid === 0) {
                menu.path = '/';
                menu.component = Home;
            } else {
                menu.path = data.path;
                menu.component = require('./components' + data.component);
            }
            menu.name = data.name;
            menu.iconCls = data.iconCls;
            menu.children = loadMenu(data.id, datas);
            menus.push(menu);
        }
    });
    return menus;
}