import { _httpClient } from "@/api/connection";

export const UsuarioService = {

    /**
     * Para generar el token del usuario, no es posible generarlo si no ha sido verificado
     * @returns {Promise<TokenDTO>}
     */
    login: async (code) => {
        try {
            const usuario = await _httpClient.post(`Usuarios/Login?code=${code}`, {})
            return usuario
        } catch (e) {
            throw e
        }
    },

    renovarSesion: async () => {
        try {
            const usuario = await _httpClient.get(`Usuarios/RenovarToken`)
            return usuario
        } catch (e) {
            throw e
        }
    },

    obtenerModulos: async () => {
        try {
            return await _httpClient.post('Usuarios/Modulos/ObtenerModulos')
        } catch (e) {
            throw e
        }
    }
}
