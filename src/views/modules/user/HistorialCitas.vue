<script setup>
import WidgetContador from "@/components/WidgetContador";
import PageHeader from "@/layouts/content/PageHeader";
import TablaCitas from "@/views/modules/user/components/content/TablaCitas";
import { onMounted, ref } from 'vue'
import {CitasService} from "@/api/connection/providers/Citas.service";
import {RecepcionistaService} from "@/api/connection/providers/Recepcionista.service";

const contadores =  ref([])
let totales =  ref([])

const obtenerContadores = async () => {
    totales.value = await CitasService.estadisticasCitasPorAnio()
    contadores.value.push({
        cantidad:totales.value[0],
        cabecera: "Total de citas",
        textAlt: "totales",
        icono: "mdi-calendar",
        iconColor: "text-pantone-green"
    })
    contadores.value.push({
    cantidad:totales.value[1],
    cabecera: "Total de citas canceladas",
    textAlt: "totales",
    icono: "mdi-calendar-remove",
    iconColor: "text-pantone-red"
  })
  contadores.value.push({
    cantidad:totales.value[2],
    cabecera: "Total de citas Atendidas Correctamente",
    textAlt: "totales",
    icono: "mdi-file-check",
    iconColor: "text-pantone-green"
  })
  contadores.value.push({
    cantidad:totales.value[3],
    cabecera: "Total de citas Atendidas",
    textAlt: "sin documentacion completa en total",
    icono: "mdi-file-remove",
    iconColor: "text-pantone-red"
  })
}

const actualizarContadores = async () => {
    totales.value = await CitasService.estadisticasCitasPorAnio()
    contadores.value[0].cantidad = totales.value[0]
    contadores.value[1].cantidad = totales.value[1]
    contadores.value[2].cantidad = totales.value[2]
    contadores.value[3].cantidad = totales.value[3]
}


onMounted(() => {
    obtenerContadores()
})


</script>

<style scoped>
</style>

<template>
    <PageHeader title="Historial de Citas"/>
    <div class="row">
        <WidgetContador v-for="sistema in contadores"
            :cantidad="sistema.cantidad"
            :texto-cabecera="sistema.cabecera"
            descripcion-dato="citas"
            :texto-alt="sistema.textAlt"
            :icono="sistema.icono"
            :cols="3"
            :icon-color="sistema.iconColor"
        />
    </div>
  <TablaCitas @updateEstadistica="actualizarContadores" :Inicio="false"/>
</template>