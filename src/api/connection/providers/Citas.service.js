import { _httpClient } from "@/api/connection";

export const CitasService = {
    /**
     * Devuelve una promesa que contiene un objeto con los datos de la cita
     * @returns {Promise<>}
     */
    obtenerDatosCita: async (idCita) => {
        try {
            return await _httpClient.get(`Citas/ObtenerDatosCita/${idCita}`)
        } catch (e) {
            throw e
        }
    },
    obtenerCitas: async (fecha) => {
        console.log(fecha)
        try {
            return await _httpClient.get(`Citas/ObtenerTotalCitasAgendadasPorDia/${fecha}`)
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve un objeto con los valores agendados si se guarda correctamente la cita
     * @returns {Promise<>}
     */
    guardarCita: async (cita) => {
        try {
        return   await _httpClient.post('Citas/GuardarCita', cita)
        } catch (e) {
            throw e
        }
    },
    /**
     * Metodo para reagendar Cita
     * @returns {Promise<>}
     */
    reagendarCita: async (idCita,nuevaFecha, nuevaHora) => {
        try {
            const reagendar = [
                {
                "op" : "replace",
                "path" : "/fechaCita",
                "value" : nuevaFecha
                },
                {
                    "op" : "replace",
                    'path' : "/idHorario",
                    "value" : nuevaHora
                }]
            return await _httpClient.patch(`Citas/ReagendarCita/${idCita}`, reagendar)
        } catch (e) {
            throw e
        }
    },
    validarCitasCanceladasSemana: async  (idCita) => {
        try {
            return await _httpClient.get(`Citas/ValidarCitasCanceladasSemana?idCita=${idCita}`)
        }catch (e){
            throw e
        }
    },
    /**
     * Metodo para cancelar una cita
     * @returns {Promise<>}
     */
    cancelarCita: async (idCita) => {
        try {
            return await _httpClient.put(`Citas/CancelarCita?idCita=${idCita}`)
        } catch (e) {
            throw e
        }
    },
    /**
     * Metodo para atender una cita con requisitos completos
     * @returns {Promise<>}
     */
    requisitosCompletos: async (idCita) => {
        try {
            return await _httpClient.put(`Citas/CompletarCitaConRequisitosCompletos?idCita=${idCita}`)
        } catch (e) {
            throw e
        }
    },
    /**
     * Metodo para atender una cita con requisitos incompletos
     * @returns {Promise<>}
     */
    requisitosIncompletos: async (idCita) => {
        try {
            return await _httpClient.put(`Citas/CompletarCitaConRequisitosIncompletos`, idCita)
        } catch (e) {
            throw e
        }
    },
    /**
     * TABLA DE HISTORIAL DE CITAS
     * Devuelve las citas agendas del usuario durante el año
     * @returns {Promise<>}
     */
    obtenerCitasAnioActual: async (searchquery, paginaActual, registrosPorPagina, idEstatus, columna, orden) => {
        try {
            const consulta = {
                filtro          : searchquery,
                pagina          : paginaActual,
                numElementos    : registrosPorPagina,
                columna         : columna,
                orden           : orden,
                idEstatusCita   : idEstatus
            }
            return await _httpClient.post('Citas/ObtenerHistorialCitasDelAnioUsuario', consulta)
        } catch (e) {
            throw e
        }
    },

//================ESTADISICAS=================
    /**
     * Devuelve las Estadisticas para el Historial de citas del Usuario
     * por periodo activo
     * @returns {Promise<>}
     */
    estadisticasCitasPorPeriodo: async () => {
        try {
            return await _httpClient.get('Citas/ObtenerConteoCitasPorPeriodoUsuarioGeneral')
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve las Estadisticas para el Historial de citas del Usuario
     * por periodo activo
     * @returns {Promise<>}
     */
    estadisticasCitasPorAnio: async () => {
        try {
            return await _httpClient.get('Citas/ObtenerConteoCitasHistorico')
        } catch (e) {
            throw e
        }
    },
}