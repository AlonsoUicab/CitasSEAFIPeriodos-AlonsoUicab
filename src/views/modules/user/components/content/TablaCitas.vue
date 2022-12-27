<script setup>
import {useSsoStore} from "@/store/modules/sso.store";
import Multiselect from '@vueform/multiselect'
import flatPickr from "vue-flatpickr-component";
import Pickr from "@simonwep/pickr";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import ModalComponent from "@/components/ModalComponent";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {ref, watch, getCurrentInstance, onMounted, reactive} from 'vue'
import {CitasService} from "@/api/connection/providers/Citas.service";
import {opcionesSelect2} from "@/api/mocks/opciones.mock";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import {useCitaStorage} from "@/store/modules/cita.store";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";
import Calendario from "@/views/modules/user/components/content/Calendario";

const props = defineProps({
    numRegistros: {
        type        : Number,
        default     : 10,
    },
    tipoEstatus: {
        type        : Number,
        default     : 0,
    },
    Inicio: {
        type        : Boolean,
        default     : false,
    },
})

const router                = useRouter()
const ssoStore              = useSsoStore()
const citaStore             = useCitaStorage()
const {marcarCancelarCita,consultaDias, generarAcuse}  = citaStore
const citas                 = ref([])
const opciones              = opcionesSelect2
const cargandoDatos         = ref(true)
const respuestaBack         = ref(null)
const paginaActual          = ref(1)
const registrosPorPagina    = ref(props.numRegistros)
const totalPaginas          = ref(0)
const totalRegistros        = ref(0)
const primerIndice          = ref(0)
const ultimoIndice          = ref(0)
const paginacion            = ref()
const Modalreagendar        = ref();

//#region ==== Actualizacion Estadisticas ====
const {emit} = getCurrentInstance();
defineEmits(["updateEstadistica"])
//#endregion

const state = reactive({
  idEstatus       : props.tipoEstatus,
  idCita          : 0,
  numFolio        : '',
  searchQuery     : '',
  fechaReagendar  : '',
  horarioReagendar: '',
  horarios        : []
})

const resetearValores = ref(null);

const rules = {
  idEstatus: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  fechaReagendar: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  horarioReagendar: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  searchQuery: {
  },
}

const v$ = useVuelidate(rules, state)

const cargarCitas = async () => {
    try {
        cargandoDatos.value = true
        if (state.searchQuery.length > 0)
            paginaActual.value = 1
        respuestaBack.value = await CitasService.obtenerCitasAnioActual(state.searchQuery,paginaActual.value, registrosPorPagina.value, state.idEstatus, 3, 'asc')
        paginaActual.value       = respuestaBack.value.paginaActual
        registrosPorPagina.value = respuestaBack.value.registrosPorPagina
        totalPaginas.value       = respuestaBack.value.totalPaginas
        totalRegistros.value     = respuestaBack.value.totalRegistros
        citas.value              = respuestaBack.value.registros
        primerIndice.value       = respuestaBack.value.primerIndice
        ultimoIndice.value        =respuestaBack.value.ultimoIndice
         //console.log(respuestaBack.value)
    } catch (e){
        throw e
    }finally {
        emit('updateEstadistica')
        cargandoDatos.value = false
    }
}

const cambiarPagina = (num) => {
    paginaActual.value = num
    cargarCitas()
}

watch(paginaActual, (newPage) => {
    emit('input', newPage);
    cambiarPagina(newPage)
})

const IconEstatus = (idEstatus) => {
    let icono = ref(null)
    switch (idEstatus){
        case 1:
            icono.value = 'mdi mdi-account-clock mdi-36px'
            break;
        case 2:
            icono.value = 'mdi mdi-calendar-remove mdi-36px text-pantone-red'
            break;
        case 3:
            icono.value = 'mdi mdi-file-remove mdi-36px text-pantone-red'
            break;
        case 4:
            icono.value = 'mdi mdi-calendar-check mdi-36px text-pantone-green'
            break;
        case 5:
            icono.value = 'mdi mdi-account-remove mdi-36px text-warning'
    }

    return icono.value
}

const VerCita = async (idCita) => {
  citaStore.idCita = idCita
  await router.push({name: 'user-cita'})
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



const guardarDatos = (fechaReagendar,horarioReagendar) =>{
  state.horarioReagendar = horarioReagendar
  state.fechaReagendar = fechaReagendar

}

const CancelarCita = async (numFolio, idCita) => {
    await marcarCancelarCita(numFolio,idCita)
    await cargarCitas()
}

const GenerarReporte = async (numFolio, idCita) => {
    await generarAcuse(numFolio,idCita)
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
    }catch (e){
      PantallaCarga.ocultar()
      Modalreagendar.value.hide()
      await NotificacionesCitas.ErrorCancelacion(e)
    }finally {
      await cargarCitas()
    }
  }

  if(!resultado){
    await NotificacionesCitas.ErrorCancelacion("Ingrese todos los datos faltantes")
  }

}

onMounted(async () => {
  await cargarCitas()
  await consultaDias()
})

</script>

<template>

  <div class="card">
    <div class="card-header align-items-center d-flex">
      <h3 class="mb-0 flex-grow-1">Citas</h3>
      <div class="flex-shrink-0">
        <div class="form-check form-switch form-switch-right form-switch-md">
          <b-button to="/miscitas/citas" variant="pantone-green">
            <i class="bx bx-plus-circle fs-2 align-middle">
            </i> Agendar Cita
          </b-button>
        </div>
      </div>
    </div>
      <div class="card-body border border-dashed border-end-0 border-start-0" v-if="Inicio===false">
          <div class="row g-3 d-flex col-auto">
              <div class="row g-2">
                  <div class="col-md-6 col-sm-6">
                      <div class="search-box">
                          <input v-model="v$.searchQuery.$model" type="text" class="form-control search bg-light border-light"
                                 placeholder="Buscar cita" @keyup.stop="cargarCitas"
                          />
                          <i class="ri-search-line search-icon"></i>
                      </div>
                  </div>
                  <div class="col-md-6 col-sm-6">
                      <div class="form-icon right">
                          <div class="form-group">
                              <Multiselect
                                  v-model="v$.idEstatus.$model"
                                  :show-labels="false"
                                  placeholder="Buscar un tramite"
                                  label="nombre"
                                  :options="opciones"
                                  valueProp="idEstatus"
                                  :canClear="false"
                                  :canDeselect="false"
                                  @click="cargarCitas"
                              />

                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!--end row-->
      </div>
    <div class="card-body">
      <div class="flex-grow-1 overflow-hidden">
        <div class="table-responsive">
          <table class="table align-middle table-nowrap mb-0 table-hover mb-4">
            <thead class="text-muted">
            <tr>
              <th class="sort">Folio</th>
              <th class="sort">Trámite</th>
              <th class="sort text-center">Fecha</th>
              <th class="sort text-center">Hora</th>
              <th class="sort text-center">Estado</th>
              <th class="sort text-center">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cita in citas">
              <th scope="row">{{ cita.numFolio }}</th>
              <td>{{ cita.tramite }}</td>
              <td class="text-center">{{ UtilsDate.toDayMonthYear(cita.fechaCita) }}</td>
              <td class="text-center">{{ UtilsDate.toHourMinute(cita.horario) }}</td>
                <td class="text-muted text-center">
                    <a data-bs-toggle="tooltip"
                       data-bs-placement="right"
                       :title="cita.estatus">
                        <i :class="IconEstatus(cita.idEstatus)"></i>
                    </a>
                </td>
                <td class="text-center">
                <div>
                  <button class="btn btn-light btn-sm dropdown" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="mdi mdi-dots-horizontal"></i>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                      <a class="dropdown-item" style="cursor: pointer"
                         @click="GenerarReporte(cita.numFolio,cita.idCita)">
                        <i class="mdi mdi-arrow-down-thick mdi-18px align-center me-2 text-muted"></i>Descargar Acuse
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" style="cursor: pointer" @click="VerCita(cita.idCita)">
                        <i class="mdi mdi-file mdi-18px align-center me-2 text-muted "></i>Ver Cita
                      </a>
                    </li>
                    <li v-if="cita.idEstatus === 1">
                      <a class="dropdown-item" style="cursor: pointer" @click="reagendar(cita.numFolio,cita.idCita)">
                        <i
                            class="mdi mdi-calendar mdi-18px align-center me-2 text-muted "></i>Reagendar Cita
                      </a>
                    </li>
                    <li v-if="cita.idEstatus === 1">
                      <a class="dropdown-item" style="cursor: pointer" @click="CancelarCita(cita.numFolio,cita.idCita)">
                        <i
                            class="mdi mdi-calendar-remove mdi-18px align-center me-2 text-muted "></i>Cancelar Cita
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
        <div class="text-center" v-if="cargandoDatos">
            <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
            <br>
        </div>
        <div v-else>
            <div class="noresult" v-if="citas.length === 0">
                <div class="text-center">
                    <h5 class="mt-2">No hay registros</h5>
                    <p class="text-muted mb-0">
                        No se encontraron resultados para mostrar
                    </p>
                </div>
            </div>
            <div class="row g-0 text-center text-sm-start align-items-center mb-4" v-else>
                <div class="col-sm-6">
                    <div>
                        <p class="mb-sm-0 text-muted">
                            Mostrando del <span class="fw-semibold">{{ primerIndice }}</span> al
                            <span class="fw-semibold">{{ ultimoIndice }}</span> de
                            <span class="fw-semibold text-decoration-underline">{{ totalRegistros }}</span>
                            registros
                        </p>
                    </div>
                </div>
                <div class="col-sm-6">
                    <ul class="pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                        <b-pagination
                            ref="paginacion"
                            v-model="paginaActual"
                            :total-rows="totalRegistros"
                            :per-page="registrosPorPagina"
                            first-number
                            last-number
                        ></b-pagination>
                    </ul>
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

