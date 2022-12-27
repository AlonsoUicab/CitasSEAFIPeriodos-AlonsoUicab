import {useSsoStore} from "@/store/modules/sso.store";

export default {
    path :"/recepcion",
    meta:{
        tittle:"Recepcion",
        async beforeResolve(routeTo, routeFrom, next) {
            const usuarioStore = useSsoStore()
            if (usuarioStore.esRecep || usuarioStore.esMaster) {
                next();
            } else {
                next({name: 'default'});
            }
        }
    },
    children: [
        {
            path     : "", // http://url/recepcion/
            name     : "recepcion",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/reception/Recepcion.vue"),
            meta     : {
                title: "Recepcion",
            },
        },
        {
            path     : "cita", // http://url/recepcion/cita
            name     : "cita",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/reception/VerCita.vue"),
            meta     : {
                title: "Recepcion Cita",
            },
            props: true
        },
    ]
}