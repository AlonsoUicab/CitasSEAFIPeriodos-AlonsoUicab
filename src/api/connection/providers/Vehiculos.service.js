import { _httpClient } from "@/api/connection";

export const VehiculosService = {
    /**
     * Devuelve una promesa que contiene un array con los tipos de vehiculos
     * @returns {Promise<array[]>}
     */
    obtenerTiposVehiculos: async () => {
        try {
            return await _httpClient.get('Vehiculos/ObtenerTiposVehiculos', {})
        } catch (e) {
            throw e
        }
    },
}