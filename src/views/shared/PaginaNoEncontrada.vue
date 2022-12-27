<script setup>
import Lottie from "@/components/widgets/lottie";
import logoDark from "@/components/widgets/logoutDark.json";
import logoLight from "@/components/widgets/logoutLight.json";
import { useLayoutStore } from "@/store/modules/layout.store";
import { storeToRefs } from "pinia";
import { ref } from 'vue'

const layoutStore = useLayoutStore()

const {tema} = storeToRefs(layoutStore)
const title = ref('Página no encontrada')

const lotieOscuro = ref({animationData: logoDark})
const lotieLight  = ref({animationData: logoLight})
</script>

<template>
    <div class="auth-page-wrapper pt-5">
        <!-- auth page bg -->
        <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div class="bg-overlay"></div>
            <div class="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 0 1440 120">
                    <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                </svg>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="text-center mt-sm-5 mb-4 text-white-50">
                    <div>
                        <div class="d-inline-block auth-logo">
                            <img src="@/assets/images/layouts/logos/gob-hz-light.svg" alt="" height="75">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="auth-page-content">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card mt-4">
                            <div class="card-body p-4 text-center">
                                <Lottie
                                    v-if="tema === 'dark'"
                                    :options="lotieOscuro"
                                    :width="300"
                                />
                                <Lottie v-else
                                        :options="lotieLight"
                                        :width="300"
                                />
                                <div class="">
                                    <h3 class="text-uppercase">Página no encontrada</h3>
                                    <p class="text-muted mb-4">La página no está disponible.</p>
                                    <router-link to="/" class="btn-square-round-pantone-green"><i class="mdi mdi-home me-1"></i>Regresar al
                                        inicio
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-center">
                            <p class="mb-0 text-muted">&copy; {{ new Date().getFullYear() }} SEMAIG</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
