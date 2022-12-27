import { _httpClient } from "@/api/connection";

export const RolesService = {

    /**
     * @returns {Promise<Array<RolDTO>>}
     */
    obtenerRoles: async () => {
        try {
            return await _httpClient.get(`Roles/ObtenerRoles`, {})
        } catch (e) {
            throw e
        }
    }
}
