export const modulosOpc = [
    {
        nombre: 'Mis Citas',
        icono : 'mdi-calendar-account',
        opciones : [
            {
                nombre: 'Historial de citas',
                icono: 'mdi-calendar-clock',
                url:'historial'
            },
            {
                nombre: 'Agendar cita',
                icono: 'mdi-calendar-plus',
                url:'datospersonales'
            },
        ]
    },
    {
        nombre: 'Recepcion',
        icono : 'mdi-clipboard-account',
        opciones : [
            {
                nombre: 'Citas',
                icono: 'mdi-calendar-multiple',
                url:'recepcion'
            }
        ]
    },
    {
        nombre: 'Administrador',
        icono : 'mdi-cog',
        opciones : [
            {
                nombre: 'Calendario',
                icono: 'mdi-calendar',
                url:'Calendario'
            },
            {
                nombre: 'Reportes',
                icono: 'mdi-file',
                url:'Reportes'
            }
        ]
    },
]

export const opcionesSelect = [
    {
        idEstatus: 0,
        nombre : "Todas las citas"
    },
    {
        idEstatus: 1,
        nombre : "Citas por Atender"
    },
    {
        idEstatus: 4,
        nombre : "Citas requisitos completos"
    },
    {
        idEstatus: 3,
        nombre : "Citas requisitos Incompletos"
    },
]
export const opcionesSelect2 = [
    {
        idEstatus: 0,
        nombre : "Todas las citas"
    },
    {
        idEstatus: 1,
        nombre : "Citas Pendientes"
    },
    {
        idEstatus: 4,
        nombre : "Citas Atendidadas Correctamente"
    },
    {
        idEstatus: 3,
        nombre : "Citas Atentididas con requisitos Incompletos"
    },
]