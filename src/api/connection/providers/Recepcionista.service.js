import { _httpClient } from "@/api/connection";

export const RecepcionistaService = {
    /**
     * Devuelve un OK si se guarda correctamente la cita
     * @returns {Promise<>}
     */
    obtenerCitasDiaActual: async (searchquery, paginaActual, registrosPorPagina, idEstatus, columna, orden) => {
        try {
            const consulta = {
                filtro          : searchquery,
                pagina          : paginaActual,
                numElementos    : registrosPorPagina,
                columna         : columna,
                orden           : orden,
                idEstatusCita   : idEstatus
            }
            return await _httpClient.post('Citas/ObtenerCitasDelDia', consulta)
        } catch (e) {
            throw e
        }
    },
    /**
     * ESTADISTICAS PARA MODULO RECEPCIONISTA
     * Devuelve una promesa que contiene un objeto con los tipos de Contribuyentes
     * @returns {Promise<>}
     */
    obtenerConteoCitasPorFechaActual: async () => {
        try {
            return await _httpClient.get('Citas/ObtenerConteoCitasDiaActual', {})
        } catch (e) {
            throw e
        }
    },
}