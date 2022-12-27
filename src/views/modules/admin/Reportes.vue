<script setup>
import PageHeader from "@/layouts/content/PageHeader";
import flatPickr from "vue-flatpickr-component";
import Pickr from "@simonwep/pickr";
import {onMounted, ref, reactive} from "vue";
import WidgetContador from "@/components/WidgetContador";
import "flatpickr/dist/flatpickr.css";
import "@simonwep/pickr/dist/themes/classic.min.css"; // 'classic' theme
import Multiselect from "@vueform/multiselect";
import {requisitostramite} from "@/api/mocks/datos-informativos.mock";
import {opcionesSelect} from "@/api/mocks/opciones.mock";
import {ReportesService} from "@/api/connection/providers/Reporte.service";
import useVuelidate from "@vuelidate/core";
import { helpers, numeric, required, requiredIf } from "@vuelidate/validators";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import NotificacionError from "@/helpers/notifications/NotificacionError";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";


const year = new Date().getFullYear()
const contadores =  ref([])
const tipoReportes = ref(null)
const tipoDocumentos = ref([{tipoDocumento: 1, nombre: "PDF"}, {tipoDocumento: 2, nombre: "Excel"}])
const datenow = new Date().toLocaleDateString();

const state = reactive({
    idTipoReporte   : 1,
    tipoDocumento   : 1,
    fechaInicio     : datenow,
    fechaFin        : datenow,

})

const rules = {
    idTipoReporte  : {
        required: helpers.withMessage("Este campo es obligatorio", required),
    },
    tipoDocumento :{
        required: helpers.withMessage("Este campo es obligatorio", required),
    },
    fechaInicio :{

    },
    fechaFin :{
        required: helpers.withMessage("Este campo es obligatorio", required),
    },
}

const v$ = useVuelidate(rules, state)


const humanfriendlyConfig = {
    defaultDate: "today",
    dateFormat: "d/m/Y",
}

const generarReporte= async () => {
    try{
        PantallaCarga.mostrar()
        let peticion = await ReportesService.generarReportes(UtilsDate.toYearMonthDay(state.fechaInicio),UtilsDate.toYearMonthDay(state.fechaFin),state.idTipoReporte, state.tipoDocumento)
        console.log(peticion)
        let blob = peticion
        let url = window.URL.createObjectURL(new Blob([blob]));
        let link = document.createElement('a');
        link.href = url;
        link.download = `Reporte${ state.tipoDocumento === 1 ? ".pdf" : ".xlsx"}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        PantallaCarga.ocultar()
    }catch (e){
        await NotificacionError.Reportes("No se encontraron citas en el rango de fechas");
    }finally {
        PantallaCarga.ocultar()
    }
}

const obtenerContadores = async () => {
    let totales =  ref([])
    totales.value = await ReportesService.obtenerConteoCitasPorAnio()
  contadores.value.push({
    cantidad: totales.value[0],
    cabecera: "Total de citas AGENDADAS",
    textAlt: `agendadas en el ${year}`,
    icono: "mdi-calendar",
    iconColor: "text-pantone-green"
  })
  contadores.value.push({
    cantidad: totales.value[1],
    cabecera: "Total de citas CANCELADAS",
    textAlt: `canceladas en el ${year}`,
    icono: "mdi-calendar-remove",
    iconColor: "text-pantone-red"
  })
  contadores.value.push({
    cantidad: totales.value[2],
    cabecera: "Total de citas con REQUISITOS COMPLETOS",
    textAlt: `atendidas en el ${year}`,
    icono: "mdi-file-check",
    iconColor: "text-pantone-green"
  })
  contadores.value.push({
    cantidad: totales.value[3],
    cabecera: "Total de citas REQUISITOS INCOMPLETOS",
    textAlt: `atendidas en el ${year}`,
    icono: "mdi-file-remove",
    iconColor: "text-pantone-red"
  })
}

onMounted(async ()=>{
    await obtenerContadores()
    tipoReportes.value = await ReportesService.obtenerTiposReportes()
})
</script>

<template>
    <PageHeader title="Reportes"/>
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

    <div class="card mt-3">
        <div class="card-body m-3">
            <p class="fs-21 mb-0 fw-semibold">Reportes</p>
            <div class="row mt-4">
                <div class="col-lg-3">
                    <div class="mb-3">
                        <label for="zipcodeInput" class="form-label">Fecha Inicio <span
                            class="text-danger">*</span></label>
                        <flat-pickr
                            v-model="v$.fechaInicio.$model"
                            :config="humanfriendlyConfig"
                            class="form-control flatpickr-input"
                        ></flat-pickr>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="mb-3">
                        <label for="zipcodeInput" class="form-label">Fecha Fin <span
                            class="text-danger">*</span></label>
                        <flat-pickr
                            v-model="v$.fechaFin.$model"
                            :config="humanfriendlyConfig"
                            class="form-control flatpickr-input"
                        ></flat-pickr>
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="mb-2">
                        <label for="zipcodeInput" class="form-label">Tipo de reporte <span
                            class="text-danger">*</span></label>
                        <Multiselect
                            v-model="v$.idTipoReporte.$model"
                            :show-labels="false"
                            placeholder="Buscar un tramite"
                            label="tipoReporte"
                            :options="tipoReportes"
                            valueProp="idTipoReporte"
                            :canClear="false"
                            :canDeselect="false"
                        />
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="mb-3">
                        <label for="zipcodeInput" class="form-label">Tipo de Documento <span
                            class="text-danger">*</span></label>
                        <Multiselect
                            v-model="v$.tipoDocumento.$model"
                            :show-labels="false"
                            placeholder="Buscar un tramite"
                            label="nombre"
                            :options="tipoDocumentos"
                            valueProp="tipoDocumento"
                            :canClear="false"
                            :canDeselect="false"
                        />
                    </div>
                </div>
            </div>
            <div class="mt-2">
                <div class="col-lg-12 py-2">
                    <div class="hstack gap-2 justify-content-end">
                        <b-button variant="btn btn-square-round-pantone-green" @click="generarReporte()">
                            <i class="mdi mdi-file-check align-middle pe-2"></i> Generar Reporte
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
