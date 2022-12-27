<script setup>
import { ref } from "vue";
import NavBar from "@/layouts/components/NavBar";
import Footer from "@/layouts/components/Footer";
import BarraMenu from "@/layouts/components/BarraMenu";

import { useSsoStore } from "@/store/modules/sso.store";
import { useUsuarioStore } from "@/store/modules/usuario.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const ssoStore     = useSsoStore()
const usuarioStore = useUsuarioStore()
const router       = useRouter()

const {sesionInactiva} = storeToRefs(ssoStore)
const navBar           = ref()

const pageContent = (sesionInactiva.value) ? 'page-content-nosesion' : 'page-content'
</script>

<template>
    <div id="layout-wrapper">
        <NavBar ref="navBar"/>
        <BarraMenu v-if="!sesionInactiva"/>
        <div class="main-content">
            <div :class="pageContent">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.btn {
    padding: 0.1rem 0.5rem !important;
}
/*.container-fluid {
    padding-left: 0 !important;
    padding-right: 0 !important;
}*/
</style>
