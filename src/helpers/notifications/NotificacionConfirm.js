import Swal from "sweetalert2";
import { useSsoStore } from "@/store/modules/sso.store";

const dialogoConfirmacion = Swal
const ssoStore = useSsoStore()

let timerInterval

export default {
    ContinuarSesion: async () => {
        return await dialogoConfirmacion.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            showCancelButton  : true,
            customClass       : {
                timerProgressBar: 'progress-lg bg-warning',
                confirmButton: 'btn-square-round-warning',
                cancelButton: 'btn-square-round-soft-pantone-gray-dark',
            },
            html              : `La sesión finalizará <b>${ssoStore.expiraEn}</b>. <br>¿Desea permancer en la sesión?`,
            cancelButtonText  : 'Ignorar',
            confirmButtonText : 'Continuar',
            title             : `<i class="mdi mdi-help-circle-outline text-warning" style="font-size:100px;" />`,
            timer             : ssoStore.milisegundosRestantes,
            timerProgressBar  : true,
            didOpen           : () => {
                const b       = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = ssoStore.expiraEn
                }, 1000)
            },
            willClose         : () => {
                clearInterval(timerInterval)
            }
        })
    },

    CerrarSesion: async () => {
        return await Swal.fire({
            allowOutsideClick : false,
            allowEscapeKey    : false,
            showCancelButton  : true,
            customClass       : {
                confirmButton: 'btn-square-round-warning',
                cancelButton: 'btn-square-round-soft-pantone-gray-dark',
            },
            text              : '¿Desea cerrar su sesión?',
            cancelButtonText  : 'Cancelar',
            confirmButtonText : 'Aceptar',
            title             : `<i class="mdi mdi-help-circle-outline text-warning" style="font-size:100px;" />`
        })
    },

    cerrarDialogo: () => dialogoConfirmacion.close()
}

