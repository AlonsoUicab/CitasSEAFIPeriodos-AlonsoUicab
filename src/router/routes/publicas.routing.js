import { useSsoStore } from "@/store/modules/sso.store";

export default {
    path     : "/public",
    name     : 'public',
    component: () => import(/* webpackPrefetch: true */"@/layouts/PublicLayout"),
    children : [
        {
            path     : "/login",
            name     : "login",
            component: () => import(/* webpackPrefetch: true */"@/views/sso/IniciarSesion.vue"),
            meta     : {
                title: "Iniciar Sesión",
                beforeResolve(routeTo, routeFrom, next) {
                    const ssoStore = useSsoStore()
                    if (!ssoStore.sesionInactiva) {
                        next({name: "default"});
                    } else {
                        next();
                    }
                },
            },
        },
        {
            path     : "/logout",
            name     : "logout",
            component: () => import(/* webpackPrefetch: true */"@/views/sso/CerrarSesion"),
            meta     : {
                title: "Sesión Cerrada",
                beforeResolve(routeTo, routeFrom, next) {
                    const ssoStore = useSsoStore()
                    if (ssoStore.sesionInactiva) {
                        next({name: "default"});
                    } else {
                        next();
                    }
                },
            },
        },
    ]
}
