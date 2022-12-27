<template>
    <div class="card card-height-100 card-animate">
        <div class="card-body">
            <div class="d-flex flex-column h-100">
                <div class="d-flex">
                    <div class="flex-grow-1"></div>
                    <div class="flex-shrink-0">
                        <div class="d-flex gap-1 align-items-center">
                            <label :class="color">
                                <span class="mdi align-bottom" :class="icono"></span>
                                {{ mensaje }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="d-flex mb-2">
                    <div class="flex-shrink-0 me-3">
                        <div class="avatar-sm">
                    <span class="avatar-title bg-light rounded p-2">
						<i :class="[sistema.icono, 'text-pantone-red', 'mdi-36px', 'mdi']"></i>
                    </span>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <h5 class="mb-1 fs-15">
                            <b class="text-dark">{{ sistema.nombre }}</b>
                        </h5>
                        <p class="text-muted text-truncate-two-lines mb-3">
                            {{ sistema.descripcion }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer bg-transparent py-2 mb-2" style="border:0">
            <div class="d-flex align-items-center">
                <a class="btn-square-round-info w-100" @click="abrirEnlace()">
                    Ir al sitio
                    <i class="mdi mdi-arrow-right-bold mx-2"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import {useSsoStore} from "@/store/modules/sso.store";
import {storeToRefs} from "pinia/dist/pinia";

const ssoStore     = useSsoStore()
const {sesionInactiva} = storeToRefs(ssoStore)

const props = defineProps({
    sistema: Object
})

const abrirEnlace = () => {
    window.open(sesionInactiva.value === true ? props.sistema.url : props.sistema.urlAcceso)
}

const color   = computed(() => props.sistema.publico ? 'text-success' : 'text-warning')
const mensaje = computed(() => props.sistema.publico ? 'Público' : 'Solo personal autorizado')
const icono   = computed(() => props.sistema.publico ? 'mdi-checkbox-marked-circle' : 'mdi-lock')
</script>

<style scoped>

</style>
