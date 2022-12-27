import { defineStore } from "pinia";
import { UsuarioService } from "@/api/connection/providers/Usuarios.service";
import moment from "moment";
import { useUsuarioStore } from "@/store/modules/usuario.store";
import router from "@/router";

moment.locale('es')
export const useSsoStore = defineStore('sso', {
    state: () => ({
        token    : null,
        vigencia : null,
        email    : null,
        rol      : null,
        timer    : null,
        contador : null,
        now      : moment(),
        expiraEn : '',
    }),

    getters: {
        sesionInactiva: (state) => (
            state.vigencia ? moment.duration(moment(state.vigencia).diff(state.now)).asMinutes() < 0 : true
        ),

        tiempoRestante: (state) => moment.duration(moment(state.vigencia).diff(state.now)).asMinutes() -1,

        milisegundosRestantes: (state) => moment.duration(moment(state.vigencia).diff(state.now)).asMilliseconds(),

        mostrarAviso: (state) => (
            state.vigencia
                ? moment.duration(moment(state.vigencia).diff(moment())).asMinutes() < 6
                : false
        ),
        esMaster: (state) => state.rol === '5',
        esAdmin: (state) => state.rol === '3',
        esRecep: (state) => state.rol === '2',
    },

    actions: {
        async iniciarSesion(code) {
            try {
                const authToken = await UsuarioService.login(code)
                //----INICIO DE SESION EN LLAVE CAMPECHE
                const tokens   = authToken.token.split(".");
                const authUser = JSON.parse(atob(tokens[1]))
                this.token    = authToken.token
                this.vigencia = moment(new Date(authUser.exp * 1000))
                this.email    = authUser.email.toLowerCase()
                this.rol      = authUser.role
            } catch (e) {
                throw e
            }
        },

        async renovarSesion() {
            try {
                const authToken = await UsuarioService.renovarSesion()
                this.finalizarContador()
                const tokens   = authToken.token.split(".");
                const authUser = JSON.parse(atob(tokens[1]))
                this.token     = authToken.token
                this.vigencia  = moment(new Date(authUser.exp * 1000))
                this.email     = authUser.email.toLowerCase()
                this.rol       = authUser.role
                this.iniciarContador()
            } catch (e) {
                throw e
            }
        },

        async cerrarSesion() {
            await router.push({name: 'logout'})
            this.finalizarContador()
            this.token         = null
            this.vigencia      = null
            this.email         = null
            this.rol           = null
            // this.nombreRol     = null
            this.contador      = null
            this.now           = null
            const usuarioStore = useUsuarioStore()

            usuarioStore.curp            = null
            usuarioStore.rfc             = null
            usuarioStore.telefono        = null
            usuarioStore.direccion       = null
            usuarioStore.colonia         = null
            usuarioStore.calle           = null
            usuarioStore.numExterior     = null
            usuarioStore.numInterior     = null
            usuarioStore.cruzamiento1    = null
            usuarioStore.cruzamiento2    = null
            usuarioStore.referencia      = null
            usuarioStore.nombre          = null
            usuarioStore.primerApellido  = null
            usuarioStore.segundoApellido = null
            usuarioStore.nombreCompleto  = null
            usuarioStore.modulos         = []
        },

        iniciarContador() {
            this.contador = setInterval(() => {
                this.now      = moment()
                this.expiraEn = moment(this.vigencia).fromNow()

                if (localStorage.getItem("usuario") === null){
                    this.cerrarSesion()
                }

                if (this.tiempoRestante <= 0) {
                    this.cerrarSesion()
                }
            }, 100)
        },

        finalizarContador() {
            clearInterval(this.contador)
        },

        async actualizarCorreo(email) {
            try {
                this.email = email
            } catch (e) {
                throw e
            }
        },
    },
})