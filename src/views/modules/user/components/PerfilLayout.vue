<script setup>
import { useUsuarioStore } from "@/store/modules/usuario.store";
import { useRouter } from "vue-router";
import { useSsoStore } from "@/store/modules/sso.store";
import { storeToRefs } from "pinia/dist/pinia";

const ssoStore     = useSsoStore()
const usuarioStore = useUsuarioStore()
const router       = useRouter()

const {email} = storeToRefs(ssoStore)
const {nombreCompleto, municipio} = storeToRefs(usuarioStore)

const rutaActual = router.currentRoute
</script>

<style scoped>
</style>

<template>

<router-view></router-view>

</template>
