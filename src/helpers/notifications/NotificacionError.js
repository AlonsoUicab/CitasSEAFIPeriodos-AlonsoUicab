import Swal from "sweetalert2";

export default {
    mostrar : async (msg = 'Ocurrió un error inesperado') => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            customClass       : {
                popup: "swal2-border-radius",
                confirmButton: 'btn-square-round-danger'
            },
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
            text              : msg,
        })
    },
    Agendar : async (msg = 'No se pudo agendar su cita', error = '') => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            customClass       : {
                popup: "swal2-border-radius",
                confirmButton: 'btn-square-round-danger'
            },
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
            text              : msg,
            html              :  `<b> ${msg}</b>`,

        })
    },
    RutaValidada: async (msg = 'La ruta no es valida') => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            customClass       : {
                popup: "swal2-border-radius",
                confirmButton: 'btn-square-round-danger'
            },
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
            text              : msg,
        })
    },
    ListaVehiculos: async (msg = '¡Solo puede agregar un máximo de 3 vehículos por cita!') => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            customClass       : {
                popup: "swal2-border-radius",
                confirmButton: 'btn-square-round-danger'
            },
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
            text              : msg,
        })
    },
    VehiculosVacios: async (msg = '¡Aún no haz agregado ningun vehículo!') => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            customClass       : {
                popup: "swal2-border-radius",
                confirmButton: 'btn-square-round-danger'
            },
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
            text              : msg,
        })
    },
    Reportes: async (msg = '') => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            customClass       : {
                popup: "swal2-border-radius",
                confirmButton: 'btn-square-round-danger'
            },
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
            text              : msg,
        })
    },

}