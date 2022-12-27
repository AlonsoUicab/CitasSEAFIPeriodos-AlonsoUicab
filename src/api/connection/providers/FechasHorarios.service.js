import {_httpClient} from "@/api/connection";

export const FechasHorarios = {

    /**
     * Devuelve una promesa que contiene un array con las fechas disponibles para agendar citas
     * dentro de los periodos activos
     * @returns {Promise<array[]>}
     */
    obtenerFechasDisponibles: async () => {
        try {
            return await _httpClient.get('CatHorario/ObtenerDiasDisponiblesEnPeriodosActivos', {})
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve una promesa que contiene un array con los horarios disponibles para una fecha determinada
     * @returns {Promise<>}
     */
    obtenerHorariosDisponiblesPorFecha: async (fecha) => {
        try {
            return await _httpClient.get(`CatHorario/ObtenerHorariosDisponiblesEnFecha?fecha=${fecha}`)
        } catch (e) {
            throw e
        }
    },

    /**
     * Devuelve una promesa que contiene un array con los horarios que no estan disponibles en un periodo activo
     * @returns {Promise<>}
     */
    ObtenerDiasNoDisponiblesEnPeriodosActivos:async ()=>{
        try {
            return await _httpClient.get('CatHorario/ObtenerDiasNoDisponiblesEnPeriodosActivos', {})
        } catch (e) {
            throw e
        }
    },

    /**
     * Devuelve una promesa que contiene un array con los dias inhabiles
     * @returns {Promise<>}
     */
    ObtenerListaDiasInhabiles:async ()=>{
        try {
            return await _httpClient.get(`DiaInhabil/ObtenerListaDiasInhabiles`)
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve una promesa que contiene un array con los dias inhabiles
     * completos y paginados
     * @returns {Promise<>}
     */
    ObtenerListaDiasInhabilesPaginado: async ( searchquery, paginaActual, registrosPorPagina, columna, orden)=>{
        try {
            const consulta = {
                filtro          : searchquery,
                pagina          : paginaActual,
                numElementos    : registrosPorPagina,
                columna         : columna,
                orden           : orden,
            }
            return await _httpClient.post('DiaInhabil/ObtenerDatosDiasInhabilesPaginado', consulta)
        } catch (e) {
            throw e
        }
    },
    agregarDiaInhabil: async ( idDia, fecha, nombre, descripcion)=>{
        try {
            const consulta = {
                idDia       : idDia,
                fecha       : fecha,
                nombre      : nombre,
                descripcion : descripcion,
            }

            return await _httpClient.post('DiaInhabil/AgregarDiaInhabil', consulta)
        } catch (e) {
            throw e
        }
    },
    eliminarDiaInhabil:async (idDia)=>{
        try {
            return await _httpClient.delete(`DiaInhabil/EliminarDiaInhabil/${idDia}`)
        } catch (e) {
            throw e
        }
    },
    validarDiaInhabil:async (idDia, fecha, nombre, descripcion)=>{

        try {
            const consulta = {
                idDia       : idDia,
                fecha       : fecha,
                nombre      : nombre,
                descripcion : descripcion,
            }

            return await _httpClient.post(`DiaInhabil/ValidarDiaInhabil`, consulta)
        } catch (e) {
            throw e
        }
    },
    /**
     * Devuelve una promesa que contiene un array con los dias inhabiles
     * @returns {Promise<>}
     */
    ObtenerHorarioPorId:async (idFecha)=>{
        try {
            return await _httpClient.get(`CatHorario/ObtenerHorarioPorId/${idFecha}`)
        } catch (e) {
            throw e
        }
    },

    /**
     * Devuelve una promesa que contiene un array con los dias inhabiles
     * @returns {Promise<>}
     */
    ObtenerDiasPeriodo : async () => {
        try {
            return await _httpClient.get(`CatHorario/ObtenerDiaInicioFinPeriodosActivos`)
        } catch (e) {
            throw e
        }
    },
    ObtenerEventos:async (idFecha)=>{
        try {
            return await _httpClient.get(`CatHorario/ObtenerHorarioPorId/${idFecha}`)
        } catch (e) {
            throw e
        }
    },
    activarHorariosExtraordinarios: async ( fechaInicial,fechaFinal)=>{
        try {
            const consulta = {
                fechaInicial       : fechaInicial,
                fechaFinal       : fechaFinal,

            }

            return await _httpClient.put('CatHorario/ActivarHorariosExtraordinarios', consulta)
        } catch (e) {
            throw e
        }
    },

}