import { createPinia } from "pinia";
import { storePlugin } from 'pinia-plugin-store';

const storePinia = createPinia()

function encrypt(value) {
    return btoa(JSON.stringify(value))
}

function decrypt(value) {
    return JSON.parse(atob(value))
}

const plugin = storePlugin({
    stores: [
        'sso',
        'layout',
        'usuario',
        'administrador'
    ],
    storage: localStorage,
    encrypt,
    decrypt,
});

storePinia.use(plugin);

export default storePinia