import Swal from "sweetalert2";

const colorInfo    = '#299CDB'
const colorError   = '#F06548'
const colorSuccess = '#0AB39C'
const colorWarning    = '#F7B84B'

const ConfirmacionAtender = async (msg= '', tipoRequisito = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'btn-soft-seafi-gray',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea atender la cita ${msg}?</b><p>Se marcara con Requisitos ${tipoRequisito}</p>`,
    })
}
const PantallaExito = async (msg = '') => {
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
const PantallaError = async (msg = 'Ocurrió un error inesperado') => {
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
const ConfirmacionEliminar = async (msg= '', idPeriodo = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'btn-soft-seafi-gray',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea Eliminar el Periodo "${msg}"?</b><p>El Periodo ${idPeriodo}</p>`,
    })
}

const ConfirmacionEliminarEvento = async (msg= '', idPeriodo = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'btn-soft-seafi-gray',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea Eliminar el Periodo "${msg}"?</b><p>El Periodo ${idPeriodo}</p>`,
    })
}
const ConfirmacionEditar = async (msg= '',accion = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'btn-soft-seafi-gray',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        title             : `<i class="mdi mdi-calendar-alert" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea ${accion} el Evento del "${msg}"?</b>`,
    })
}
const ValidarDiaInhabil = async (msg= '',accion = '') => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'btn-soft-seafi-gray',
        confirmButtonText : 'Aceptar',
        cancelButtonText  : 'Cancelar',
        title             : `<i class="mdi mdi-calendar-alert" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea ${accion} el Evento del "${msg}"?</b><p>No hay eventos registrados en la fecha seleccionada</p>`,
    })
}
export const NotificacionesRecepcion = {
    ConfirmacionAtender,
    ConfirmacionEditar,
    PantallaExito,
    PantallaError,
    ConfirmacionEliminar,
    ConfirmacionEliminarEvento,
    ValidarDiaInhabil
}