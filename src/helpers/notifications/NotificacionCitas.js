import Swal from "sweetalert2";

const colorWarning    = '#F7B84B'
const colorSuccess = '#0AB39C'
const colorError   = '#F06548'


const date2 = null

const humanfriendlyConfig = {
    inline: true,
    dateFormat: "d M, Y",
    defaultDate: "25 12, 2021",
}

//#region Notificaciones de CANCELACION
const ConfirmacionCancelacion = async (folio= '', msg = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'btn-square-soft-pantone-gray',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-calendar-remove" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea Cancelar su cita programada con folio ${folio}?</b><p>${msg}</p>`,
    })
}
const ExitoCancelacion = async (msg = 'Cita Cancelada con Exito') => {
    return await Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey   : false,
        customClass      : {
            popup        : "swal2-border-radius",
            confirmButton: 'btn-square-round-success'
        },
        title            : `<i class="mdi mdi-check-circle-outline text-success" style="font-size:100px" >`,
        confirmButtonText: 'Aceptar',
        text             : msg,
    })
}
const ErrorCancelacion = async (msg = 'Ocurrió un error inesperado') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorError,
        confirmButtonText : 'Aceptar',
        title             : `<i class="mdi mdi-close-circle-outline" style="font-size:100px; color:${colorError}"/>`,
        text              : msg,
    })
}
//#endregion
const PantallaConfirmacion = async (msg= '', df = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'bg-light',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-car-off" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea Eliminar el Vehículo ${msg}?</b><p>Con numero de serie: ${df}</p>`,
    })
}

const ConfirmacionReagendar = async (folio= '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorSuccess,
        cancelButtonColor : 'bg-light',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-calendar-remove" style="font-size:100px; color: ${colorSuccess}" />`,
        html              : `<b>¿Desea Reagendar su cita programada con folio ${folio}?`
    })
        /*.then((confirmacion) => {
        if (confirmacion.isConfirmed) {
            Swal.fire({
                title     : `<i class="mdi mdi-calendar-remove" style="font-size:100px; color: ${colorSuccess}" />`,
                html      : `<b>Reagendando de cita con Folio ${folio}`
            })
            // flatpickr(".flatpickr-calendar", {
            //     dateFormat: "d/m/Y",
            //     minDate: new Date(),
            //     static: true
            // })
        }
    })*/
}
const PantallaExito = async (msg = 'Vehículos Agregados con éxito',msgBtn='Aceptar') => {
    return await Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey   : false,
        customClass      : {
            popup        : "swal2-border-radius",
            confirmButton: 'btn-square-round-success'
        },
        title            : `<i class="mdi mdi-check-circle-outline text-success" style="font-size:100px" >`,
        confirmButtonText: msgBtn,
        text             : msg,
    })
}
const tieneSancion = async () => {
    return await Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey   : false,
        customClass      : {
            popup        : "swal2-border-radius",
            confirmButton: 'btn-square-round-warning'
        },
        title            : `<i class="mdi mdi-alert text-warning" style="font-size:100px" >`,
        confirmButtonText: 'Aceptar',
        html             : `<b>¡Tiene una Sanción!</b><p>Tiene un sanción activa por lo que no puede agendar citas nuevas en el periodo</p>`,
    })
}
const Siguiente = async (info= '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : false,
        customClass       : {popup: "swal2-border-radius",
            confirmButton: 'btn-square-round-danger'
        },

        cancelButtonColor : 'bg-light',
        confirmButtonText : 'Aceptar',

        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>Por favor seleccione ${info} para poder continuar`
    })
}
const Agendar = async (msg= '', df = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,

        customClass       : {
            popup: "swal2-border-radius",
            confirmButton: 'btn-square-round-danger'
        },

        confirmButtonText : 'Aceptar',

        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
        html              : `<b>${msg} </b>`,
    })
}
const Continuar = async (msg= '', df = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,

        customClass       : {
            popup: "swal2-border-radius",
            confirmButton: 'btn-square-round-danger'
        },

        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',

        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-close-circle-outline text-danger" style="font-size:100px;"/>`,
        html              : `<b>${msg} </b>`,
    })
}
const RequisitosIncompletos = async (msg = '') => {
    return await Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey   : false,
        customClass      : {
            popup        : "swal2-border-radius",
            confirmButton: 'btn-square-round-success'
        },
        title            : `<i class="mdi mdi-check-circle-outline text-success" style="font-size:100px" >`,
        confirmButtonText: 'Aceptar',
        text             : msg,
    })
}

export const NotificacionesCitas = {
    ConfirmacionCancelacion,
    ExitoCancelacion,
    ErrorCancelacion,
    PantallaConfirmacion,
    PantallaExito,
    ConfirmacionReagendar,
    Siguiente,
    Agendar,
    tieneSancion,
    RequisitosIncompletos,
    Continuar
}