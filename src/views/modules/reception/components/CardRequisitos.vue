<script setup>
import {onMounted, reactive, ref,} from "vue";
import {requisitostramite} from "@/api/mocks/datos-informativos.mock";
import Multiselect from "@vueform/multiselect";
import {Tramites} from "@/api/connection/providers/Tramites.service";
import useVuelidate from "@vuelidate/core/dist/index.esm";

const tramites = ref(null)

const props = defineProps({
    idTramite: {
        type        : Number,
        default     : 1,
    },
})

const state = reactive({
    numTramite       :props.idTramite,
})

const rules = {
    numTramite: {
    },
}

const v$ = useVuelidate(rules, state)

const obtenerRequisitos = async () => {
    state.requisitos = await Tramites.obtenerRequisitosTramite(state.numTramite);
}
const value = ref()

onMounted(async () => {
    tramites.value = await Tramites.obtenerTiposTramites()
    obtenerRequisitos(state.numTramite)
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <p class="mb-1">Requisitos del tramite</p>
      <div class="d-flex align-items-center">
        <Multiselect
            v-model="v$.numTramite.$model"
            :show-labels="false"
            placeholder="Buscar un tramite"
            label="nombre"
            :options="tramites"
            valueProp="idTramite"
            :canClear="false"
            :canDeselect="false"
            @select="obtenerRequisitos()"
                 />
      </div>

      <div class="d-flex align-items-center mt-3">
        <div class="flex-grow-1 overflow-hidden">
          <ol>
            <li v-for="requisito in state.requisitos" class="mb-4" >
              {{requisito.descripcion}}
                <ol>
                    <li v-for="subRequisito in requisito.catOpcionesRequisitos" type="a" class="my-2">
                        {{subRequisito.descripcion}}
                    </li>
                </ol>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>