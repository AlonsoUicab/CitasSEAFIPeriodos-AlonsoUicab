import axios from "axios";
import { mensajesError } from "@/api/errors";
import { useSsoStore } from "@/store/modules/sso.store";

const _baseUrl    = process.env.VUE_APP_API_BASE_URL
const _llaveUrl    = process.env.VUE_APP_API_LLAVE_URL
const _httpClient = axios.create({baseURL: _baseUrl})
const _httpLlave = axios.create({baseURL: _llaveUrl})

//CITAS
_httpClient.interceptors.request.use(async (config) => {
    const ssoStore = useSsoStore()
    if (!ssoStore.sesionInactiva) {
        config.headers.Authorization = `Bearer ${ssoStore.token}`
    }
    return config;
}, async (error) => {
    return Promise.reject(error);
});

_httpClient.interceptors.response.use(async (response) => {
    return response.data;
}, async (error) => {
    return Promise.reject(await mensajesError(error));
});

//LLAVE CAMPECHE
_httpLlave.interceptors.request.use(async (config) => {
    const ssoStore = useSsoStore()
    if (!ssoStore.sesionInactiva) {
        config.headers.Authorization = `Bearer ${ssoStore.token}`
    }
    return config;
}, async (error) => {
    return Promise.reject(error);
});

_httpLlave.interceptors.response.use(async (response) => {
    return response.data;
}, async (error) => {
    return Promise.reject(await mensajesError(error));
});

export { _httpClient, _httpLlave }
