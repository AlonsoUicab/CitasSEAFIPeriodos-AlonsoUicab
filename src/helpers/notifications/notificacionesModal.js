import Swal from "sweetalert2";

export const NotificacionesModal = {
    PantallaUsuarioNoVerificado: async () => {
        return await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-soft-danger',
                cancelButton : 'btn-square-round-danger'
            },
            confirmButtonText: 'Reenviar',
            showCancelButton : true,
            cancelButtonText : 'Aceptar',
            title            : `<i class="mdi mdi-account-cancel text-danger" style="font-size:100px"/>`,
            html             : `<b class="fs-3">Su cuenta aún no ha sido verificada</b><br><br><p class="fs-5">Revise su bandeja de entrada o correo no deseado (spam) para realizar la verificación.<br><br><p class="fs-5">En caso de no recibir el correo electrónico pruebe reenviar.</p></p>`,
        })
    },


    PantallaExito: async (msg = 'Proceso completado') => {
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
    },

    PantallaEnvioCorreo: async () => {
        await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success'
            },
            title            : `<i class="mdi mdi-email-fast text-success" style="font-size:100px"/>`,
            confirmButtonText: 'Aceptar',
            html             : `<b>Se ha enviado un correo para la verificación de la cuenta</b><br><br><p>Revise su bandeja de entrada o correo no deseado para completar su registro</p>`,
        })
    },

    PantallaCodigoVerificacion: async () => {
        await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success'
            },
            title            : `<i class="mdi mdi-email-fast text-success" style="font-size:100px"/>`,
            confirmButtonText: 'Aceptar',
            html             : `<b>Se ha enviado un código de verificación al correo proporcionado.</b><br><br><p>Revise su bandeja de entrada o correo no deseado para continuar el proceso.</p>`,
        })
    },

    PantallaPassActualizada: async () => {
        await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success'
            },
            title            : `<i class="mdi mdi-lock-check text-success" style="font-size:100px"/>`,
            confirmButtonText: 'Aceptar',
            html             : `<b>¡Contraseña Actualizada!</b><br><br><p>Su nueva contraseña ha sido actualizada con éxito</p>`,
        })
    },

    PantallaCorreoActualizado: async () => {
        await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success'
            },
            title            : `<i class="mdi mdi-email-check text-success" style="font-size:100px"/>`,
            confirmButtonText: 'Aceptar',
            html             : `<b>¡Correo electrónico actualizado!</b><br><br><p>Su nuevo correo ha sido actualizado con éxito</p>`,
        })
    },

    PantallaPerfilActualizado: async () => {
        await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success'
            },
            title            : `<i class="mdi mdi-account-check text-success" style="font-size:100px"/>`,
            confirmButtonText: 'Aceptar',
            html             : `<b>¡Usuario Actualizado!</b><br><br><p>Sus datos se han almacenado con éxito</p>`,
        })
    },

    PantallaConfirmacion: async (msg = '¿Desea continuar?') => {
        return await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            showCancelButton : true,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success',
                cancelButton : 'btn-square-round-danger'
            },
            text             : msg,
            cancelButtonText : 'Cancelar',
            confirmButtonText: 'Aceptar',
            title            : `<i class="mdi mdi-help-circle-outline text-info" style="font-size:100px" />`
        })
    },

    PantallaInformativa: async (msg = '') => {
        await Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey   : false,
            customClass      : {
                popup        : "swal2-border-radius",
                confirmButton: 'btn-square-round-success'
            },
            title            : `<i class="mdi mdi-information-outline text-success" style="font-size:100px"/>`,
            confirmButtonText: 'Aceptar',
            html             : `<b>Complete su información de perfil</b><br><br><p>${msg}</p>`,
        })
    }
}
