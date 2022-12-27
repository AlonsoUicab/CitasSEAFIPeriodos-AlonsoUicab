import Swal from "sweetalert2";


const colorWarning    = '#F7B84B'

const PantallaConfirmacion = async () => {
    return await Swal.fire({
        allowOutsideClick : false,
        allowEscapeKey    : false,
        showCancelButton  : true,
        customClass       : {popup: "swal2-border-radius"},
        confirmButtonColor: colorWarning,
        cancelButtonColor : 'bg-light',
        cancelButtonText  : 'Cancelar',
        confirmButtonText : 'Aceptar',
        //title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`
        title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color: ${colorWarning}" />`,
        html              : `<b>¿Desea continuar eliminando el registro?</b><br><br><p>Esta operación no se puede deshacer, pero podrá volver a registrar el sistema.</p>`,
    })
}


export const NotificacionesSistemas = {
    PantallaConfirmacion
}