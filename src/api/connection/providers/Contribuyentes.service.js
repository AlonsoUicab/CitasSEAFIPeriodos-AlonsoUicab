import {_httpClient} from "@/api/connection";

export const Contribuyentes = {
    /**
     * Devuelve una promesa que contiene un objeto con los tipos de Contribuyentes
     * @returns {Promise<TipoContribuyenteDTO>}
     */
    obtenerTiposContribuyentes: async () => {
        try {
            return await _httpClient.get('Constribuyentes/ObtenerTiposContribuyentes', {})
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve una promesa que contiene un objeto con los estatus del SAT
     * @returns {Promise<EstatusSatDTO>}
     */
    obtenerEstatusSAT: async () => {
        try {
            return await _httpClient.get('EstatusSAT/ObtenerTiposEstatusSAT', {})
        } catch (e) {
            throw e
        }
    },

}