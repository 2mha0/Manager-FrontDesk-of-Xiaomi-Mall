import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },

                {
                    path: '/users',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/users.vue'),
                    meta: { title: '会员管理' }
                },
                {
                    path: '/goodUpd',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/GoodUpd.vue'),
                    meta: { title: '商品上下架' }
                },
                {
                    path: '/goodCato',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/GoodCategory.vue'),
                    meta: { title: '商品分类' }
                },
                {
                    path: '/goodpic',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/GoodPic.vue'),
                    meta: { title: '商品图片' }
                },


                {
                    path: '/suggest',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Suggest.vue'),
                    meta: { title: '底部推荐栏' }
                },
                {
                    path: '/suggestbig',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/SuggestBig.vue'),
                    meta: { title: '大类推荐栏' }
                },



                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },

                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: '用户数据统计图表' }
                },

                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '项目人员构成' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
