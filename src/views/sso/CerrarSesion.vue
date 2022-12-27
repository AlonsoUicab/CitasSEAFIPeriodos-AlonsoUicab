<script setup>
import Lottie from "@/components/widgets/lottie";
import logoutDark from "@/components/widgets/logoutDark.json";
import logoutLight from "@/components/widgets/logoutLight.json";
import { useLayoutStore } from "@/store/modules/layout.store";
import { storeToRefs } from "pinia";
import { onUnmounted, ref } from 'vue'
import { useRouter } from "vue-router";

const layoutStore = useLayoutStore()
const router      = useRouter()

const {tema} = storeToRefs(layoutStore)

const lotieOscuro = ref({animationData: logoutDark})
const lotieLight  = ref({animationData: logoutLight})

const cerrar10sec = setTimeout(function () {
    router.push({name: 'default'})
}, 10000);

onUnmounted(() => {
    clearTimeout(cerrar10sec)
})
</script>

<template>
    <div class="auth-page-content">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card mt-4">
                        <div class="card-body p-4 text-center">
                            <Lottie v-if="tema === 'dark'" :options="lotieOscuro" :width="300"/>
                            <Lottie v-else :options="lotieLight" :width="300"/>
                            <div class="mt-4 pt-2">
                                <h5>La sesión ha finalizado</h5>
                                <p class="text-muted">Gracias por usar el portal de <span class="fw-semibold">CITAS SEAFI</span>
                                </p>
                                <div class="mt-4">
                                    <button class="btn-square-round-pantone-green w-100"
                                            @click="router.push({name:'default'})">
                                        <i class="mdi mdi-account-arrow-left fs-3 me-1"/>
                                        Regresar al Inicio
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
