<template>
    <div class="app-menu navbar-menu">
        <div id="scrollbar">
            <div class="container-fluid">
                <ul class="navbar-nav h-100" id="navbar-nav">
                    <li class="menu-title">
                        <span data-key="t-menu">Menú</span>
                    </li>
                    <li class="nav-item">
                        <router-link
                            :to="{name: 'default'}"
                            v-slot="{ isActive }"
                            class="nav-link menu-link"
                            @click="ocultarTodo">
                            <i class="mdi mdi-home" :class="[{ 'active-link': isActive }]"></i>
                            <span :class="{ 'active': isActive,}"> Inicio </span>
                        </router-link>
                    </li>
                    <MenuModuloOpcion
                        v-for="(modulo) in modulos"
                        :modulo="modulo"
                    />
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import MenuModuloOpcion from "@/layouts/content/MenuComponent";
import {getCurrentInstance, onMounted} from "vue";
import { storeToRefs } from "pinia";
import {useUsuarioStore} from "@/store/modules/usuario.store";
import {CitasService} from "@/api/connection/providers/Citas.service";
// import {modulosOpc} from "@/api/mocks/opciones.mock"

const usuarioStore = useUsuarioStore()
const { cargarModulos } = usuarioStore
const {modulos} = storeToRefs(usuarioStore)
const instance   = getCurrentInstance();

const ocultarTodo = () => {
    instance.parent.refs.navBar.toggleHamburgerMenu()
}
const recargarModulos = async () => {
    await cargarModulos()
}
onMounted(async () => {
 recargarModulos()
})

</script>

<style scoped>

</style>