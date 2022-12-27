<script setup>

import {datosVehiculos} from '@/api/mocks/datos-informativos.mock.js'
import flatPickr from "vue-flatpickr-component";
import Pickr from "@simonwep/pickr";
import ModalComponent from "@/components/ModalComponent";
import Multiselect from '@vueform/multiselect'
import IconLabel from "@/components/IconLabel";
import router from "@/router";
import {useAutoStorage} from "@/store/modules/vehiculo.store";
import {onMounted, reactive, ref} from "vue";
import {CitasService} from "@/api/connection/providers/Citas.service";
import {useCitaStorage} from "@/store/modules/cita.store";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";
import Calendario from "@/views/modules/user/components/content/Calendario";

let cita                    = ref([])
const citaStore             = useCitaStorage()

const {generarAcuse}    = citaStore

const {marcarCancelarCita}  = citaStore
const opcion                = ref(1);
const Modalreagendar        = ref();

const state = reactive({
  fechaReagendar  : '',
  horarioReagendar: '',
  seleccionados   : '',
  horarios        : []
})

const resetearValores = ref(null);

const rules = {
  fechaReagendar: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  horarioReagendar: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
}

const v$ = useVuelidate(rules, state)

const cambiarOpcion = (valor) => {
  opcion.value = valor;
}

const regresar = async () => {
  await router.push({name:'historial'})
}


const GenerarReporte = async () => {
    //  console.log("numero de folio",state.numFolio,"numero de cita",state.idCita)
    await generarAcuse(state.numFolio,state.idCita)
}

const consulta = async (idCita) => {
  cita.value = await CitasService.obtenerDatosCita(idCita)
  // console.log(cita.value)
  // cita.fechaCita = UtilsDate.toDayMonthYear(cita.fechaCita)
  // cita.value.horario = UtilsDate.toHourMinute(cita.value.horario)
}

const VerCita = async (idCita) => {
  citaStore.idCita = idCita
  await router.push({name: 'user-cita'})
}

const guardarDatos = (fechaReagendar,horarioReagendar) =>{
  state.horarioReagendar = horarioReagendar
  state.fechaReagendar = fechaReagendar
  consulta(citaStore.idCita)
}

const reagendar = async (numFolio, idCita) => {
  state.idCita = idCita
  state.numFolio = numFolio
  resetearValores.value.resetValores();
  await NotificacionesCitas.ConfirmacionReagendar(state.numFolio).then((btn)=>{
    if(btn.isConfirmed){
      Modalreagendar.value.show();
    }
  })
}

const CancelarCita = async (numFolio, idCita) => {
    await marcarCancelarCita(numFolio,idCita)
    await consulta(citaStore.idCita)
}

const guardar = async () =>{

  const resultado = await v$.value.$validate()

  if (resultado){
    try {
      PantallaCarga.mostrar()
      await CitasService.reagendarCita(state.idCita,state.fechaReagendar,state.horarioReagendar)
      Modalreagendar.value.hide()
      await NotificacionesCitas.PantallaExito('¡Se ha reagendado su cita con exito!','Descargar acuse').then(()=>{
        GenerarReporte(state.numFolio,state.idCita)
      })

      cita.value.fechaCita = UtilsDate.toDayMonthYear(state.fechaReagendar)

    }catch (e){
      PantallaCarga.ocultar()
      Modalreagendar.value.hide()
      await NotificacionesCitas.ErrorCancelacion(e)
    }finally {
      // cita.value.fechaCita = UtilsDate.toDayMonthYear(state.fechaReagendar)
    }
  }

  if(!resultado){
    await NotificacionesCitas.ErrorCancelacion("Ingrese todos los datos faltantes")
  }
}

onMounted(() => {
    citaStore.idCita === null ? regresar() : consulta(citaStore.idCita)
})

const calendarPickrConfig = {
  inline: true,
  altInput: true,
  // defaultDate: "today",
  dateFormat: "Y/m/d",
  // defaultDate: "today",
  minDate: "today",
  enable:[
    {
      from:"2022/10/1",
      to: "2023/03/30"
    }
  ],

  onDayCreate: async function(dObj, dStr, fp, dayElem) {
    // Comprueba si el objeto del día actual está en nuestra matriz
    // El `+` es solo un atajo para analizar la fecha
    // this.defaultDate = "18/10/2022"
try{

    if (UtilsDate.toDatePaser(localStorage.getItem("diasOcupados").split(",")).indexOf(+dayElem.dateObj) !== -1) {
      dayElem.className += " flatpickr-disabled seafi-ocupado";
    }

    if (UtilsDate.toDatePaser(localStorage.getItem("diasInhabiles").split(",")).indexOf(+dayElem.dateObj) !== -1) {
      dayElem.className += " flatpickr-disabled seafi-inhabil";
    }

    if (dayElem.dateObj.getDay() === 0 || dayElem.dateObj.getDay() === 6) {
      dayElem.className += " flatpickr-disabled nextMonthDayflatpickr-disabled";
    }
}catch (e){}
  },

  onChange: async function(selectedDates, dateStr, instance) {
    try {
      state.horarios = null

      state.horarios = await FechasHorarios.obtenerHorariosDisponiblesPorFecha(UtilsDate.toStringDate(selectedDates[0]))

      const horioFormateado = state.horarios.map(function (horario){
        var horarios = {
          idHorario : horario.idHorario,
          hora : UtilsDate.toHourMinute(horario.hora)
        }
        return horarios
      })
      state.horarios = horioFormateado

    }catch (e) {
      if(state.horarios.length !== 0){
        state.horarios = []
      }
    }
  },

}

</script>

<template>
    <div class="row">
        <div class="">
            <div class="card">
                <div class="card-body m-lg-5 mt-4">
                    <div class="mb-4">
                        <div class="d-flex flex-wrap">
                            <a  @click="regresar()" type="button" class="btn-square-round-seafi-gray me-auto mb-2" >
                                <i class="mdi mdi-arrow-left-bold mx-2"/>
                                Regresar
                            </a>
                            <button class="btn-square-round-seafi-red-dark me-3 mb-2" @click="CancelarCita(cita.numFolio,cita.idCita)" v-if="cita.idEstatus === 1">
                                <i class="mdi mdi-calendar-remove fs-20 mx-2" />
                                Cancelar Cita
                            </button>

                            <button class="btn-square-round-seafi-aqua-dark mb-2" @click="reagendar(cita.numFolio,cita.idCita)" v-if="cita.idEstatus === 1">
                                <i class="mdi mdi-calendar-edit fs-20 mx-2" ></i>
                                Reagendar Cita
                            </button>
                            <span class="pill outlined text-uppercase"
                                  v-if="cita.idEstatus != 1" :class="cita.idEstatus === 5 ? 'badge-gob-warning' : cita.idEstatus === 4 ?  'badge-gob-pantone-green' : 'badge-gob-pantone-red'">{{ cita.estatus }}</span>
                        </div>
                    </div>
                    <div class="mb-5">
                        <h5 class="text-muted">Fecha cita: {{cita.fechaCita}} {{cita.horario}}</h5>
                        <h3>{{cita.tramite}}</h3>

                        <h5>Sede: {{ cita.sede }}</h5>
                        <h4 >
                            No. Folio:
                            <small style="color: #0077aa">{{ cita.numFolio }}</small>
                        </h4>
                    </div>
                    <div class="mb-4">
                        <h5>Tipo contribuyente: <small style="color: #0AB39C"> {{ cita.tipoContribuyente }}</small></h5>
                        <h4>{{cita.nombreCompleto}}</h4>
                        <h5 class="text-muted">Estatus SAT: {{cita.estatusSat}}</h5>
                    </div>
                    <div class="row">
                        <IconLabel :cols="4" icono="badge-account-outline" label="RFC:" :texto="cita.rfc" />
                        <IconLabel :cols="4" icono="card-account-details-outline" label="CURP:" :texto="cita.curp" />
                        <IconLabel :cols="4" icono="email-outline" label="Correo Electrónico:" :texto="cita.correoElectronico" />
                        <IconLabel :cols="4" icono="phone" label="Teléfono:" :texto="cita.telefono" />
                        <IconLabel :cols="4" icono="home-group" label="Colonia" :texto="cita.colonia"/>
                        <IconLabel :cols="4" icono="road-variant" label="Calle:" :texto="cita.calle"/>
                        <IconLabel :cols="4" icono="home" label="No Exterior:" :texto="cita.numExterior"/>
                        <!--#region OPCIONALES-->
                        <IconLabel :cols="4" icono="door-closed" label="No Interior:" :texto="cita.numInterior" v-if="cita.numInterior"/>
                        <IconLabel :cols="4" icono="crosshairs-gps" label="Referencias:" :texto="cita.referencia" v-if="cita.referencia"/>
                        <IconLabel :cols="4" icono="road" label="Cruzamiento 1:" :texto="cita.cruzamiento1" v-if="cita.cruzamiento1"/>
                        <IconLabel :cols="4" icono="road" label="Cruzamiento 2:" :texto="cita.cruzamiento2" v-if="cita.cruzamiento2"/>
                    </div>
                </div>

            </div>
            <div class="card">
                <div class="card-header text-center">
                    <h4>Datos de vehículo</h4>
                </div>
                <div class="card-body">
                    <ul class="nav d-flex nav-tabs-custom rounded card-header-tabs border-bottom-0 text-pantone-green" role="tablist">
                        <li class="nav-item flex-grow-1 text-center text-pantone-green" v-for="(datos, index) in cita.datosVehiculos">
                            <a class="nav-link text-truncate"
                               @click="cambiarOpcion(index+1)"
                               :class="{'active':opcion === index+1}"
                               style="cursor: pointer"
                               id="1"
                            >
                                Vehículo {{index+1}}
                            </a>
                        </li>

                    </ul>

                    <div class="card-body mt-4 "  >
                        <div id="Datos" v-show="opcion === index+1" v-for="(datos, index) in cita.datosVehiculos" >
                            <div class="row">
                                <IconLabel :cols="4" icono="car-hatchback" label="Tipo de Vehículo:" :texto="datos.tipoVehiculo" />
                                <IconLabel :cols="4" icono="tag-outline" label="Marca:" :texto="datos.marca" />
                                <IconLabel :cols="4" icono="format-list-bulleted-type" label="Modelo o Línea:" :texto="datos.linea" />
                                <IconLabel :cols="4" icono="calendar-month" label="Año del Modelo:" :texto="(datos.anioModelo).toString()" />
                                <IconLabel :cols="4" icono="numeric" label="No. Serie:" :texto="datos.numSerie" />
                                <IconLabel :cols="4" icono="engine" label="No. Motor:" :texto="datos.numMotor" />
                                <IconLabel :cols="4" icono="palette" label="Color:" :texto="datos.color" />
                                <IconLabel :cols="4" icono="gauge" label="Cilindros:" :texto="(datos.cilindros).toString()" />
                                <IconLabel :cols="4" icono="car-door" label="Puertas:" :texto="(datos.numPuertas).toString()" />
                                <IconLabel :cols="4" icono="note-text" label="No. Factura:" :texto="datos.numFactura" />
                                <IconLabel :cols="4" icono="calendar" label="Fecha de Factura:" :texto="UtilsDate.toDayMonthYear(datos.fechaFactura)" />
                                <IconLabel :cols="4" icono="cash-multiple" label="Importe de Factura:" :texto="(datos.importeFactura).toString()" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  <!-- CREAR VENTANA MODAL PARA REAGENDAR LA CITA PROGRAMADA-->
  <ModalComponent ref="Modalreagendar" class="modal-xl-12" >
    <template #header>
      <h5 class="modal-title">Reagendar Cita <span class="text-muted">{{state.numFolio}}</span></h5>

      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>

    <template #body>
      <div class="text-center">
        <i class="mdi mdi-calendar text-seafi-aqua"  style="font-size:100px;"></i>
      </div>

      <Calendario
          :reagendar="true"
          :guardarDatos="guardarDatos"
          ref="resetearValores"
      />

    </template>

    <template #footer>
      <b-button @click="guardar()" class="m-2 full-width" variant="btn btn-pantone-green">
        Aceptar
      </b-button>
    </template>

  </ModalComponent>
</template>