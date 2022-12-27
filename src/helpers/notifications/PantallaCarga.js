import Swal from "sweetalert2";

const pantallaCarga = Swal

export default {
    mostrar: (msg = 'Espere un momento..') => {
        pantallaCarga.fire({
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey   : false,
            customClass      : {popup: "swal2-border-radius"},
            html             : `
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div><br>
                <h3>${msg}</h3>
                `,
        })
    },

    ocultar: () => {
        pantallaCarga.close()
    },
}