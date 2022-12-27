<template>
    <div :class="`col-xxl-${cols} col-sm-${colsm}`">
        <div class="card ">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <p class="h6 text-muted mb-3">{{ textoCabecera }}</p>
                        <div class="d-flex" style="align-items:center;">
                            <div class="m-2">
                                <h3 class="ff-secondary fw-semibold m-0">
                                    <count-to
                                        class
                                        :startVal="0"
                                        :endVal="cantidad"
                                        :duration="5000"
                                    ></count-to>
                                </h3>
                            </div>
                            <div>
                                <span class="h5"> {{ descripcionDato }}</span>
                            </div>
                        </div>
                        <p class="text-muted mb-0">
                            {{ textoAlt }}
                        </p>
                    </div>
                    <div style="align-items:flex-end; display: flex;">
                        <div class="avatar-sm flex-shrink-0">
                                <span class="avatar-title bg-light p-2 rounded" :class="iconColor">
                                    <i :class="`mdi ${icono} mdi-36px`"></i>
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CountTo } from "vue3-count-to";

const props = defineProps({
    cantidad       : Number,
    textoCabecera  : String,
    descripcionDato: String,
    textoAlt       : String,
    icono          : String,
    cols           : {
        type   : Number,
        default: 4
    },
    colsm         :{
        type    :Number,
        default : 6
    },
    iconColor      : {
        type   : String,
        default: "text-pantone-green"
    }
})
</script>

<style scoped>

</style>
