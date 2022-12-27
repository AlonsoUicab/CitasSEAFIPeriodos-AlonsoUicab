import Swal from "sweetalert2";

const swal         = Swal
const colorError   = '#F06548'
const colorSuccess = '#0AB39C'
const colorInfo    = '#299CDB'

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


const PantallaConfirmacion = () => {
    swal.fire({
        allowOutsideClick: false,
        showConfirmButton: false,
        allowEscapeKey   : false,
        customClass      : {popup: "swal2-border-radius"},
        title             : `<i class="mdi mdi-help-circle-outline" style="font-size:100px; color:${colorInfo}"/>`,
        html             : `
                <div class="row" style="width: 100%">
                    <div class="col-2">
                    </div>
                    <div class="col-8">
                        <p class="text-muted text-start mb-1">Seleccione el rol</p>
                        <select class="form-select mb-3" aria-label="Default select example">
                            <option selected="">Administrador</option>
                            <option value="1">Público</option>
                        </select>
                        <button type="button" class="btn btn-soft-dark waves-effect waves-light shadow-none text-muted" style="width:45%">Cancelar</button>
                        <button type="button" class="btn btn-info waves-effect waves-light" style="width:45%">Aceptar</button>
                    </div>
                    <div class="col-2">
                    </div>
                </div>
                `,
    })
}


const CerrarPantallaCarga = () => swal.close()

export const NotificacionesUsuarios = {
    PantallaError,
    PantallaConfirmacion
}