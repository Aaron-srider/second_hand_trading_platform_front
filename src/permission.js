import router, { resetRouter } from './router';
import { constantRoutes } from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import { getRouterParams } from './utils';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.afterEach((to, from, failure) => {
    // localStorage.setItem('routerParams', JSON.stringify({}));
});

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // set page title
    document.title = getPageTitle(to.meta.title);

    function renderRoutes(constantRoutes, store) {
        for (let route of constantRoutes) {
            console.log('process route:', route.path);
            if (route.hidden !== undefined) {
            } else {
                if (route.meta && route.meta.roles) {
                    let roles = route.meta.roles;
                    if (store.state.user.userInfo) {
                        let roleNames = store.state.user.userInfo.roleNames;
                        let permit = false;
                        for (let roleName of roleNames) {
                            if (roles.includes(roleName)) {
                                permit = true;
                                break;
                            }
                        }

                        route.hidden = !permit;

                        if (route.hidden) {
                            console.log('hidden route:', route.path);
                        }
                    }
                }
            }

            if (route.children && route.children.length > 0) {
                renderRoutes(route.children, store);
                let anyShow = false;
                for (let ch of route.children) {
                    if (ch.hidden === undefined) {
                        anyShow = true;
                        break;
                    }

                    if (ch.hidden == false) {
                        anyShow = true;
                        break;
                    }
                }
                if (anyShow == false) {
                    route.hidden = true;
                }
            }
        }
    }

    renderRoutes(constantRoutes, store);

    if (Object.keys(to.params).length > 0) {
        localStorage.setItem('routerParams', JSON.stringify(to.params));
    }
    console.log('get into gard, route to:', to.path);

    if (to.path == '/login') {
        next();
        console.log('to login');
        return;
    }

    if (to.path == '/register') {
        next();
        console.log('to register');

        return;
    }

    if (to.path == '/noPermit') {
        next();
        console.log('to noPermit');

        return;
    }

    // if (to.path == '/mall') {
    //     next();
    //     return;
    // }

    // check login
    let userId = store.state.user.userId;
    let userInfo = store.state.user.userInfo;
    if (!(userId && userInfo) && to.path == '/mall/index') {
        next();
        return;
    }

    if (!(userId && userInfo)) {
        next('/login');
        console.log('need login');
        return;
    }

    // check role
    if (!to.meta.roles) {
        next();
        console.log('pass');
        return;
    }
    let roleNames = userInfo.roleNames;
    let permit = false;
    for (let roleName of roleNames) {
        if (to.meta.roles.includes(roleName)) {
            permit = true;
            break;
        }
    }
    if (!permit) {
        next('/noPermit');
        console.log('noPermit');
        return;
    }

    // all checked, pass
    next();
    console.log('pass');
    NProgress.done();

    // // determine whether the user has logged in
    // const hasToken = getToken();

    // if (hasToken) {
    //     if (to.path === "/login") {
    //         // if is logged in, redirect to the home page
    //         next({ path: "/" });
    //         NProgress.done();
    //     } else {
    //         const hasGetUserInfo = store.getters.name;
    //         if (hasGetUserInfo) {
    //             next();
    //         } else {
    //             try {
    //                 // get user info
    //                 await store.dispatch("user/getInfo");

    //                 next();
    //             } catch (error) {
    //                 // remove token and go to login page to re-login
    //                 await store.dispatch("user/resetToken");
    //                 Message.error(error || "Has Error");
    //                 next(`/login?redirect=${to.path}`);
    //                 NProgress.done();
    //             }
    //         }
    //     }
    // } else {
    //     /* has no token*/

    //     if (whiteList.indexOf(to.path) !== -1) {
    //         // in the free login whitelist, go directly
    //         next();
    //     } else {
    //         // other pages that do not have permission to access are redirected to the login page.
    //         next(`/login?redirect=${to.path}`);
    //         NProgress.done();
    //     }
    // }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
