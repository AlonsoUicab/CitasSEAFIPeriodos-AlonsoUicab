<script setup>
import Lottie from "@/components/widgets/lottie";
import success from "@/components/widgets/sucess.json";
import {onMounted, reactive, ref,watch,getCurrentInstance} from 'vue'
import HeaderSection from "@/components/headerSection";
import IconLabel from "@/components/IconLabel";
import {useCitaStorage} from "@/store/modules/cita.store";
import {useAutoStorage} from "@/store/modules/vehiculo.store";
import {storeToRefs} from "pinia";
import { useUsuarioStore } from "@/store/modules/usuario.store";
import {useSsoStore} from "@/store/modules/sso.store";

const ssoStore          = useSsoStore()
const usuarioStore      = useUsuarioStore()
const autoStore         = useAutoStorage()
const citaStore         = useCitaStorage()
const paginaActual      = ref(1)
const {generarAcuse}    = citaStore
const {email}           = storeToRefs(ssoStore)
let   {vehiculo, cita}  = autoStore
const {borrarStore}     = autoStore;

const lotieSuccess  = ref({animationData: success})

const state = reactive({
    idCita : cita.idCita,
    sede: cita.sede,
    numFolio : cita.numFolio,
    tipoTramite : cita.tipoTramite,
    idTipoContribuyente: cita.idTipoContribuyente,
    fechaCita : cita.fechaCita,
    horario : cita.horario,
    idEstatusSat : cita.idEstatusSat,
    tipoVehiculo: cita.tipoVehiculo,
    cantidadVehiculos : cita.cantidadVehiculos,
})

const {
  nombreCompleto,
  curp,
  rfc,
  telefono,
  calle,
  numExterior,
  numInterior,
  referencia,
  cruzamiento1,
  cruzamiento2,
  colonia,
} = storeToRefs(usuarioStore)


const cambiarPagina = (num) => {
  paginaActual.value = num
}

const GenerarReporte = async () => {
   //  console.log("numero de folio",state.numFolio,"numero de cita",state.idCita)
    await generarAcuse(state.numFolio,state.idCita)
}

watch( cita,  () => {
  cita = null
  borrarStore();

})
onMounted( () => {
  cita = null;
  borrarStore();

})

function deshabilitaRetroceso(){
  window.location.hash="no-back-button";
  window.location.hash="Again-No-back-button" //chrome
  window.onhashchange=function(){window.location.hash="Cita-finalizada";}
}
deshabilitaRetroceso();

</script>

<template>
<!--  v-show="cita.value.length !== null"-->
  <div class="card-body" >
      <div class="text-center" >
                <Lottie
                    :options="lotieSuccess"
                    :width="300"
                />
<!--          <i class="mdi mdi-progress-check text-seafi-aqua" style="font-size:150px"/>-->
          <HeaderSection tittle="Cita agendada con" highlight="ÉXITO" color-highlight="seafi-aqua" :size-tittle="4" padding="pt-0"
                         text="Recibirá un correo electrónico de confirmación con los detalles de la cita" margin-text="mb-1"/>
          <h4 class="pt-0 mb-5">No. de folio: <span class="text-seafi-blue fs-2">{{ state.numFolio }}</span></h4>
      </div>
      <div class="row px-lg-5" >
          <IconLabel :cols="4" icono="calendar" label="Fecha de la cita" :texto="state.fechaCita"/>
          <IconLabel :cols="4" icono="clock-outline" label="Hora de la cita" :texto="state.horario"/>
          <IconLabel :cols="4" icono="map-marker" label="Ubicación de la Cita" :texto="state.sede"/>

          <IconLabel :cols="4" icono="account" label="Nombre del Contribuyente" :texto="nombreCompleto"/>
          <IconLabel :cols="4" icono="file-certificate-outline" label="Tipo de Contribuyente" texto="DUEÑO"/>
          <IconLabel :cols="4" icono="email" label="Correo Electrónico" :texto="email"/>

          <IconLabel :cols="4" icono="file-document-outline" label="Tramite" :texto="state.tipoTramite"/>

          <IconLabel  :cols="4" icono="car-hatchback" label="Tipo de Vehículo" :texto="state.tipoVehiculo"/>

          <IconLabel v-if="state.cantidadVehiculos" :cols="4" icono="numeric" label="Cantidad de Vehículos" :texto="(state.cantidadVehiculos).toString()"/>
      </div>
  </div>

  <div class="card-footer">
      <div class=" px-lg-5">
          <div class="card alert alert-warning">
              <p class="fw-bold m-1 text-center">IMPORTANTE</p>
              <span style="text-align: justify;">
                        En caso de <b>REAGENDAR O CANCELAR</b> una cita, solo puede realizarse hasta <b>3 días antes</b>
                        de la fecha programada, de lo contrario no se podrán hacer cambios, queda bajo criterio del contribuyente el no asistir a su cita y las
                        <b>sanciones</b> que ocasiona.
                    </span>
          </div>
      </div>

      <div class="col-lg-12 py-2">
          <div class="hstack gap-2 justify-content-end">
              <b-button class="m-2" variant="btn btn-square-soft-pantone-gray" to="/miscitas/historial">
                  <i class=" mdi mdi-calendar-account align-middle pe-2"></i>Ir a Historial de Citas
              </b-button>
              <b-button variant="btn btn-square-round-pantone-green" @click="GenerarReporte()"> Descargar Requisitos del Trámite
                  <i class="mdi mdi-download align-middle ps-2"></i>
              </b-button>
          </div>
      </div>
  </div>

</template>

