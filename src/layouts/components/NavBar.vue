<script setup>
import CambiarTema from '@/components/CambiarTema'
import { useSsoStore } from "@/store/modules/sso.store";
import { useUsuarioStore } from "@/store/modules/usuario.store";
import { authService } from "@/api/connection/providers/Auth.service";
import NotificacionConfirm from "@/helpers/notifications/NotificacionConfirm";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Tooltip from 'bootstrap/js/dist/tooltip'
import { useRoute } from "vue-router";
import { useLayoutStore } from "@/store/modules/layout.store";

const layoutStore   = useLayoutStore()
const ssoStore      = useSsoStore()
const usuarioStore  = useUsuarioStore()
const hamburgerMenu = ref(null)
const route         = useRoute()

const {nombreCompleto} = storeToRefs(usuarioStore)

const {email,tiempoRestante, expiraEn, sesionInactiva} = storeToRefs(ssoStore)

const {tema} = storeToRefs(layoutStore)

const {renovarSesion, cerrarSesion, iniciarContador} = ssoStore


const mostrarAlert = ref(false)

const toggleHamburgerMenu = () => {
    hamburgerMenu.value.classList.toggle('open')
    document.body.classList.toggle("menu")
}

const confirmarCierreSesion = async () => {
    const confirmacion = await NotificacionConfirm.CerrarSesion()
    if (confirmacion.isConfirmed) {
        await cerrarSesion()
    }
}

const continuarSesion = async () => {
    mostrarAlert.value = true
    const confirmacion = await NotificacionConfirm.ContinuarSesion()
    if (confirmacion.isConfirmed) {
        await renovarSesion()
    }
}

onMounted(() => {
    iniciarContador()
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl)
    })
})

onBeforeUnmount(() => {
    NotificacionConfirm.cerrarDialogo()
})

watch(tiempoRestante, (value) => {
    if (value < 6 && !mostrarAlert.value && value > 0) {
        continuarSesion()
    }
})

defineExpose({
    toggleHamburgerMenu,
})

const abrirEnlace = async () => {
    let url = await authService.loginLlave()
    window.open(url,'_self',false)
}

</script>

<template>
    <header id="page-topbar">
        <div class="layout-width">
            <div class="navbar-header">
                <div class="d-flex">
                    <!-- LOGO -->
                    <div class="navbar-brand-box horizontal-logo">
                        <div class="logo">
                            <span class="logo-sm">
                                <img src="@/assets/images/layouts/logos/gob-hz.svg" alt="" height="50"
                                     v-if="tema === 'light'"/>
                                <img src="@/assets/images/layouts/logos/gob-hz-light.svg" alt="" height="50"/>
                            </span>
                            <span class="logo-lg">
                                <img src="@/assets/images/layouts/logos/gob-hz.svg" alt="" height="50"
                                     v-if="tema === 'light'"/>
                                <img src="@/assets/images/layouts/logos/gob-hz-light.svg" alt="" height="50"
                                     v-else/>
                            </span>
                        </div>
                    </div>

                    <a style="cursor: pointer" class="btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                       id="topnav-hamburger-icon" @click="toggleHamburgerMenu" ref="menuIcon"
                       v-if=" !sesionInactiva">
                        <span class="hamburger-icon" ref="hamburgerMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                </div>

                <div class="d-flex align-items-center">
                    <CambiarTema/>

                    <div class="dropdown ms-sm-3 header-item p-2" v-if="!sesionInactiva">
                        <a class="btn-ghost-pantone-gold" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false" style="cursor: pointer">
                            <span class="d-flex align-items-center">
                                <span class="avatar-xs">
                                    <span
                                        class="avatar-title bg-pantone-green rounded p-2 rounded-circle text-white border border-pantone-gray-light border-3">
                                        <i class="text-white mdi-account mdi mdi-18px"></i>
                                    </span>
                                </span>
                                <span class="text-start ms-xl-2">
                                    <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text" >
                                        {{ nombreCompleto }}</span>
                                    <span
                                        class="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text text-lowercase">
                                        {{ email }}
                                    </span>
                                </span>
                            </span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <h6 class="dropdown-header fw-bold fs-5">Bienvenido</h6>
                            <p class="dropdown-item-text">La sesión finaliza {{ expiraEn }}</p>
                            <a class="dropdown-item"
                               @click="confirmarCierreSesion">
                                <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                                <span class="align-middle" style="cursor: pointer">Cerrar Sesión</span>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-else>
                        <div class="ms-1 header-item">
                            <div class="d-flex align-items-center">
                                <a class="btn btn-pantone-green"
                                             data-bs-toggle="tooltip"
                                             data-bs-placement="left"
                                             title="Ir al Portal"
                                             style="cursor: pointer"
                                             @click="abrirEnlace()"
                                   >
                                    <div class="d-flex align-items-center">
                                        <div class="flex-shrink-0 avatar-xs align-self-center me-2 ">
                                            <img src="@/assets/images/layouts/logos/gob-light.png" alt="" height="30"/>
                                        </div>
                                        <div class="overflow-hidden mt-1">
                                            <small class="mb-1 text-white">Iniciar Sesión con</small>
                                            <p class="mb-1">LLAVE CAMPECHE</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.nav {
    justify-content: space-around;
}
.btn {
    padding: 0.1rem 0.5rem !important;
}
</style>
