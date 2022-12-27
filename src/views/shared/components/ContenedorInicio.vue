<template>
    <div id="overview-tab" role="tabpanel">
        <div class="row">
            <div class="col-xl-4 col-lg-3">
                <CardReporteProblema />
                <CardInformativo v-if="sesionInactiva"
                    icono="checkbox-multiple-marked-circle-outline"
                    encabezado="Lo que puedes hacer en este sitio:" :listaInfo="opcionesDeUso" />

                <WidgetContador v-else v-for="citas in contadores"
                                :cantidad="citas.cantidad"
                                :texto-cabecera="citas.cabecera"
                                descripcion-dato="citas"
                                :texto-alt="citas.textAlt"
                                :icono="citas.icono"
                                :cols="12"
                                :colsm="12"
                                :icon-color="citas.iconColor"
                />
            </div>
            <!-- Contenido Informativo-->
            <div class="col-xl-8 col-lg-9">
                <TabsDefault v-if="sesionInactiva"/>
                <TablaCitas :num-registros="5" :tipo-estatus="1" :Inicio="true"
                    v-else-if="!sesionInactiva" />
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useSsoStore} from "@/store/modules/sso.store";
import {storeToRefs} from "pinia/dist/pinia";
import CardReporteProblema from "@/components/CardReporteProblema";
import CardInformativo from "@/components/CardInformativo";
import WidgetContador from "@/components/WidgetContador";
import TabsDefault from "@/views/shared/components/TabsDefault";
import TablaCitas from "@/views/modules/user/components/content/TablaCitas";
import { opcionesDeUso } from "@/api/mocks/datos-informativos.mock";
import {CitasService} from "@/api/connection/providers/Citas.service";

const ssoStore = useSsoStore()
const {sesionInactiva} = storeToRefs(ssoStore)
const contadores =  ref([])

const obtenerContadores = async () => {
    let totales =  ref([])
    totales.value = await CitasService.estadisticasCitasPorPeriodo()
    contadores.value.push({
        cantidad: totales.value[0],
        cabecera: "Total de Citas Agendadas",
        textAlt: "Activas en el periodo",
        icono: "mdi-calendar-check",
        iconColor: "text-pantone-green"
    })
    contadores.value.push({
        cantidad: totales.value[1],
        cabecera: "Total de Inasistencias",

        textAlt: "Inasistencia en el mes",

        icono: "mdi-account-remove",
        iconColor: "text-warning"
    })
}

onMounted(() => {
    if(sesionInactiva.value === false)
        obtenerContadores()

})
</script>
