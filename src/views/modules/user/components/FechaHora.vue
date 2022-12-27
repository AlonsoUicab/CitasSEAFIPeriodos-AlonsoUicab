<script setup>
import {useAutoStorage} from "@/store/modules/vehiculo.store";
import HeaderSection from "@/components/headerSection";
import {useRouter} from "vue-router";
import {diasOcupados, HorariosCitas, diasInhabiles} from "@/api/mocks/datos-informativos.mock";
import {onBeforeMount, onMounted, reactive, ref, toRef, toRefs, watch} from "vue";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";
import {useCitaStorage} from "@/store/modules/cita.store";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import {CitasService} from "@/api/connection/providers/Citas.service";
import {storeToRefs} from "pinia";
import NotificacionError from "@/helpers/notifications/NotificacionError";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";
import Calendario from "@/views/modules/user/components/content/Calendario"
import FlatPickr from "vue-flatpickr-component";
import Multiselect from "@vueform/multiselect";

const citaStore = useCitaStorage()
const vehiculoStore = useAutoStorage();
const {vehiculo} = vehiculoStore
const {cita} = storeToRefs(vehiculoStore);

const router = useRouter();
const {borrarStore} = vehiculoStore;
const {consultaDias} = citaStore

const state = reactive({
  horaSeleccionada: "",
  diaSeleccionado: ""
})

const Cita = reactive({
  idTramite: citaStore.idTramite,
  idTipoContribuyente: citaStore.idTipoContribuyente, //apoderado o dueño valores entre 1 y 2
  fechaCita: citaStore.fechaCita,
  idHorario: null,
  idEstatusSat: citaStore.idEstatusSat,
  datosVehiculo: vehiculo
})


const cambio = async (horaSeleccionada,diaSeleccionado) => {

  if (await validar(horaSeleccionada,diaSeleccionado)) {
    citaStore.fechaCita = state.diaSeleccionado
    Cita.idHorario = state.horaSeleccionada; //definir dos veces
    citaStore.idHorario = state.horaSeleccionada;
    Cita.fechaCita = state.diaSeleccionado
    //Modificar valores para guardar la cita
  }
}

const finalizar = async () => { //validar y pasar a la otra interfaz
  try {
    PantallaCarga.mostrar()
    cita.value = await CitasService.guardarCita(Cita)
    await router.push('/miscitas/citas/finalizar');

  } catch (e) {
    await NotificacionError.Agendar(e)
  }
  finally {
    PantallaCarga.ocultar()

  }
}

const validar = async (horaSeleccionada, diaSeleccionado) => {

  let botonFinalizar = document.querySelector("#siguiente");
  state.horaSeleccionada = horaSeleccionada
  state.diaSeleccionado = diaSeleccionado



  if(state.horaSeleccionada && state.diaSeleccionado){
    botonFinalizar.disabled = false
    return true
  }

  if(!state.horaSeleccionada && !state.diaSeleccionado){
    botonFinalizar.disabled = true
    return false
  }
}

const advertencia = async () => {

  if (!state.horaSeleccionada && !state.diaSeleccionado) {
    await NotificacionesCitas.Siguiente("Una Fecha y Horario")
  }
}

const volver = () => {
  borrarStore()
  router.push('/miscitas/citas/vehiculo')
}

onMounted(async () => {
    await validar()
})

</script>

<template>
  <div class="card-body">
    <HeaderSection tittle="Fecha y hora de la Cita" :size-tittle="4"
                   text="Por favor complete la información a continuación"/>

    <Calendario :cambio="cambio" :validar="validar" :reagendar="false"/>

  </div>

  <div class="row">
    <div class="col-md-8 text-muted">
      *En caso de desastres naturales o días inhábiles no contemplados,
      se le cancelará su cita sin ninguna sanción y se le
      notificará por correo electrónico, para que pueda agendar una nueva cita.
    </div>
    <div class="col-md-4">
      <div class="hstack gap-2 justify-content-end">

        <b-button @click="volver" class="m-2" variant="btn btn-square-soft-pantone-gray">
          <i class=" mdi mdi-arrow-left-bold align-middle pe-2"></i>Atras
        </b-button>
        <div @click="advertencia">
          <b-button @click="finalizar" variant="btn btn-square-round-pantone-green" id="siguiente"> Finalizar
            <i class="mdi mdi-calendar-check align-middle ps-2"></i>
          </b-button>
        </div>
      </div>
    </div>
  </div>

</template>