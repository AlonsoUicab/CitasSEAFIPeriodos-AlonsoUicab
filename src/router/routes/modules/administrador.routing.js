import { useSsoStore } from "@/store/modules/sso.store";

export default {
    path     : '/admin',
    component: () => import(/* webpackPrefetch: true */"@/views/modules/admin/components/AdminLayout"),
    meta     : {
        title: 'Administrador',
        async beforeResolve(routeTo, routeFrom, next) {
            const usuarioStore = useSsoStore()
            if (usuarioStore.esAdmin || usuarioStore.esMaster) {
                next();
            } else {
                next({name:'default'});
            }
        },
    },
    children : [
        {
            path     : "calendario",
            name     : "Calendario",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/admin/Calendario.vue"),
            meta     : {
                title: "Calendario",
            },
        },
        {
            path     : "reportes",
            name     : "Reportes",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/admin/Reportes.vue"),
            meta     : {
                title: "Reportes",
            },
        },
    ]
}
