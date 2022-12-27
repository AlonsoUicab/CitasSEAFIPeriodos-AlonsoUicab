<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {helpers, required} from "@vuelidate/validators";
import flatPickr from "vue-flatpickr-component";
import Pickr from "@simonwep/pickr";
import "flatpickr/dist/flatpickr.css";
import "@simonwep/pickr/dist/themes/classic.min.css"; // 'classic' theme
import ModalComponent from "@/components/ModalComponent.vue";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import NotificacionError from "@/helpers/notifications/NotificacionError";
import {NotificacionesModal} from "@/helpers/notifications/notificacionesModal";
import {NotificacionesRecepcion} from "@/helpers/notifications/NotificacionesRecepcion";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";


const diasInhabiles = ref([])
const cargandoDatos = ref(false)
const respuestaBack = ref(null)
const paginaActual = ref(1)
const registrosPorPagina = ref(5)
const totalPaginas = ref(0)
const totalRegistros = ref(0)
const primerIndice = ref(0)
const ultimoIndice = ref(0)
const paginacion = ref()
const modalDiaInhabil = ref()
const datenow = new Date().toLocaleDateString();
const isNew = ref(true)



const state = reactive({
  searchQuery: '',
  idDia: '',
  nombre: '',
  descripcion: '',
  fecha: datenow,
})

const rules = {
  searchQuery: {},
  nombre: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  descripcion: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  },
  fecha: {
    required: helpers.withMessage("Este campo es obligatorio", required),
  }
}

const v$ = useVuelidate(rules, state)

const humanfriendlyConfig = {
  defaultDate: "today",
  dateFormat: "d/m/Y",
  minDate: new Date(new Date().getFullYear() - 1, 12, 1),
  maxDate: new Date(new Date().getFullYear() + 1, 12, 1),
}

const cargarDias = async () => {
  try {
    cargandoDatos.value = true
    if (state.searchQuery.length > 0)
      paginaActual.value = 1
    respuestaBack.value = await FechasHorarios.ObtenerListaDiasInhabilesPaginado(state.searchQuery, paginaActual.value, registrosPorPagina.value, 4, 'asc')
    paginaActual.value = respuestaBack.value.paginaActual
    registrosPorPagina.value = respuestaBack.value.registrosPorPagina
    totalPaginas.value = respuestaBack.value.totalPaginas
    totalRegistros.value = respuestaBack.value.totalRegistros
    diasInhabiles.value = respuestaBack.value.registros
    primerIndice.value = respuestaBack.value.primerIndice
    ultimoIndice.value = respuestaBack.value.ultimoIndice


  } catch (e) {
    throw e
  } finally {
    cargandoDatos.value = false
  }
}

const cambiarPagina = (num) => {
  paginaActual.value = num
  cargarDias()
}

watch(paginaActual, (newPage) => {
    cambiarPagina(newPage)
})


const mostrarModal = async (idDia, index) => {
  let inputfecha = document.querySelector("#inputFecha");
  await limpiarModal()
  if (!idDia) {
    isNew.value = true
    inputfecha.disabled = false;
  } else {
    isNew.value = false
    inputfecha.disabled = true
    const dato = await diasInhabiles.value[index]

    state.idDia = dato.idDia
    state.nombre = dato.nombre
    state.descripcion = dato.descripcion
    let fechaConvertida = UtilsDate.toDayMonthYear(dato.fecha)
    // console.log(fechaConvertida)
    state.fecha = fechaConvertida

  }
  modalDiaInhabil.value.show()
}

const eliminarDia = async (idDia, fecha) => {
  const confirmado = await NotificacionesRecepcion.ConfirmacionEditar(fecha, "Eliminar")
  if (confirmado.isConfirmed) {
    try {
      const resp = await FechasHorarios.eliminarDiaInhabil(idDia)
      if (resp) {
        await NotificacionesModal.PantallaExito('Evento Eliminado con Éxito')
      }
    } catch (error) {
      await NotificacionError.Agendar(error)
    } finally {
      await cargarDias()
    }

  }
}
const AgregarDia = async (idDia) => {
    await modalDiaInhabil.value.hide()
  if (idDia !== '') {

    const resp = await NotificacionesRecepcion.ConfirmacionEditar(state.fecha, 'Modificar')
    if (resp.isConfirmed)
      try {
        PantallaCarga.mostrar()
        const resp = await FechasHorarios.agregarDiaInhabil(idDia, UtilsDate.toYearMonthDay(state.fecha), state.nombre, state.descripcion)
        if (resp) {
          await NotificacionesModal.PantallaExito('Evento Editado con Éxito');

        }
        await limpiarModal()
      } catch (error) {
        await NotificacionError.Agendar(error)
      } finally {
        PantallaCarga.ocultar()
        await cargarDias()
      }
  } else { //entonces es un evento nuevo

   try {
     const vld = await FechasHorarios.validarDiaInhabil(idDia, UtilsDate.toYearMonthDay(state.fecha), state.nombre, state.descripcion)
     const date = await NotificacionesRecepcion.ValidarDiaInhabil(state.fecha, 'Agregar')

     if (date.isConfirmed) {
       try {
         PantallaCarga.mostrar()
         const resp = await FechasHorarios.agregarDiaInhabil(idDia, UtilsDate.toYearMonthDay(state.fecha), state.nombre, state.descripcion)
         await modalDiaInhabil.value.hide()
         if (resp) {
           await NotificacionesModal.PantallaExito('Evento Agregado con Éxito');
         }
         await limpiarModal()
       } catch (error) {
         await NotificacionError.Agendar(error)
       } finally {
         PantallaCarga.ocultar()
         await cargarDias();
       }


     }
   }catch (e) {


     const resp = await NotificacionesCitas.Continuar(e)
     if (resp.isConfirmed) {
       try {
         PantallaCarga.mostrar()
         const resp = await FechasHorarios.agregarDiaInhabil(idDia, UtilsDate.toYearMonthDay(state.fecha), state.nombre, state.descripcion)
         await modalDiaInhabil.value.hide()
         if (resp) {
           await NotificacionesModal.PantallaExito('Evento Agregado con Éxito');

         }
         await limpiarModal()


       } catch (error) {
         await NotificacionError.Agendar(error)
       } finally {
         PantallaCarga.ocultar()
         await cargarDias();
       }
     }
   }


  }
}


const limpiarModal = async () => {
  v$.value.$reset()
  state.idDia = ''
  state.nombre = ''
  state.descripcion = ''
  state.fecha = datenow
}

onMounted(() => {
  cargarDias()
})
</script>
<template>
  <div class="card">
    <div class="card-header align-items-center d-flex">
      <h3 class="mb-0 flex-grow-1">Dias Inhábiles</h3>
      <div class="flex-shrink-0">
        <div class="form-check form-switch form-switch-right form-switch-md">
          <b-button @click="mostrarModal()" variant="pantone-green">
            <i class="bx bx-plus-circle fs-2 align-middle">
            </i> Nuevo evento
          </b-button>
        </div>
      </div>
    </div>
    <div class="card-body border border-dashed border-end-0 border-start-0">
      <div class="row g-3 d-flex justify-content-end">
        <div class="col-md-6 col-sm-12 col-lg-4">
          <div class="search-box">
            <input v-model="v$.searchQuery.$model" type="text" class="form-control search bg-light border-light"
                   placeholder="Buscar Día" @keyup.stop="cargarDias()"
            />
            <i class="ri-search-line search-icon"></i>
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
              <th class="sort">ID</th>
              <th class="sort">Nombre</th>
              <th class="sort">Descripcion</th>
              <th class="sort text-center">Fecha</th>
              <!--                            <th class="sort">Activo</th>-->
              <th class="sort text-center">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(diaInhabil, index) in diasInhabiles">

              <th scope="row">{{index + 1}}</th>

              <td class="fw-semibold">{{ diaInhabil.nombre }}</td>
              <td>{{ diaInhabil.descripcion }}</td>
              <td class="text-center">{{ UtilsDate.toDayMonthYear(diaInhabil.fecha) }}</td>
              <!--                            <td class="text-muted">-->
              <!--                                <i :class="diaInhabil.activo === true ? 'mdi mdi-checkbox-marked fs-1 text-seafi-aqua' : 'mdi mdi-close-box fs-1'"></i>-->
              <!--                               </td>-->
              <td class="text-center">
                <div>
                  <button class="btn btn-light btn-sm dropdown" type="button"
                          data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="mdi mdi-dots-horizontal"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" style="cursor: pointer" @click="mostrarModal(diaInhabil.idDia, index)">
                        <i class="mdi mdi-calendar-edit mdi-18px align-center me-2 text-seafi-aqua"></i>
                        Editar
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" style="cursor: pointer" @click="eliminarDia(diaInhabil.idDia, UtilsDate.toDayMonthYear(diaInhabil.fecha))">
                        <i class="mdi mdi-calendar-remove mdi-18px align-center me-2 text-seafi-red "></i>
                        Eliminar
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
        <div class="noresult" v-if="diasInhabiles.length === 0">
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
    <ModalComponent ref="modalDiaInhabil">
      <template #header>
        <h5 class="modal-title"><span>{{ isNew === true ? 'Nuevo' : 'Modificar' }}</span> Día Inhábil</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </template>
      <template #body>
        <div class="text-center">
          <i class="mdi text-seafi-aqua" :class="isNew ? 'mdi-calendar-cursor' :'mdi-calendar-edit'"
             style="font-size:100px;"></i>
        </div>
        <div class="mb-3">
          <label class="form-label">Nombre del Día Inhábil
            <span class="text-danger">*</span>
          </label>
          <input type="text" class="form-control" v-model.trim="v$.nombre.$model"
                 @input="this.v$.nombre.$touch()"
                 :class="{'is-invalid': v$.nombre.$error,}" id="nombreSistema"
                 placeholder="Ingresa un nombre para el evento">
          <div v-for="(item, index) in v$.nombre.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Descripción
            <span class="text-danger">*</span>
          </label>
          <textarea type="text" class="form-control" v-model.trim="v$.descripcion.$model"
                    @input="this.v$.descripcion.$touch()"
                    :class="{'is-invalid': v$.descripcion.$error,}" id="descripcion"
                    placeholder="Ingresa una descripción para el evento"></textarea>
          <div v-for="(item, index) in v$.descripcion.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Fecha<span
              class="text-danger">*</span></label>
          <flatPickr
              v-model="v$.fecha.$model"
              :config="humanfriendlyConfig"
              class="form-control flatpickr-input"
              id="inputFecha"
              :class="{'is-invalid': v$.fecha.$error},!isNew ? 'text-muted' :''"
              :style="!isNew ? 'cursor: not-allowed': ''"
          ></flatPickr>
          <div v-for="(item, index) in v$.fecha.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="d-flex align-items-center col-12">
          <div class="col-6 px-2">
            <a class="btn btn-seafi-aqua w-100" ref="enviando" @click="AgregarDia(state.idDia )">Aceptar</a>
          </div>
          <div class="col-6 px-2">
            <a class="btn btn-soft-seafi-gray w-100" data-bs-dismiss="modal">Cancelar</a>
          </div>
        </div>
      </template>
    </ModalComponent>
  </div>
</template>