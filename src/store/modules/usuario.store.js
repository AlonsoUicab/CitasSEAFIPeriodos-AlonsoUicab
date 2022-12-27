import { defineStore } from "pinia";
import { DatosPersonales } from "@/api/connection/providers/DatosPersonales.service";
import {UsuarioService} from "@/api/connection/providers/Usuarios.service";
// import {useSsoStore} from "@/store/modules/sso.store";

export const useUsuarioStore = defineStore('usuario', {
    state: () => ({
        nombre         : null,
        primerApellido : null,
        segundoApellido: null,
        curp           : null,
        rfc            : null,
        telefono       : null,
        nombreCompleto : null,
        calle          : null,
        colonia        : null,
        numExterior    : null,
        numInterior    : null,
        cruzamiento1   : null,
        cruzamiento2   : null,
        referencia     : null,
        modulos        : []
    }),

    getters: {

    },

    actions: {
        async cargarDatosDeUsuario() {
            try {
                const userInfo = await DatosPersonales.obtener()
                await this.llenarDatos(userInfo)
                this.cargarModulos()
            } catch (e) {
                throw e
            }
        },
        async cargarModulos() {
            try {
                this.modulos = await UsuarioService.obtenerModulos()
            } catch (e) {
                throw e
            }
        },


        async llenarDatos(userInfo) {
            if (userInfo.curp) this.curp = userInfo.curp
            if (userInfo.rfc) this.rfc = userInfo.rfc
            if (userInfo.telefono) this.telefono = userInfo.telefono
            if(userInfo.calle) this.calle = userInfo.calle
            if(userInfo.numExterior) this.numExterior = userInfo.numExterior
            this.numInterior = userInfo.numInterior ? userInfo.numInterior : null
            this.referencia = userInfo.referencia ? userInfo.referencia : null
            this.cruzamiento1 = userInfo.cruzamiento1 ? userInfo.cruzamiento1 : null
            this.cruzamiento2 = userInfo.cruzamiento2 ? userInfo.cruzamiento2 : null
            if (userInfo.colonia) this.colonia = userInfo.colonia
            if (userInfo.nombreCompleto) this.nombreCompleto = userInfo.nombreCompleto
        },
    },
})