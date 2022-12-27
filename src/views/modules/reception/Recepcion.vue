<!--TODO: Cambiar el nombre del servicio-->
<script setup>
import WidgetContador from "@/components/WidgetContador";
import { onMounted, ref } from 'vue';
import PageHeader from "@/layouts/content/PageHeader";
import TablaRecepcion from "@/views/modules/reception/components/TablaRecepcion";
import CardRequisitos from "@/views/modules/reception/components/CardRequisitos.vue"
import {RecepcionistaService} from "@/api/connection/providers/Recepcionista.service";

const contadores =  ref([])
let totales =  ref([])

const obtenerContadores = async () => {
    totales.value = await RecepcionistaService.obtenerConteoCitasPorFechaActual()
    contadores.value.push({
        cantidad:totales.value[0],
        cabecera: "Total de citas agendadas",
        textAlt: "Totales para el día de hoy",
        icono: "mdi-calendar-account",
        iconColor: "text-pantone-green"
    })
    contadores.value.push({
        cantidad:totales.value[1],
        cabecera: "Total de citas faltantes por atender",
        textAlt: "Restantes el día de hoy",
        icono: "mdi-calendar-clock",
        iconColor: "text-pantone-green"
    })
    contadores.value.push({
        cantidad:totales.value[2],
        cabecera: "Total de citas con requisitos completos",
        textAlt: "el día de hoy",
        icono: "mdi-file-check",
        iconColor: "text-pantone-green"
    })
    contadores.value.push({
        cantidad:totales.value[3],
        cabecera: "Total de citas con requisitos incompletos",
        textAlt: "el día de hoy",
        icono: "mdi-file-remove",
        iconColor: "text-pantone-red"
    })
}

const actualizarContadores = async () => {
    totales.value = await RecepcionistaService.obtenerConteoCitasPorFechaActual()
    contadores.value[0].cantidad = totales.value[0]
    contadores.value[1].cantidad = totales.value[1]
    contadores.value[2].cantidad = totales.value[2]
    contadores.value[3].cantidad = totales.value[3]
}

onMounted(() => {
    obtenerContadores()
})
</script>

<template>
    <PageHeader title="Recepción de Citas"/>
    <div class="row">
        <WidgetContador v-for="citas in contadores"
                        :cantidad="citas.cantidad"
                        :texto-cabecera="citas.cabecera"
                        descripcion-dato="citas"
                        :texto-alt="citas.textAlt"
                        :icono="citas.icono"
                        :cols="3"
                        :icon-color="citas.iconColor"
        />
    </div>
    <div class="row">
        <div class="col-xl-8 col-lg-8">
            <TablaRecepcion @updateEstadistica="actualizarContadores"/>
        </div>
        <div class="col-xl-4 col-lg-4">
            <CardRequisitos/>
        </div>
    </div>
</template>