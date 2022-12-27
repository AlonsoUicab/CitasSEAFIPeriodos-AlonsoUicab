<template>
  <div class="card-body">
    <HeaderSection tittle="Trámite Vehicular del Contribuyente" :size-tittle="4"
                   text="Por favor complete la información a continuación"/>

    <div class="mb-4">
      <div>
        <label class="form-label">
          Trámite vehicular que desea realizar <span class="text-danger">*</span>
        </label>

      </div>
      <div class="mb-3">
      <multiselect class="form-select" style="text-align: left"
                    v-model="valor"
                   :close-on-select="true"
                   :multiple="false"
                   valueProp="idTramite"
                   label="nombre"
                   :searchable="false"
                   :create-option="true"
                   :options="tramites"
                   @select="requisitoTramite(valor)"
                   placeholder="Selecciona un tramite"
                   noOptionsText="No se encontraron trámites disponibles"
                   :canClear="false"
                   :createTag="true"
                   :canDeselect="false">

      </multiselect>

      </div>
      <div v-show="valor !== null">
        <p>Requisitos:</p>
          <ol>
              <li v-for="requisito in state.requisito" class="mb-4" >
                  {{requisito.descripcion}}
                  <ol>
                      <li v-for="subRequisito in requisito.catOpcionesRequisitos" type="a" class="my-2">
                          {{subRequisito.descripcion}}
                      </li>
                  </ol>
              </li>
          </ol>
      </div>
      <div >

      </div>

    </div>

  </div>
  <div class="mt-2">
    <div class="col-lg-12 py-2">
      <div class="hstack gap-2 justify-content-end">
        <b-button class="m-2" variant="btn btn-square-soft-pantone-gray" to="/miscitas/citas/datospersonales">
          <i class="  mdi mdi-arrow-left-bold align-middle pe-2"></i> Atras
        </b-button>
        <div  @click="advertencia">
        <b-button variant="btn btn-square-round-pantone-green" id="siguiente" @click="siguiente"> Siguiente
          <i class="mdi mdi-arrow-right-bold align-middle ps-2"></i>
        </b-button>
        </div>
        </div>
    </div>
  </div>

</template>

<script setup>

import {useSsoStore} from "@/store/modules/sso.store";
import HeaderSection from "@/components/headerSection";
import {onMounted, reactive, ref} from "vue";
import { requisitostramite,} from "@/api/mocks/datos-informativos.mock";
import {Tramites} from "@/api/connection/providers/Tramites.service";
import Multiselect from "@vueform/multiselect";
import router from "@/router";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {useCitaStorage} from "@/store/modules/cita.store";
const citaStore = useCitaStorage()
// const options = datostramite
const tramites      = ref(null)
const requisitosS    = ref(null)

const ssoStore = useSsoStore()

const valor = ref(null)

const requisitos = requisitostramite
const state = reactive({
  id: "",
  idRequisito:"",
  tramite:"",
  requisito: "",
});

const advertencia = async () => {
  if (valor.value === null) {
    await NotificacionesCitas.Siguiente(' su tramite');
  }
}

const requisitoTramite = async (id) =>{
  if(valor !== null ) {
    citaStore.idTramite = id;

    state.requisito = await Tramites.obtenerRequisitosTramite(citaStore.idTramite);

  }
  let buton = document.querySelector("#siguiente");
  buton.disabled = false;
}
const siguiente = () => {
  router.push("/miscitas/citas/vehiculo");
}

onMounted(async () => {
    tramites.value = await Tramites.obtenerTiposTramites()

    // requisitosS.value = await Tramites.obtenerRequisitosTramite('2')


  let buton = document.querySelector("#siguiente");
  if (valor.value === null){

    buton.disabled = true
  }else{
    buton.disabled = false
  }
})


</script>