import { _httpClient } from "@/api/connection";

export const PeriodosService = {
    ObtenerListaPeriodos: async ( searchquery, paginaActual, registrosPorPagina, columna, orden)=>{
        try {
            const consulta = {
                filtro          : searchquery,
                pagina          : paginaActual,
                numElementos    : registrosPorPagina,
                columna         : columna,
                orden           : orden,
            }
            return await _httpClient.post('Periodos/ObtenerPeriodos', consulta)
        } catch (e) {
            throw e
        }
    },
    agregarPeriodo: async (idPeriodo, nombrePeriodo, fechaInicio, fechaFin, activo) => {
        try {
            const periodo = {
                idPeriodo       : idPeriodo,
                nombrePeriodo   : nombrePeriodo,
                fechaInicio     : fechaInicio,
                fechaFin        : fechaFin,
                activo          : activo,
            }
            return await _httpClient.post('Periodos/AgregarPeriodo', periodo)
        } catch (e) {
            throw e
        }
    },
    modificarPeriodo: async (idPeriodo, nombrePeriodo, fechaInicio, fechaFin, activo) => {
        try {
            const periodo = {
                idPeriodo       : idPeriodo,
                nombrePeriodo   : nombrePeriodo,
                fechaInicio     : fechaInicio,
                fechaFin        : fechaFin,
                activo          : activo,
            }
            return await _httpClient.put('Periodos/ModificarPeriodo', periodo)
        } catch (e) {
            throw e
        }
    },
    eliminarPeriodo:async (idPeriodo)=>{
        try {
            return await _httpClient.delete(`Periodos/EliminarPeriodo/${idPeriodo}`)
        } catch (e) {
            throw e
        }
    },

}