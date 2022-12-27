<script setup xmlns="http://www.w3.org/1999/html">
import { useSsoStore } from "@/store/modules/sso.store";
import { useUsuarioStore } from "@/store/modules/usuario.store";
import { useRouter } from "vue-router";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";
import NotificacionError from "@/helpers/notifications/NotificacionError";

const ssoStore     = useSsoStore()
const usuarioStore = useUsuarioStore()
const router       = useRouter()
const { iniciarSesion,cerrarSesion } = ssoStore
const { cargarDatosDeUsuario } = usuarioStore


const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
const code = urlParams.get('code');

const tryToVerify = async () =>{
    try{
        PantallaCarga.mostrar()
        await iniciarSesion(code)
        await cargarDatosDeUsuario()
        await router.push({name: "default"})
    }catch(error){
        await NotificacionError.RutaValidada(error)
         await cerrarSesion()
    } finally {
        PantallaCarga.ocultar()
    }
}

if(urlParams.has('code')){
    tryToVerify();
}
</script>

<template>

</template>
