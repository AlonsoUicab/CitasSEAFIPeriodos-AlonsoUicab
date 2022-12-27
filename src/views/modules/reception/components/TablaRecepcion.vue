<script setup>
import {useSsoStore} from "@/store/modules/sso.store";
import Multiselect from '@vueform/multiselect'
import {useRouter} from "vue-router";
import {opcionesSelect} from "@/api/mocks/opciones.mock";
import {ref, watch, getCurrentInstance, onMounted, reactive} from 'vue'
import {RecepcionistaService} from "@/api/connection/providers/Recepcionista.service";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {useCitaStorage} from '@/store/modules/cita.store'
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import ModalComponent from "@/components/ModalComponent";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {Tramites} from "@/api/connection/providers/Tramites.service";
import {CitasService} from "@/api/connection/providers/Citas.service";
import {NotificacionesRecepcion} from "@/helpers/notifications/NotificacionesRecepcion";

const router = useRouter()
const ssoStore = useSsoStore()
const citaStore = useCitaStorage()
const {atenderRequisitosCompletos, atenderRequisitosIncompletos} = citaStore

const citas = ref([])
const opciones = opcionesSelect
const cargandoDatos = ref(true)
const respuestaBack = ref(null)
const paginaActual = ref(1)
const registrosPorPagina = ref(10)
const totalPaginas = ref(0)
const totalRegistros = ref(0)
const primerIndice = ref(0)
const ultimoIndice = ref(0)
const paginacion = ref()
const modalRequisitos = ref()
const requisitos = ref()

const Folio = ref();
const incompletos = ref([])
//#region ==== Actualizacion Estadisticas ====
const {emit} = getCurrentInstance();
defineEmits(["updateEstadistica"])
//#endregion

const state = reactive({
  idEstatus: 0,
  searchQuery: '',
  idRequisitos: '',
  tramite: '',
})

const rules = {
  idEstatus: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  searchQuery: {},
  idRequisitos: {}
}

const data = reactive({
  idCita: '',
  requisitos:[]
})

const v$ = useVuelidate(rules, state)

const VerCita = async (idCita) => {
  citaStore.idCita = idCita

  await router.push({name: 'cita'})
}
const marcarRequisitosIncompletos = async (idCita, numFolio, tramite, idTramite) => {
  data.idCita = idCita;
  Folio.value = numFolio;
  state.tramite = tramite;
  mostrarModalModificar(idTramite)
}

const mostrarModalModificar = async (idTramite) => {
  requisitos.value = await Tramites.obtenerRequisitosTramite(idTramite);
  state.idRequisitos = requisitos.value
  modalRequisitos.value.show()

}
const marcarRequistosCompletos = async (idCita, numFolio) => {
  await atenderRequisitosCompletos(idCita, numFolio)
  await cargarCitas()
}

const cargarCitas = async () => {
  try {
    cargandoDatos.value = true
    if (state.searchQuery.length > 0)
      paginaActual.value = 1
    respuestaBack.value = await RecepcionistaService.obtenerCitasDiaActual(state.searchQuery, paginaActual.value, registrosPorPagina.value, state.idEstatus, 4, 'asc')
    paginaActual.value = respuestaBack.value.paginaActual
    registrosPorPagina.value = respuestaBack.value.registrosPorPagina
    totalPaginas.value = respuestaBack.value.totalPaginas
    totalRegistros.value = respuestaBack.value.totalRegistros
    citas.value = respuestaBack.value.registros
    primerIndice.value = respuestaBack.value.primerIndice
    ultimoIndice.value = respuestaBack.value.ultimoIndice


  } catch (e) {
    throw e
  } finally {
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

const enviarIncompletos = async () => {
  try {
      await CitasService.requisitosIncompletos(data)
      await modalRequisitos.value.hide()
      await NotificacionesRecepcion.PantallaExito("La cita ha sido atendida con Exito")
  }catch (e) {
      await NotificacionesRecepcion.PantallaError("Ocurrio un error al marcar");
  }finally {
   await cargarCitas()
    data.idCita = null;
    data.requisitos.length = null
  }
}

onMounted(() => {
  cargarCitas()
})
</script>

<template>
  <div class="card">
    <div class="card-header align-items-center d-flex">
      <h3 class="mb-0 flex-grow-1">Citas:
        <span class="text-seafi-gray fs-4">{{ new Date().toLocaleDateString() }}</span>
      </h3>
    </div>
    <div class="card-body border border-dashed border-end-0 border-start-0">
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
              <th class="sort">Nombre</th>
              <th class="sort">Fecha</th>
              <th class="sort">Hora</th>
              <th class="sort">Estado</th>
              <th class="sort">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="cita in citas">
              <th scope="row">{{ cita.numFolio }}</th>
              <td class="fw-semibold">{{ cita.nombreCompleto }} <br> <span class="text-muted fw-lighter">{{
                  cita.tramite
                }}</span></td>
              <td>{{ UtilsDate.toDayMonthYear(cita.fechaCita) }}</td>
              <td>{{ UtilsDate.toHourMinute(cita.horario) }}</td>
              <td class="text-muted">
                  <a data-bs-toggle="tooltip"
                     data-bs-placement="right"
                     :title="cita.estatus">
                      <i :class="cita.idEstatus === 4 ? 'mdi mdi-file-check mdi-36px text-pantone-green' : cita.idEstatus === 3 ? 'mdi mdi-file-remove mdi-36px text-pantone-red' : 'mdi mdi-account-clock mdi-36px'"></i>

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
                      <a class="dropdown-item" style="cursor: pointer" @click="VerCita(cita.idCita)">
                        <i class="mdi mdi-file mdi-18px align-center me-2 text-muted"></i>Ver Cita
                      </a>
                    </li>
                    <li v-if="cita.idEstatus !== 4">
                      <a class="dropdown-item" style="cursor: pointer"
                         @click="marcarRequistosCompletos(cita.idCita, cita.numFolio)">
                        <i class="mdi mdi-file-check mdi-18px align-center me-2 text-pantone-green "></i>Requisitos
                        Completos
                      </a>
                    </li>
                    <li v-if="cita.idEstatus !== 3">
                      <a class="dropdown-item" style="cursor: pointer"
                         @click="marcarRequisitosIncompletos(cita.idCita, cita.numFolio, cita.tramite, cita.idTramite)">
                        <i
                            class="mdi mdi-file-remove mdi-18px align-center me-2 text-pantone-red "></i>Requisitos
                        Incompletos
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
    <ModalComponent ref="modalRequisitos" sizeModal="800px">
        <template #body class="">
            <div class="text-center">
                <i class="mdi mdi-help-circle-outline text-warning" style="font-size:100px;"></i><br>
                <b class="fs-5">¿Desea atender la cita {{ Folio }}?</b>
                <p class="fs-5">Se marcará con Requisitos Incompletos</p>
            </div>
            <div class="mb-2 mx-md-3">
                <label class="form-label">
                    Marque los requisitos incompletos del Tramite <strong>{{ state.tramite }}</strong><span class="text-danger">*</span>
                </label>

                <div  class="form-check"  v-for="(requisito, index) in state.idRequisitos">
                    <input class="form-check-input mt-lg-1" type="checkbox" v-model="data.requisitos" name="requisito"
                           :value="requisito.idRequisito" :id="'requisito'+index">
                    <label :for="'requisito'+index">{{requisito.descripcion}}
                        <ol>
                            <li v-for="subRequisito in requisito.catOpcionesRequisitos" :key="requisito.idRequisito" class="my-2" >
                                {{subRequisito.descripcion}}
                            </li>
                        </ol>
                    </label>
                </div>

            </div>

        </template>
        <template #footer>
            <div class="d-flex align-items-center col-12">
                <div class="col-6 px-2">
                    <a class="btn btn-warning w-100" ref="enviando" @click="enviarIncompletos">Aceptar</a>
                </div>
                <div class="col-6 px-2">
                    <a class="btn btn-soft-seafi-gray w-100" data-bs-dismiss="modal">Cancelar</a>
                </div>
            </div>
        </template>
    </ModalComponent>
</template>

