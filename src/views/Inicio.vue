<script setup>
import ContenedorInicio from "@/views/shared/components/ContenedorInicio.vue";
import {storeToRefs} from "pinia";
import {useSsoStore} from "@/store/modules/sso.store";

const ssoStore = useSsoStore()
const {sesionInactiva} = storeToRefs(ssoStore)



</script>

<template>
    <div class="profile-foreground position-relative mx-n4 mt-n4">
        <div class="profile-wid-notbg">
            <div class="profile-wid-img"></div>
        </div>
    </div>
    <div class="pt-4 mb-4 mb-sm-3 pb-sm-4">
        <div class="row g-4">
            <div class="col-auto">
                <div class="avatar-lg">
                    <span
                        class="avatar-title bg-white rounded p-2 rounded-circle text-white border border-pantone-gray-light border-3">
                        <img src="@/assets/images/layouts/logos/logo_seafi.svg" alt="" height="50"/></span>
                </div>
            </div>
            <div class="col">
                <div class="p-2">
                    <h3  v-if="!sesionInactiva" class="text-pantone-gold mb-0"
                         style="font-family: 'QuatroSlab'">
                            Bienvenido a:
                    </h3>
                    <h2 class="text-seafi-blue mb-0  fw-semibold"
                        style="font-family: 'QuatroSlab'">
                        Citas para Trámites Vehiculares
                    </h2>
                    <h5 class="fw-semibold text-wrap text-seafi-blue"
                        style="min-width:17rem;">
                        SEAFI | Servicio de Administración Fiscal del Estado de Campeche
                    </h5>
                    <div v-if="sesionInactiva" class="hstack text-seafi-blue gap-1" id="info"
                         style="max-width:455px">
                        <div class="me-2 fw-semibold">
                            <i class="mdi mdi-map-marker me-1 fs-16 text-seafi-blue align-middle"></i>
                            Calle 49-C o Circuito Baluartes No. 39 | C.P.24010
                        </div>
                    </div>
                    <div v-if="sesionInactiva" class="hstack text-seafi-blue gap-1" id="info"
                         style="max-width:455px">
                        <div class="me-2 fw-semibold">
                            <i class="mdi mdi-cellphone me-1 fs-16 text-seafi-blue align-middle"></i>
                            981-881-9200 ext. 525003 ext. 52353
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--  INICIO   Contenido Informativo(Redes Sociales, Card de Pagina Inicio)-->
    <div class="row mx-n4 mt-n4">
        <div class="col-md-12">
            <div class="d-flex justify-content-end">
                <div class="flex-grow-0 mx-3" style="height:25px">
                    <a class="btn btn-light rounded-circle mx-1"
                       href="https://www.facebook.com/seaficamp" target="_blank">
                        <i class="mdi mdi-facebook fs-3 text-pantone-gray"></i>
                    </a>
                    <a class="btn btn-light rounded-circle mx-1"
                       href="https://twitter.com/seaficamp"
                       target="_blank">
                        <i class="mdi mdi-twitter fs-3 text-pantone-gray"></i>
                    </a>
                    <a class="btn btn-light rounded-circle mx-1"
                       href="https://www.instagram.com/seaficamp/"
                       target="_blank">
                        <i class="mdi mdi-instagram fs-3 text-pantone-gray"></i>
                    </a>
                    <a class="btn btn-light rounded-circle mx-1"
                       href="https://seafi.campeche.gob.mx/"
                       target="_blank">
                        <i class="mdi mdi-web fs-3 text-pantone-gray"></i>
                    </a>
                </div>
            </div>
            <div class="container-xl px-0 py-3">
                <div class="tab-content pt-4 text-muted">
                    <ContenedorInicio/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media (max-width: 601px) {
   #info{
       display: none;
   }
}
</style>
