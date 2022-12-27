import {createWebHistory, createRouter} from "vue-router";

import routes from './routes'
import appConfig from "../../app.config";
import {publicPath} from '../../vue.config'
import {useSsoStore} from "@/store/modules/sso.store";

const router = createRouter({
    history: createWebHistory(publicPath),
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0, left: 0}
        }
    },
})

// Before each route evaluates...
router.beforeEach(async (routeTo, routeFrom, next) => {
    const ssoStore = useSsoStore()

    const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

    if (!authRequired) return next()
    if (!ssoStore.sesionInactiva) {
        if (routeTo.fullPath.includes('admin')) {
            if (ssoStore.esAdmin || ssoStore.esMaster) {
                next()
            } else {
                next({name: 'default'})
            }
        } else {
            next()
        }
    } else {
        redirectToLogin()
    }

    function redirectToLogin() {
        next({name: 'default'})
    }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {

    try {
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        if (args.length) {
                            next(...args)
                            reject(new Error('Redirected'))
                        } else {
                            resolve()
                        }
                    })
                } else {
                    resolve()
                }
            })
        }
    } catch (error) {
        return
    }

    if (routeTo.name === "PaginaInicial") {
        document.title = routeTo.meta.title;
    } else {
        document.title = routeTo.meta.title + ' | ' + appConfig.title;
    }
    next()
})

export default router
