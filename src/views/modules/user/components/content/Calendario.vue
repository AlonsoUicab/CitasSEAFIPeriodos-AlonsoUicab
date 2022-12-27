<template>
  <div class="row" >
    <div :class="[!props.reagendar ? 'col-md-6' : '', 'mb-4']">
      <label>Selecione la fecha disponible <span class="text-danger">*</span></label>
      <FlatPickr
          type="text"
          disabled
          :config="calendarPickrConfig"
          class="form-control flatpickr-input inactive text-center"
          v-model="state.diaSeleccionado"
          data-provider="flatpickr"
      />
      <div class="d-flex justify-content-center mt-2">

        <div :class="[!props.reagendar ? 'me-4 fs-5' :'me-1' ]">
          <i class="mdi mdi-square text-pantone-gray me-1 fs-4 align-middle"></i>
          Días inhábiles
        </div>
        <div :class="[!props.reagendar ? 'me-4 fs-5' :'me-1' ]">
          <i class="mdi mdi-square text-warning me-1 fs-4 align-middle"></i>
          Días ocupados
        </div>
        <div :class="[!props.reagendar ? 'fs-5' :'me-1' ]">
          <i class="mdi mdi-square text-pantone-green me-1 fs-4 align-middle"></i>
          Día seleccionado
        </div>
      </div>
    </div>


    <div :class="[!props.reagendar ? 'col-md-6' : '', 'mb-3 mt-2']" >
      <label>Seleccione un horario disponible <span class="text-danger">*</span></label>

      <Multiselect
          v-model="state.horaSeleccionada"
          :close-on-select="true"
          :multiple="false"
          valueProp="idHorario"
          label="hora"
          :options = state.horarios
          placeholder="Horarios"
          @select="eventoMultiple"
          noOptionsText="No se encontraron Horarios disponibles"
          :canClear="false"
          :canDeselect="false"
      />

      <div class="card alert alert-warning mt-5" v-if="!props.reagendar">
        <p class="fw-bold m-1 text-center">IMPORTANTE</p>
        <span style="text-align: justify;">
                        Deberá presentarse <b> 10 minutos </b> antes de la hora indicada para su cita, <b>no hay tolerancia</b> y se
                        aplicará su correspondiente
                        <b>penalización</b>.
                    </span>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps, onMounted, reactive, ref, watch,onUnmounted} from "vue";
import FlatPickr from "vue-flatpickr-component";
import Multiselect from "@vueform/multiselect";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";

const props = defineProps({
  cambio        : Function,
  validar       : Function,
  guardarDatos  : Function,
  setearDatos   : Function,
  reagendar     : Boolean
});

const state = reactive({
  diaSeleccionado   : null,
  horaSeleccionada  : null,
  horarios          : [],
  diasOcupados      : [],
  diasInhabiles     : [],
})

const eventoMultiple = () => {

  if(!props.reagendar){
    props.cambio(state.horaSeleccionada,state.diaSeleccionado)
    props.validar(state.horaSeleccionada,state.diaSeleccionado)
  }

  if(props.reagendar){
    props.guardarDatos(state.diaSeleccionado,state.horaSeleccionada)
  }

}

const resetValores = () => {
  state.diaSeleccionado =null
  state.horaSeleccionada = null
};

defineExpose({ resetValores });

const calendarPickrConfig = ref({
  inline: true,
  altInput: true,
  dateFormat: "Y/m/d",
  minDate: "today",
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
      longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    },
    months: {
      shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
      longhand: ['Enero', 'Febrero', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    },
  },
  enable: [],
  onDayCreate:
      [async function (dObj, dStr, fp, dayElem) {

      if (state.diasOcupados.indexOf(+dayElem.dateObj) !== -1) {
        dayElem.className += " flatpickr-disabled seafi-ocupado";
      }

      if (state.diasInhabiles.indexOf(+dayElem.dateObj) !== -1) {
        dayElem.className += " flatpickr-disabled seafi-inhabil";
      }
    if (dayElem.dateObj.getDay() === 0 || dayElem.dateObj.getDay() === 6) {
      dayElem.className += " flatpickr-disabled nextMonthDayflatpickr-disabled";
    }
  }],

  onChange: async function (selectedDates, dateStr, instance) {
    state.horaSeleccionada = null

    if(!props.reagendar){
      props.cambio(state.horaSeleccionada)
    }


    state.horarios = await FechasHorarios.obtenerHorariosDisponiblesPorFecha(UtilsDate.toStringDate(selectedDates[0]))

    const horioFormateado = state.horarios.map(function (horario) {
      var horarios = {
        idHorario: horario.idHorario,
        hora: UtilsDate.toHourMinute(horario.hora)
      }
      return horarios
    })

    state.horarios = horioFormateado
  }
})

async function cargarPeriodo( ){
  let diasPeriodo = await FechasHorarios.ObtenerDiasPeriodo()
  calendarPickrConfig.value.enable = [{
    from  : UtilsDate.toYearMonthDay(diasPeriodo[0]),
    to    : UtilsDate.toYearMonthDay(diasPeriodo[1])
  }]
}

async function cargarFechas(){
  let diasInahbiles = await FechasHorarios.ObtenerListaDiasInhabiles()
  let diasInahbilesFormateados = UtilsDate.toDatePaser(diasInahbiles)
  state.diasInhabiles = diasInahbilesFormateados

  let diasOcupados = await FechasHorarios.ObtenerDiasNoDisponiblesEnPeriodosActivos()
  let diasOcupadosFormateados = UtilsDate.toDatePaser(diasOcupados)
  state.diasOcupados = diasOcupadosFormateados

  /* No borrar, para el correcto funcionamiento del calendario */
  calendarPickrConfig.value.onDayCreate.push( async function (){})

}

onMounted(async () => {
  await cargarPeriodo()
  await cargarFechas()

})

</script>