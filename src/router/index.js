import Vue from 'vue'
import VueRouter from 'vue-router'
import Loginandsignup from '../components/Loginandsignup'
import Menu__library from '../views/Menu_library'
import Add_delete from "../components/Add_delete";
import firebase from "firebase";
import PageNotFound from "../components/PageNotFound"


Vue.use(VueRouter)

const routes = [
    {
        path: '/login-singup',
        name: 'Loginandsignup',
        component: Loginandsignup
    },
    {
        path: '/add-delete',
        name: 'Add_delete',
        component: Add_delete
    },
    {
        path: '*',
        name: 'PageNotFound',
        component: PageNotFound
    },
    {
        path: '/',
        name: 'Menu_library',
        meta: {
            requiresAuth: true
        },
        component: Menu__library
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
        if (to.matched.some(rec => rec.meta.requiresAuth)) {
            let user = firebase.auth().currentUser;
            let local = localStorage.getItem("user")

            if (local) {
                next()
            } else {
                next({name: "Loginandsignup"})
            }
        } else {
            next()
        }
    }
)

export default router
