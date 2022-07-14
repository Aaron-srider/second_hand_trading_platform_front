import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index.js';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    // all can view
    {
        path: '/',
        redirect: '/mall',
        component: Layout,
    },

    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true,
    },
    {
        path: '/register',
        component: () => import('@/views/regist/index'),
        hidden: true,
    },
    {
        path: '/noPermit',
        name: 'noPermit',
        component: () => import('@/views/noPermit'),
        meta: { title: 'noPermit', icon: 'table' },
        hidden: true,
    },

    {
        path: '/temp_admin',
        component: Layout,
        meta: { title: 'temp_admin', icon: 'el-icon-s-help' },
        // alwaysShow: true,

        redirect: '/temp_admin/add_goods_pics',
        children: [
            {
                meta: { title: 'add_goods_pics', icon: 'el-icon-s-help' },
                path: 'add_goods_pics',
                name: 'add_goods_pics',
                component: () => import('@/views/temp_admin/index.vue'),
            },
        ],
        hidden: true,
    },

    // all can view
    {
        path: '/mall',
        name: 'mall',
        redirect: '/mall/index',
        meta: { title: '商城', icon: 'mall' },
        alwaysShow: true,
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/mall/index.vue'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '商城首页',
                    icon: 'mall',
                },
            },
            {
                path: 'goodsDetail',
                name: 'goodsDetail',
                component: () => import('@/views/mall/goodsDetail/index.vue'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '商品详情',
                    icon: 'el-icon-s-help',
                },
                hidden: true,
            },
            {
                hidden: true,
                path: 'onlineShopping',
                name: 'onlineShopping',

                component: () => import('@/views/mall/buy/OnlineShopping.vue'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '线上支付',
                    icon: 'el-icon-s-help',
                },
            },
            {
                hidden: true,
                path: 'paySuccess',
                name: 'paySuccess',
                roles: ['normal_user', 'merchant', 'admin'],
                component: () => import('@/views/mall/paySuccess/index.vue'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '支付成功',
                    icon: 'el-icon-s-help',
                },
            },
        ],
    },

    // admin can view
    {
        path: '/check',
        meta: { title: '审批', icon: 'square_check_fill' },
        redirect: '/check/register',
        // alwaysShow: true,
        component: Layout,
        children: [
            {
                path: 'register',
                name: 'check_register',
                component: () => import('@/views/check/register'),
                meta: {
                    roles: ['admin'],
                    title: '注册申请审批',
                    icon: 'add user',
                },
            },
            {
                path: 'storeApp',
                name: 'storeApp',
                component: () => import('@/views/check/storeApp'),
                meta: {
                    roles: ['admin'],
                    title: '商铺申请审批',
                    icon: 'store',
                },
            },

            {
                path: 'goodsPubApp',
                name: 'goodsPubApp',
                component: () => import('@/views/check/goodsPubApp'),
                meta: {
                    roles: ['admin'],
                    title: '商品申请审批',
                    icon: 'icon_goods',
                },
            },

            {
                path: 'goodsDetail',
                name: 'goodsDetail',
                hidden: true,
                component: () =>
                    import('@/views/check/goodsPubApp/goodsDetail'),
                meta: {
                    roles: ['admin'],
                    title: '商品详情',
                    icon: 'el-icon-s-help',
                },
            },
        ],
    },

    // all can view
    {
        path: '/myInfo',
        component: Layout,
        redirect: '/myInfo/shoppingHistory',
        name: 'myInfo',
        meta: { title: '我的信息', icon: 'user-filling' },
        alwaysShow: true,
        children: [
            {
                path: 'basic',
                name: 'basic',
                component: () => import('@/views/myInfo/basic/index'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '基本信息',
                    icon: 'basic',
                },
            },
            {
                path: 'shoppingHistory',
                name: 'shoppingHistory',
                component: () => import('@/views/myInfo/shoppingHistory/index'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '我的订单',
                    icon: 'order',
                },
            },
            {
                path: 'wallet',
                name: 'wallet',
                component: () => import('@/views/myInfo/wallet/index'),
                meta: {
                    roles: ['normal_user', 'merchant', 'admin'],
                    title: '我的钱包',
                    icon: 'wallet',
                },
            },
        ],
    },

    // admin merchant can view
    {
        path: '/store',
        name: 'store',
        alwaysShow: true,
        component: Layout,
        redirect: '/store/index',

        meta: { title: '店铺管理', icon: 'store' },
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/store/index'),
                meta: {
                    roles: ['merchant', 'admin'],
                    title: '我的店铺',
                    icon: 'store',
                },
            },

            {
                path: 'goodsDetail',
                name: 'goodsDetail',
                component: () => import('@/views/store/goodsDetail'),
                meta: {
                    roles: ['merchant', 'admin'],
                    title: '商品详情',
                    icon: 'table',
                },
                hidden: true,
            },

            {
                path: 'shipGoods',
                name: 'shipGoods',
                component: () => import('@/views/store/shipGoods'),
                meta: {
                    roles: ['merchant', 'admin'],
                    title: '发货管理',
                    icon: 'shipping',
                },
            },
        ],
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
    new Router({
        mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes,
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
