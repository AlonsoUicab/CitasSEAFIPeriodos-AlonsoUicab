<template>
    <div class="card">
        <div class="card-header">
            <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0 d-flex"
                role="tablist">
                <li class="nav-item col-md-4 col text-center">
                    <a class="nav-link text-truncate" :class="{'active':opcion===1}"
                       @click="cambiarOpcion(1)"
                       style="cursor: pointer">
                        Trámites en línea
                    </a>
                </li>
                <li class="nav-item col-md-4 col text-center text-pantone-green">
                    <a class="nav-link text-truncate" :class="{'active':opcion===2}"
                       @click="cambiarOpcion(2)"
                       style="cursor: pointer">
                        ¿Como agendar una cita?
                    </a>
                </li>
                <li class="nav-item col-md-4 col text-center text-pantone-green">
                    <a class="nav-link text-truncate" :class="{'active':opcion===3}"
                       @click="cambiarOpcion(3)"
                       style="cursor: pointer">
                        Acerca de las citas
                    </a>
                </li>
            </ul>
        </div>
        <div class="card-body p-4">
            <div class="tab-content">
                <tab-info v-if="opcion === 1"/>
                <tab-requisitos v-else-if="opcion === 2"/>
                <tab-importante v-else/>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import TabInfo from "@/views/shared/components/TabInfo";
import TabRequisitos from "@/views/shared/components/TabRequisitos";
import TabImportante from "@/views/shared/components/TabImportante";

import {ref} from "vue";
const opcion = ref(1)
const cambiarOpcion = (valor) => {
    opcion.value = valor;
}

</script>

<style scoped>

</style>
