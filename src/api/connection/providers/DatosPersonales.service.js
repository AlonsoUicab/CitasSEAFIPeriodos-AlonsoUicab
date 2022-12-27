import { _httpClient } from "@/api/connection";

export const DatosPersonales = {

    /**
     * Devuelve una promesa que contiene un objeto con los datos personales del usuario
     * @returns {Promise<DatoPerfilObtenerDTO>}
     */
    obtener: async () => {
        try {
            return await _httpClient.get('Usuarios/ObtenerDatos', {})
        } catch (e) {
            throw e
        }
    },


}
