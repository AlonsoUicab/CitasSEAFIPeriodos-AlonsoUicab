import { _httpClient } from "@/api/connection";

export const SansionesService = {
    /**
     * Valida si el usuario dueño de la sesion tiene sanciones
     * @returns {Promise<>}
     */
    validarSanciones: async () => {
        try {
            return await _httpClient.post('Sanciones/VerificarSanciones')
        } catch (e) {
            throw e
        }
    },
}