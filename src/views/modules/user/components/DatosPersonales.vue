<template>
  <div class="card-body" id="Datos">

    <HeaderSection tittle="Datos personales del contribuyente" :size-tittle="4"
                   text="Por favor complete la información a continuación"/>
    <div class="row">

      <IconLabel :cols="4" icono="account" label="Nombre:" :texto="nombreCompleto"/>
      <IconLabel :cols="4" icono="badge-account-outline" label="RFC:" :texto="rfc"/>
      <IconLabel :cols="4" icono="card-account-details-outline" label="CURP:" :texto="curp"/>

      <IconLabel :cols="4" icono="email-outline" label="Correo Electrónico:" :texto="email"/>
      <IconLabel :cols="4" icono="phone" label="Teléfono:" :texto="telefono"/>
    </div>
    <HeaderSection tittle="Información de Domicilio"/>
    <div class="row">
      <IconLabel :cols="4" icono="home-group" label="Colonia:" :texto="colonia"/>
      <IconLabel :cols="4" icono="road-variant" label="Calle:" :texto="calle"/>
      <IconLabel :cols="4" icono="home" label="No Exterior:" :texto="numExterior"/>
      <!--#region OPCIONALES-->
      <IconLabel :cols="4" icono="door-closed" label="No Interior:" :texto="numInterior" v-if="numInterior"/>
      <IconLabel :cols="4" icono="crosshairs-gps" label="Referencias:" :texto="referencia" v-if="referencia"/>
      <IconLabel :cols="4" icono="road" label="Cruzamiento 1:" :texto="cruzamiento1" v-if="cruzamiento1"/>
      <IconLabel :cols="4" icono="road" label="Cruzamiento 2:" :texto="cruzamiento2" v-if="cruzamiento2"/>

      <!--#endregion -->

    </div>
  </div>
  <div class="card-footer">
    <div class="mt-2">
      <h6 class="mb-1  ">Estatus del contribuyente en el SAT*</h6>
    </div>
    <div class="row p-2">
      <Multiselect
          v-model="valor"
          :close-on-select="true"
          valueProp="idEstatusSat"
          label="nombre"
          :searchable="false"
          :create-option="true"
          :options="estatusSAT"
          placeholder="Selecciona un sector"
          noOptionsText="No se estatus disponibles"
          :canClear="false"
          :canDeselect="false"
          @select="status(valor)"
          class="form-control"
      />
    </div>
    <div class="mt-2">
      <div class="col-lg-12 py-2" @click="das">
        <div class="hstack gap-2 justify-content-end">
          <b-button variant="btn btn-square-round-pantone-green" @click="siguiente" id="siguiente"> Siguiente
            <i class="mdi mdi-arrow-right-bold align-middle ps-2"></i>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import IconLabel from "@/components/IconLabel";
import HeaderSection from "@/components/headerSection";
import {useUsuarioStore} from "@/store/modules/usuario.store";
import {useSsoStore} from "@/store/modules/sso.store";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {Contribuyentes} from "@/api/connection/providers/Contribuyentes.service";
import Multiselect from "@vueform/multiselect";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {useCitaStorage} from "@/store/modules/cita.store";

import router from "@/router";
const citaStore = useCitaStorage()

const usuarioStore = useUsuarioStore()
const ssoStore = useSsoStore()
const estatusSAT = ref(null)
const valor = ref(null)

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

const {
  idTramite,
  idTipoContribuyente,
  fechaCita,
  idHorario,
  idEstatusSat,
  datosVehiculo
} =storeToRefs(citaStore)


const {email} = storeToRefs(ssoStore)

const status = async (element) => {
  citaStore.idEstatusSat = element;
  let buton = document.querySelector("#siguiente");
  buton.disabled = false;


}
const das = async () => {
  if (valor.value === null) {
    await NotificacionesCitas.Siguiente(' su estatus');

  }
}

const siguiente = () => {
  router.push("/miscitas/citas/tramite");


}

onMounted(async () => {

   estatusSAT.value = await Contribuyentes.obtenerEstatusSAT()


  let buton = document.querySelector("#siguiente");
  buton.disabled = true;
})
</script>