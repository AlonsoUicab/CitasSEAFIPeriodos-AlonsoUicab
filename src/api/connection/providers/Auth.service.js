import {_httpLlave} from "@/api/connection";

export const authService = {
    loginLlave: async () => {
        try {
            const _urlLlave    = "http://172.19.64.15/login"
            const _keyClient     = "q5JceUnDqDkyDlA0Bbn-3IWQRJCBtPp0xjCZqP-qJoJL8jCTBMCODieDjWKxemu-tfCP1W0CVCuGSKHH4JPX0xXIDpOG7zrTvlYdBphT59cZMEm0rZNuX3qX-EXW8LqFCF8FdIecjPypyJ7iVzzMapAhhhdjPfZ6H8uqoRdNygo="
            const _urlAcceso  = "http://localhost:8080/login"
            return  _urlLlave + "?keyClient=" + _keyClient + "&urlAcceso=" + _urlAcceso
        } catch (e) {
            throw e
        }
    },
    cambiarCode: async (code) => {
        try {
            return await _httpLlave.post(`Acceso/cambiarCodigoXToken?code=`+code)
        } catch (e) {
            throw e
        }
    }
}