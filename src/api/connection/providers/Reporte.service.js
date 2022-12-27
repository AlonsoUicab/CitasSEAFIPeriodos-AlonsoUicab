import { _httpClient } from "@/api/connection";

export const ReportesService = {
    /**
     * ESTADISTICAS PARA MODULO ADMINISTRADOR/REPORTES
     * Devuelve una promesa que contiene un objeto con los tipos de Contribuyentes
     * @returns {Promise<>}
     */
    obtenerConteoCitasPorAnio: async () => {
        try {
            return await _httpClient.get('Citas/ObtenerConteoCitasPorAnio', {})
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve una promesa que contiene un objeto con los tipos de Reportes
     * @returns {Promise<>}
     */
    obtenerTiposReportes: async () => {
        try {
            return await _httpClient.get('CatTipoReporte/ObtenerTiposReporte', {})
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve el documento de reporte
     * @returns {Promise<>}
     */
    generarReportes: async (fechaInicio, fechaFinal, tipoRep, formato) => {
        try {
            const reporte = {
                fechaInicio : fechaInicio,
                fechaFinal  : fechaFinal,
                tipoRep     : tipoRep,
                formato     : formato,
                responseType: 'blob'
            }

            const config = { responseType: 'blob' };

            return await _httpClient.post("Informes/ObtenerInforme", reporte, config)
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve el documento de Acuse
     * @returns {Promise<>}
     */
    obtenerAcuse: async (idCita) => {
        try {
            const config = { responseType: 'blob' };
            return await _httpClient.get(`Informes/ObtenerAcuse/${idCita}`, config)
        } catch (e) {
            throw e
        }
    },
}