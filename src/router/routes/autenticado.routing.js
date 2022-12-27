import rutasRolAdministrador from "@/router/routes/modules/administrador.routing";
import miscitasRouting from "@/router/routes/modules/miscitas.routing";
import recepcionRouting from "@/router/routes/modules/recepcion.routing";

export default {
    path     : '/user',
    name     : 'user',
    component: () => import(/* webpackPrefetch: true */"@/layouts/DefaultLayout"),
    meta     : {
        title         : 'user',
        authRequired  : true,
    },
    children : [
        miscitasRouting,
        recepcionRouting,
        rutasRolAdministrador
    ]
}
