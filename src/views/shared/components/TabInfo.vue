<script setup>
import {storeToRefs} from "pinia";
import {useSsoStore} from "@/store/modules/sso.store";
import {useUsuarioStore} from "@/store/modules/usuario.store";
import {onMounted, onUnmounted, ref} from "vue";
import Tooltip from 'bootstrap/js/dist/tooltip'
import {authService} from "@/api/connection/providers/Auth.service";

const ssoStore = useSsoStore()
const usuarioStore = useUsuarioStore()
const {sesionInactiva} = storeToRefs(ssoStore)
const {nombreCompleto} = storeToRefs(usuarioStore)
const tooltips = ref()

const abrirEnlace = async () => {
    let url = await authService.loginLlave()
    window.open(url,'_self',false)
}

onMounted(() => {
    let tooltipsTemp = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltips.value = tooltipsTemp.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl))
})

onUnmounted(() => {
    tooltips.value.forEach(x => x.hide())
})
</script>

<template>
    <div class="row">
        <div class="col-md-6">
            <img src="@/assets/images/layouts/defaultView/asset01_seafi.png" alt="" style="width: 100%; display: block;
            padding: 2rem"/>
        </div>
        <div  class="col-md-6 d-flex align-items-center">
            <div class="text-center">
                <div v-if="!sesionInactiva">
                    <h4>Bienvenido <small class="active fw-semibold">{{nombreCompleto}}</small> a:</h4>
                </div>
                <h1 class="text-seafi-red fw-semibold">Agenda tus citas en línea</h1>
                <h5 class="my-4">A través
                    <strong class="fw-lighter" >
                        LLAVE<i class="mdi mdi-cursor-default-click text-pantone-gold "></i>CAMPECHE
                    </strong>
                    puedes agendar citas para
                  <strong class="text-seafi-red-dark">Tramites Vehículares de la SEAFI </strong>
                </h5>
                <p class="my-2">Para las personas Físicas, Físicas con Actividad Empresarial o Personas Morales,
                  es mucho más fácil y rápido administrar su citas por Internet.</p>
                <div class="my-4"  v-if="sesionInactiva">
                    <div class="d-flex justify-content-center mb-1">
                        <a class="btn btn-pill-seafi-red"
                             data-bs-toggle="tooltip"
                             data-bs-placement="left"
                             title="Ir a Iniciar Sesión"
                             style="cursor: pointer;"
                             @click="abrirEnlace()">
                            <div class="d-flex align-items-center px-2">
                                <div class="flex-shrink-0 avatar-xs align-self-center me-2 ">
                                    <img src="@/assets/images/layouts/logos/gob-light.png" alt="" height="30"/>
                                </div>
                                <div class="flex-grow-1 overflow-hidden mt-0">
                                    <small class="mb-1 text-white">Iniciar Sesión con</small>
                                    <p class="mb-0">LLAVE CAMPECHE</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="align-items-center">
                        <p class="fst-italic">¿Aun no tienes cuenta?
                            <a href="http://llave.presentacion.campeche.gob.mx/register"
                                              class="fw-bold fst-normal text-seafi-aqua"> Registrate</a>
                        </p>
                    </div>
                </div>
                <div class="my-4" v-else>
                    <div class="d-flex justify-content-center mb-1">
                        <router-link class="btn btn-pill-pantone-green"
                                     data-bs-toggle="tooltip"
                                     data-bs-placement="left"
                                     title="Regresar al Portal"
                                     style="cursor: pointer;"
                                     :to="{name:'default'}">
                            <i class="mdi mdi-home text-white fs-4 me-2"></i>
                             Regresar al Portal
                        </router-link>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="me-4 fs-4 text-seafi-aqua">
                       <i class="mdi mdi-timer me-1 fs-4 align-middle"></i>
                        Rápido
                    </div>
                    <div class="me-4 fs-4 text-seafi-aqua">
                        <i class="mdi mdi-shield-account me-1 fs-4 align-middle"></i>
                        Seguro
                    </div>
                    <div class="fs-4 text-seafi-aqua">
                        <i class="mdi mdi-sofa-single me-1 fs-4 align-middle"></i>
                        Cómodo
                    </div>
                </div>
          </div>
        </div>
    </div>
</template>



<style scoped>

</style>
