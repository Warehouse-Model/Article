import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('../view/Login.vue'),
        },
        {
            path: '/home',
            component: () => import('../view/Home.vue'),
            meta: { isAuth: true },
            redirect: '/welcome',
            children: [{
                path: '/welcome',
                component: () => import('../view/Welcome.vue')
            },
            {
                path: 'update',
                component: () => import('../view/Update.vue')
            },
            {
                path: 'reset',
                component: () => import('../view/Reset.vue')
            }, {
                path: 'category',
                component: () => import('../view/Category.vue')
            }]
        },
        {
            path: '*',
            component: () => import('../view/404.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (sessionStorage.getItem('token')) {
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router