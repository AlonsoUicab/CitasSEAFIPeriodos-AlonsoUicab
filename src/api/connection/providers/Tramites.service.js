import {_httpClient} from "@/api/connection";

export const Tramites = {
    /**
     * Devuelve una promesa que contiene un objeto con los tipos de Contribuyentes
     * @returns {Promise<>}
     */
    obtenerTiposTramites: async () => {
        try {
            return await _httpClient.get('Tramites/ObtenerTramites', {})
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve una promesa que contiene un objeto con los tipos de Contribuyentes
     * @returns {Promise<>}
     */
    obtenerRequisitosTramite: async (idTramite) => {
        try {
            return await _httpClient.post(`Tramites/Requisitos/ObtenerRequisitos/?idTramite=${idTramite}`)
        } catch (e) {
            throw e
        }
    },


}