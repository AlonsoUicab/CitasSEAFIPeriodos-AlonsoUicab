import NotificacionError from "@/helpers/notifications/NotificacionError";

export const mensajesError = async (e) => {

    if (!e.response) {
        await NotificacionError.mostrar('Error de conexión con el servidor')
        return Promise.reject('El servidor no está disponible, intente de nuevo o más tarde')
    }

    if (e.response.data.errors) {
        return Promise.reject(e.response.data.errors)
    }

    if (e.response.data.includes('Object reference')) {
        return Promise.reject("Error interno del servidor")
    }

    return e.response.data
}