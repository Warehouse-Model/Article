import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router= new VueRouter({
    routes:[
        {
            path:'/',
            component:()=>import('../view/Login.vue')
        },
        {
            path:'*',
            component:()=>import('../view/404.vue')
        }
    ]
})

export default router