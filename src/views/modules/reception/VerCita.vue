<script setup>

import CardRequisitos from "@/views/modules/reception/components/CardRequisitos";
import WidgetContador from "@/components/WidgetContador";
import IconLabel from "@/components/IconLabel";
import router from "@/router";
import {CitasService} from "@/api/connection/providers/Citas.service";
import {useCitaStorage} from '@/store/modules/cita.store'
import {onMounted, reactive, ref} from "vue";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import ModalComponent from "@/components/ModalComponent";
import {Tramites} from "@/api/connection/providers/Tramites.service";
import {NotificacionesRecepcion} from "@/helpers/notifications/NotificacionesRecepcion";
const modalRequisitos = ref()

let cita            = ref([])
const contadores    =  ref([])
const opcion        = ref(1);
const citaStore     = useCitaStorage()
const {atenderRequisitosCompletos, atenderRequisitosIncompletos} = citaStore
const requisitos = ref()
const cit = ref()//?????

const props = defineProps({
    idCita: String,
})
const data = reactive({
  idCita: '',
  requisitos:[]
})
const obtenerContadores = async () => {
    let totales =  ref([])
    totales.value = await CitasService.estadisticasCitasPorPeriodo()
  contadores.value.push({
    cantidad: totales.value[1],
    cabecera: "Total de penalizaciones del usuario",
    textAlt: "En el ultimo periodo",
    icono: "mdi-calendar-remove",
    iconColor: "text-pantone-red"
  })
}

const cambiarOpcion = (valor) => {
  opcion.value = valor;
}

const regresar = async () => {
  await router.push({name:'recepcion'})
}

const consulta = async (idCita) => {
  cit.value = idCita;
  cita.value = await CitasService.obtenerDatosCita(idCita)

}

const marcarRequistosCompletos = async (idCita, numFolio) => {
    await atenderRequisitosCompletos(idCita, numFolio)
    await consulta(idCita)
}
const marcarRequisitosIncompletos = async (idCita, numFolio, tramite, idTramite) => {
  data.idCita = idCita;
    await consulta(idCita)
  mostrarModalModificar(idTramite);
}

const mostrarModalModificar = async (idTramite) => {
  requisitos.value = await Tramites.obtenerRequisitosTramite(idTramite);
  // state.idRequisitos = requisitos.value
  modalRequisitos.value.show()

}
const enviarIncompletos = async (folio) => {
    try {
        await CitasService.requisitosIncompletos(data)
        await modalRequisitos.value.hide()
        await NotificacionesRecepcion.PantallaExito("La cita ha sido atendida con Exito")
    }catch (e) {
        await NotificacionesRecepcion.PantallaError("Ocurrio un error al marcar");
    }finally {
        await consulta(cit.value)
    }
}

onMounted(async () => {
  await obtenerContadores()
  await citaStore.idCita === null ? regresar() : consulta(citaStore.idCita)
})
</script>

<template>
  <div class="row">
    <div class="col-xl-8 col-lg-8">
      <div class="card">
        <div class="card-body m-5 mt-4">
          <div class="mb-4">
            <div class="d-flex flex-wrap">
              <a  @click="regresar()" type="button" class="btn-square-round-seafi-gray me-auto mb-2" >
                <i class="mdi mdi-arrow-left-bold mx-2"/>
                Regresar
              </a>

              <button class="btn-square-round-seafi-red-dark me-3 mb-2" @click="marcarRequisitosIncompletos(cita.idCita, cita.numFolio, cita.tramite,cita.idTramite)" v-if="cita.idEstatus !== 3">
                <i class="mdi mdi-file-remove-outline fs-20 mx-2" />
                Requisitos incompletos
              </button>

              <button class="btn-square-round-seafi-aqua-dark mb-2" @click="marcarRequistosCompletos(cita.idCita, cita.numFolio)" v-if="cita.idEstatus !== 4">
                <i class="mdi mdi-file-check-outline fs-20 mx-2" ></i>
                Requisitos completos
              </button>
            </div>
          </div>
          <div class="mb-5">
            <h5 class="text-muted">Hora de cita: {{cita.horario}}</h5>
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

    <div class="col-xl-4 col-lg-4">
<!--      <WidgetContador v-for="sancion in contadores"-->
<!--                      :cantidad="sancion.cantidad"-->
<!--                      :texto-cabecera="sancion.cabecera"-->
<!--                      descripcion-dato="penalizaciones"-->
<!--                      :texto-alt="sancion.textAlt"-->
<!--                      :icono="sancion.icono"-->
<!--                      :cols="12"-->
<!--                      :icon-color="sancion.iconColor"-->
<!--      />-->
      <CardRequisitos :id-tramite="cita.idTramite"/>
    </div>
  </div>
  <ModalComponent ref="modalRequisitos" sizeModal="800px">
    <template #body class="">
      <div class="text-center">
        <i class="mdi mdi-help-circle-outline text-warning" style="font-size:100px;"></i><br>
        <b class="fs-5">¿Desea atender la cita {{ cita.numFolio }}?</b>
        <p class="fs-5">Se marcará con Requisitos Incompletos</p>
      </div>
      <div class="mb-2 mx-md-3">
        <label class="form-label">
          Marque los requisitos incompletos del Tramite <strong>{{ cita.tramite }}</strong><span class="text-danger">*</span>
        </label>

        <div  class="form-check"  v-for="(requisito, index) in requisitos">
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
          <a class="btn btn-warning w-100" ref="enviando" @click="enviarIncompletos(cita.numFolio)">Aceptar</a>
        </div>
        <div class="col-6 px-2">
          <a class="btn btn-gray w-100" data-bs-dismiss="modal">Cancelar</a>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>