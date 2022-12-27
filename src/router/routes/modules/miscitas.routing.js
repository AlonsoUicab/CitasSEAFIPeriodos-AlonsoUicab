 /*TODO: Renombrar directorios de perfil a citas */

export default
{
    path :"/miscitas",
    component: () =>import(/* webpackPrefetch: true */"@/views/modules/user/components/PerfilLayout"),
    meta:{
        title: "Mis citas",
    },
    children: [
        {
            path     : "historial",
            name     : "historial",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/user/HistorialCitas"),
            meta     : {
                title: "Historial",
            },
        },
        {
            path     : "cita", // http://url/recepcion/cita
            name     : "user-cita",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/user/VerCita.vue"),
            meta     : {
                title: "Cita",
            },
        },
        {
            path     : "citas",
            name     : "citas",
            component: () => import(/* webpackPrefetch: true */"@/views/modules/user/AgendarCita"),
            meta     : {
                title: "Agendar Citas",
            },
            children:[
                {
                    path: "datospersonales",
                    name:   "datospersonales",
                    component: () => import("@/views/modules/user/components/DatosPersonales"),
                },
                {
                    path: "tramite",
                    name:   "tramite",
                    component: () => import("@/views/modules/user/components/Tramite"),
                },
                {
                    path: "vehiculo",
                    name:   "vehiculo",
                    component: () => import("@/views/modules/user/components/Vehiculo"),
                },
                {
                    path: "fecha",
                    name:   "fecha",
                    component: () => import("@/views/modules/user/components/FechaHora"),
                },
                {
                    path: "finalizar",
                    name:   "finalizar",
                    component: () => import("@/views/modules/user/components/FinalizarCita"),
                },
            ]
        }
    ]
}