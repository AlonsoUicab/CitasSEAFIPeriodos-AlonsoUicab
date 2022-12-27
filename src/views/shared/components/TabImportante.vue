<template>
<div class="row">
    <div class="col-md-6">
        <img src="@/assets/images/layouts/defaultView/asset06_seafi.png" title="Imagen por vectorjuice en Freepik"  alt="" style="width: 100%; display: block;
            padding: 1rem"/>
    </div>
        <div class="col-md-6 d-flex align-items-center">
            <div>
                <h4 class="text-center active fw-semibold">¡Importante!</h4>
                <ul class="list-group" >
                    <li class="list-group-item fw-bold" v-for="advertencia in advertenciasCitas">
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 ">
                                        <i :class="`mdi mdi-${advertencia.icon} fs-4 me-2 align-middle`"></i>
                                    </div>
                                    <div class=" ms-2">
                                        <h6 class="fs-14 mb-0 ">{{ advertencia.text }}</h6>
                                        <small class="text-muted">{{ advertencia.span }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
          </div>
        </div>
    </div>
</template>

<script setup>
import { advertenciasCitas } from "@/api/mocks/datos-informativos.mock.js";

</script>

<style scoped lang="scss">
.list-group-item{
    border:0 !important;
}
.list-group{
    margin: 0 !important;
    padding: 0 !important;
}
</style>