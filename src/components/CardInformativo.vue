
<template>
    <div class="card">
        <div class="card-body">
            <div class="d-flex align-items-center">
                <div
                    class="flex-shrink-0 avatar-xs align-self-center me-3">
                    <div
                        class="avatar-title bg-light rounded-circle fs-1 text-success">
                        <i :class="`mdi mdi-${icono}`"></i>
                    </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                    <p class="mb-1">{{encabezado}}</p>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <ul class="list-group" >
                   <IconList :icono="opciones.icono" :label="opciones.label" v-for="opciones in listaInfo"/>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconList from "@/components/IconList";
const props = defineProps({
    icono: String,
    encabezado: String,
    listaInfo: Object
})
</script>

<style scoped>
.list-group-item {
    border: 0 !important;
}
</style>