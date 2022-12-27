<script setup>

import PageHeader from "@/layouts/content/PageHeader";
import TablaDiasInhabiles from "@/views/modules/admin/components/TablaDiasInhabiles"
import TablaPeriodos from "@/views/modules/admin/components/TablaPeriodos"
import flatPickr from "vue-flatpickr-component";
import Pickr from "@simonwep/pickr";
import "flatpickr/dist/flatpickr.css";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {helpers, required} from "@vuelidate/validators";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";
import {reactive, ref} from "vue";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import notificacionError from "@/helpers/notifications/NotificacionError";
import {NotificacionesModal} from "@/helpers/notifications/notificacionesModal";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";

const state = reactive({
  fechaInicio: '',
  fechaFin: ''
})

const humanfriendlyConfig = {
  defaultDate: "today",
  dateFormat: "d/m/Y",
}

const activar = ref(false)
const cambio = () => {
  //activar.value = true;
  activar.value = activar.value === false;
}
const ActivarHorarios = async () => {
  if (state.fechaFin  ===  '' ||  state.fechaInicio  ===  '') {
    await NotificacionesCitas.Siguiente('la Fecha de Inicio y la Fecha Final de los horarios')
  return false;
  }
try {
  const resp = await FechasHorarios.activarHorariosExtraordinarios(UtilsDate.toYearMonthDay(state.fechaInicio),UtilsDate.toYearMonthDay(state.fechaFin))
  await NotificacionesModal.PantallaExito('Horarios Activados con Éxito');
}catch (e) {
  await notificacionError.Agendar(e)
}



}

const rules = {
  fechaInicio: {required: helpers.withMessage("Este campo es obligatorio", required),},
  fechaFin: {required: helpers.withMessage("Este campo es obligatorio", required),}
}
const v$ = useVuelidate(rules, state)
</script>

<template>
  <PageHeader title="Calendario"/>
  <div class="row">
    <TablaDiasInhabiles/>
    <TablaPeriodos/>
<!--    <div class="card">-->
<!--      <div class="card-header " @click="cambio">-->
<!--        <h5>-->
<!--          Horarios Extraordinarios-->
<!--        </h5>-->
<!--      </div>-->
<!--      <div class="card-body">-->
<!--        <div v-if="activar === true">-->
<!--          <form id="formulario" ref="form" class="needs-validation" @submit.prevent="ActivarHorarios">-->
<!--          <div class="row">-->

<!--            <div class="col-md-4 mb-3 ">-->
<!--              <p class="text-center mt-4">Por favor seleccione la fecha de INICIO y FIN para dichos horarios<span-->
<!--                  class="text-danger">*</span>-->
<!--              </p>-->
<!--            </div>-->

<!--            <div class=" col-md-3 mb-3">-->
<!--              <label for="inputfechaInicio" class="form-label">Fecha Inicio<span-->
<!--                  class="text-danger">*</span></label>-->
<!--              <flatPickr type="text"-->
<!--                         v-model="v$.fechaInicio.$model"-->
<!--                         :config="humanfriendlyConfig"-->
<!--                         id="inputfechaInicio"-->
<!--                         class="form-control flatpickr-input"-->
<!--                         :class="{'is-invalid': v$.fechaInicio.$error}"-->
<!--                         data-provider="flatpickr"-->
<!--              ></flatPickr>-->
<!--              <div v-for="(item, index) in v$.fechaInicio.$errors" :key="index"-->
<!--                   class="invalid-feedback">-->
<!--                <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class=" col-md-3 mb-3">-->
<!--              <label for="inputfechaInicio" class="form-label">Fecha Fin<span-->
<!--                  class="text-danger">*</span></label>-->
<!--              <flatPickr type="text"-->
<!--                         v-model="v$.fechaFin.$model"-->
<!--                         :config="humanfriendlyConfig"-->
<!--                         id="inputfechaInicio"-->
<!--                         class="form-control flatpickr-input"-->
<!--                         :class="{'is-invalid': v$.fechaFin.$error}"-->
<!--                         data-provider="flatpickr"-->
<!--              ></flatPickr>-->
<!--              <div v-for="(item, index) in v$.fechaFin.$errors" :key="index"-->
<!--                   class="invalid-feedback">-->
<!--                <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="col-sm-2 mb-3 flex-row">-->

<!--              <div class="mb-lg-2 mt-4 ">-->
<!--                <b-button  :disabled="!v$.$invalid" type="submit" variant="pantone-green">-->
<!--                  Activar Horarios-->
<!--                </b-button>-->
<!--              </div>-->

<!--            </div>-->

<!--          </div>-->
<!--          </form>-->
<!--        </div>-->

<!--      </div>-->

<!--    </div>-->

  </div>

</template>

