import VueRouter from "vue-router";
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve, reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve, reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

const router = new VueRouter({
    routes: [
        {
            path: '/personal',
            name: 'personal',
            component: () => import('../page/personal/personal.vue'),
            meta: { show: true },
            children: [{
                path: 'login',
                name: 'login',
                component: () => import('../page/Login/login.vue'),
                meta: { show: false }
            }, {
                path: 'register',
                name: 'register',
                component: () => import('../page/Login/register.vue'),
                }, {
                path: 'photos',
                name: 'photos',
                component:()=>import('../page/personal/photos.vue')
            }]
        },
        {
            path: '/setup',
            name: 'setup',
            component: () => import('../page/setup/setup.vue'),
            meta: { show: false, update: true },
            children: [{
                path: 'updatepassword',
                name: 'updatepassword',
                component: () => import('../page/Login/updatepassword.vue'),
                meta: { update: false }
            }, {
                path: 'edituserinfo',
                name: 'edituserinfo',
                component: () => import('../page/personal/EditUserInfo.vue'),
                meta:{show:false,edit:true},
                children: [{
                    path: 'sign',
                    name: 'sign',
                    component: () => import("../page/personal/sign.vue"),
                    meta:{show:false}
                }]
            }]
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../page/Home/Home.vue'),
            meta: { show: true },
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('../page/search/search.vue'),
            meta: { show: true },
        },
        {
            path: '*',
            redirect: "/home",
            meta: { show: true },
        },
        {
            path: '/exhibit',
            name: 'exhibit',
            component: () => import('../page/Shopping/exhibit.vue'),
            meta:{productinfo:true},
            children: [{
                path: 'classf',
                name: 'classf',
                component: () => import('../page/Shopping/classF.vue'),
                meta:{productinfo:true},
            }, {
                path: 'shoppinghome',
                name: 'shoppinghome',
                component: () => import('../page/Shopping/ShoppingHome.vue'),
                meta:{productinfo:true},
            },{
                path: 'productinfo/:id?',
                name: 'productinfo',
                component: () => import('../page/Shopping/productinfo.vue'),
                meta:{productinfo:false},
                }, {
                path: 'commodity/:id/:keyword?',
                name: 'commodity',
                component: () => import('../page/Shopping/commdity.vue')
            }]
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
router.beforeEach((to, from, next) => {
    next()
    let name = localStorage.getItem('Token');
    if (to.path == '/personal' && name == null) {
        next({
            name: 'login'
        })
    } else {
        next()
    }
})
export default router