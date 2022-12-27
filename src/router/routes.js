import rutasPublicas from "@/router/routes/publicas.routing";
import rutasUsuarioVerificado from "@/router/routes/autenticado.routing";

export default [
    {
        path     : "/:pathMatch(.*)*",
        component: () => import(/* webpackPrefetch: true */"../views/shared/PaginaNoEncontrada"),
        meta     : {
            title: 'Pagina no encontrada',
        }
    },
    {
        path     : "/",
        name: "PaginaInicial",
        component: () => import(/* webpackPrefetch: true */"../layouts/DefaultLayout"),
        meta     : {
            title: 'Pagina Informativa',
        },
        children: [{
            path     : "/",
            name     : "default",
            component: () => import(/* webpackPrefetch: true */"@/views/Inicio.vue"),
            meta     : {
                title: "Inicio",
            },
        }]
    },
    rutasPublicas,
    rutasUsuarioVerificado,
];
