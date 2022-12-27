<script setup>
import {computed, defineProps, onMounted, reactive, ref, watch} from "vue";

import NotificacionError from "@/helpers/notifications/NotificacionError";
import ModalComponent from "@/components/ModalComponent";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {NotificacionesModal} from "@/helpers/notifications/notificacionesModal";
import {
  helpers,
  numeric,
  required,
  requiredIf,
  minLength,
  alphaNum,
  maxLength,
  decimal,
  between
} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useAutoStorage} from "@/store/modules/vehiculo.store";
import {storeToRefs} from "pinia";
import flatPickr from "vue-flatpickr-component";
import Pickr from "@simonwep/pickr";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";

const vehiculoStore = useAutoStorage(); //para el guardado local del vector automoviles
const {add, edit, deletVehiculo} = vehiculoStore;
const {vehiculo} = storeToRefs(vehiculoStore);

const props = defineProps({
  puertas: Number,
  idTipoVehiculo: Number,
  activaR: Function,
});

const puertas = ref(props.puertas)

let state = reactive({
  marca: '',
  linea: '',
  modelo: '',
  Nserie: '',
  Nmotor: '',
  color: '',
  cilindro: '',
  puertas: '',
  factura: '',
  fechaFactura: null,
  importeFactura: null,

})

const data = reactive({
  idTipoVehiculo: props.idTipoVehiculo,
  marca: '',
  linea: '',
  modelo: '',
  Nserie: '',
  Nmotor: '',
  color: '',
  cilindro: '',
  puertas: '',
  factura: '',
  fechaFactura: null,
  importeFactura: null,

})

const rules = {
  marca: {
    required: helpers.withMessage("La marca es obligatoria", required),
  },
  linea: {
    required: helpers.withMessage("La linea es obligatoria", required),
  },
  modelo: {
    required: helpers.withMessage("El Año del Modelo es obligatorio", required),
    minLength: helpers.withMessage("Escriba los 4 digitos del año del modelo", minLength(4)),
  },
  Nserie: {
    required: helpers.withMessage("El número de serie es obligatorio 17 digitos", required),
    minLength: helpers.withMessage("El numero de serie debe ser de 17 caracteres", minLength(17)),
    alphaNum: helpers.withMessage("El numero de serie solo puede contener caracteres alfanuméricos", alphaNum),
    // restringir que no pueda introducir espacios en blanco ni caracteres
  },
  Nmotor: {
    required: helpers.withMessage("El número de motor es obligatorio 17 digitos", required),
    minLength: helpers.withMessage("El numero de motor debe ser de 17 caracteres", minLength(17)),
    alphaNum: helpers.withMessage("El numero de motor solo puede contener caracteres alfanuméricos", alphaNum),
  },
  color: {
    required: helpers.withMessage("Este campo es obligatorio", required),

  },
  cilindro: {
    required: helpers.withMessage("Por favor llene este campo", required),
    maxlength: helpers.withMessage("El numero de cilindros solo puede ir de 1 a 16", maxLength(2)),
    between: helpers.withMessage("El numero de cilindros debe estar comprendido entre 1 y 16 ", between(1, 16)),
  },
  puertas: {

    maxlength: helpers.withMessage("El numero de puertas solo puede tener máximo un número", maxLength(1)),
    between: helpers.withMessage("El máximo numero de puertas para un vehiculo son 6 ", between(0, 6)),
  },
  factura: {
    required: helpers.withMessage("Por favor llene este campo", required),
    maxlength: helpers.withMessage("El numero de su factura no puede tener mas de 30 digitos", maxLength(30)),
    numeric:helpers.withMessage("El numero de su factura solo puede tener Números",numeric),
  },
  fechaFactura: {
    required: helpers.withMessage("La fecha de factura es obligatoria", required),
  },
  importeFactura: {
    required: helpers.withMessage("El importe de la factura es obligatorio", required),
    maxlength: helpers.withMessage("El importe de la factura no puede exceder 10 digitos", maxLength(10)),


  }
}

const Mayuscula = () => {
  marca.value = marca.value.toUpperCase()
  linea.value = linea.value.toUpperCase()
  Nserie.value = Nserie.value.toUpperCase()
  Nmotor.value = Nmotor.value.toUpperCase()
  color.value = color.value.toUpperCase()


}


const date2 = null;

const humanfriendlyConfig = {
  defaultDate: "today",
  dateFormat: "d/m/Y",
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
  maxDate: new Date().toLocaleDateString(),
}
const modalModificar = ref()
const seleccionado = ref();
const idVehiculo = ref()


const v$ = useVuelidate(rules, state) //valida el formulario
const ff = useVuelidate(rules, data) //valida el modal de editar

const limpiarModelo = () => { //limpia el modelo del formulario

  state.marca = null;
  state.modelo = null;
  state.linea = null;
  state.Nserie = null;
  state.Nmotor = null;
  state.color = null;
  state.cilindro = null;
  state.puertas = null;
  state.factura = null;
  state.fechaFactura = null;
  state.importeFactura = null;
  v$.value.$reset()
}


const guardarTabla = async () => {

  let formulario = document.getElementById('formulario');


  function Vehiculo(idTipoVehiculo, marca, modelo, Nserie, Nmotor, color, cilindro, puertas, factura, fechaFactura, importeFactura, linea) {
    this.idTipoVehiculo = idTipoVehiculo
    this.marca = marca;
    this.anioModelo = modelo;
    this.numSerie = Nserie;
    this.numMotor = Nmotor;
    this.color = color;
    this.cilindros = cilindro;
    this.numPuertas = puertas;
    this.numFactura = factura;
    this.fechaFactura = fechaFactura;
    this.importeFactura = importeFactura;
    this.linea = linea;

  }

  let z = props.idTipoVehiculo;
  let a = document.getElementById('marca').value;
  let c = document.getElementById('modelo').value;
  let d = document.getElementById('Nserie').value;
  let e = document.getElementById('Nmotor').value;
  let f = document.getElementById('color').value;
  let g = document.getElementById('cilindro').value;
  let h = document.getElementById('puertas').value;
  let i = document.getElementById('factura').value;
  let j = document.getElementById('fechaFactura').value;
  let k = document.getElementById('importeFactura').value;
  let b = document.getElementById('linea').value;
  if (props.puertas === 0) {

    h = "0";
  }else if (h === ''){ //si el usuario dejó vacio el campo de puertas
    h= "4";
  }



  let nuevoVehiculo = new Vehiculo(z, a, c, d, e, f, g, h, i, UtilsDate.toYearMonthDay(j), k, b);

  if (vehiculo.value.length <= 2) {
    //objeto que tendra los valores

    await add(nuevoVehiculo);
    await props.activaR()
    await formulario.reset()

  } else {

    await NotificacionError.ListaVehiculos();

  }
  limpiarModelo()
}


const editarAuto = async (element) => {
  ff.value.$reset()
  const dd = vehiculo.value.indexOf(element);
  seleccionado.value = vehiculo.value.indexOf(element);

  data.idTipoVehiculo = element.idTipoVehiculo;
  data.marca = element.marca;
  data.linea = element.linea;
  data.modelo = element.anioModelo;
  data.Nserie = element.numSerie;
  data.Nmotor = element.numMotor;
  data.color = element.color;
  data.cilindro = element.cilindros;
  data.puertas = element.numPuertas;
  data.factura = element.numFactura;
  data.fechaFactura = element.fechaFactura;
  data.importeFactura = element.importeFactura;

  idVehiculo.value = dd;
  modalModificar.value.show();

}

const actualizarAuto = async () => {
  const f = seleccionado.value;
  try {
    ff.value.$touch()
    if (data.puertas === ''){
      data.puertas = "4"
    }
    const car = {
      idTipoVehiculo: props.idTipoVehiculo,
      marca: data.marca.toUpperCase(),
      linea: data.linea.toUpperCase(),
      anioModelo: data.modelo,
      numSerie: data.Nserie.toUpperCase(),
      numMotor: data.Nmotor,
      color: data.color.toUpperCase(),
      cilindros: data.cilindro,
      numPuertas: data.puertas,
      numFactura: data.factura,
      fechaFactura: UtilsDate.toDayMonthYear(data.fechaFactura),
      importeFactura: data.importeFactura
    }

    PantallaCarga.mostrar()
    edit([f, car])
    seleccionado.value = null
    idVehiculo.value = null

    modalModificar.value.hide()

    await NotificacionesModal.PantallaExito('Se ha modificado correctamente');


  } catch (e) {

    await NotificacionError.mostrar(e)
  } finally {
    PantallaCarga.ocultar()

  }
}


const eliminarVehiculo = async (index) => { //Este metodo ya funciona de manera "correcta"
  const marca = index.marca;
  const serie = index.numSerie;
  const confirmado = await NotificacionesCitas.PantallaConfirmacion(marca, serie);
  if (confirmado.isConfirmed) {
    deletVehiculo(index)
    await NotificacionesModal.PantallaExito('El Vehículo se ha eliminado');
  }
  props.activaR()
}

// watch( props.puertas,  () => {
//   console.log("evento detectado")
//
// })

onMounted(() => {
  if (props.idTipoVehiculo === 2) {
    state.puertas = props.puertas;
  }

})


</script>

<template>
  <form id="formulario" ref="form" class="needs-validation" @submit.prevent="guardarTabla">
    <div class="row">
      <div class="col-md-4">
        <div class="mb-4">
          <label>Marca <span class="text-danger">*</span></label>
          <input type="text"
                 v-model="v$.marca.$model"
                 class="form-control"
                 @input="Mayuscula"
                 :class="{'is-invalid': v$.marca.$error,}"
                 placeholder="Ingrese la marca de su vehículo"

                 id="marca">
          <div v-for="(item, index) in v$.marca.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-4">
          <label>Línea <span class="text-danger">*</span></label>
          <input type="text"
                 v-model="v$.linea.$model"
                 :class="{'is-invalid': v$.linea.$error,}"
                 class="form-control"
                 placeholder="Ingrese la Linea de su vehículo"
                 @input="Mayuscula"
                 required
                 id="linea">
          <div v-for="(item, index) in v$.linea.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-4">
          <label>Año del Modelo <span class="text-danger">*</span></label>
          <input type="number"
                 v-model="v$.modelo.$model"
                 :class="{'is-invalid': v$.modelo.$error,}"
                 class="form-control"
                 placeholder="Ingrese el año del modelo (4 digitos)"
                 required
                 v-maska="'####'"

                 id="modelo">
          <div v-for="(item, index) in v$.modelo.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="mb-4">
          <label>Número de Serie <span class="text-danger">*</span></label>
          <input type="text"
                 v-model="v$.Nserie.$model"
                 :class="{'is-invalid': v$.Nserie.$error,}"
                 class="form-control"
                 placeholder="Ingrese el número de serie del vehículo"
                 @input="Mayuscula"
                 required minlength="17" maxlength="17"
                 id="Nserie">
          <div v-for="(item, index) in v$.Nserie.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>

      </div>
      <div class="col-md-6">
        <div class="mb-4">
          <label>Número de Motor <span class="text-danger">*</span></label>
          <input type="text"
                 v-model="v$.Nmotor.$model"
                 :class="{'is-invalid': v$.Nmotor.$error,}"
                 class="form-control"
                 placeholder="Ingrese el número del motor"
                 @input="Mayuscula"
                 required minlength="17" maxlength="17"
                 id="Nmotor">
          <div v-for="(item, index) in v$.Nmotor.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-4">
          <label>Color <span class="text-danger">*</span></label>
          <input type="text"
                 v-model="v$.color.$model"
                 :class="{'is-invalid': v$.color.$error,}"
                 class="form-control"
                 placeholder="Ingrese el color de su vehículo"
                 required
                 @input="Mayuscula"
                 id="color">
          <div v-for="(item, index) in v$.color.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-4">
          <label>Número de Cilindros <span class="text-danger">*</span></label>
          <input type="number"
                 v-maska="'##'"
                 v-model="v$.cilindro.$model"
                 :class="{'is-invalid': v$.cilindro.$error,}"
                 class="form-control "
                 placeholder="Ingrese el cilindraje de su vehículo"
                 min="1" max="16"
                 required

                 id="cilindro">
          <div v-for="(item, index) in v$.cilindro.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4" :hidden="puertas === 0">
        <div class="mb-4">
          <label>Número de Puertas <span class="text-danger">*</span></label>
          <input type="number"

                 v-model="v$.puertas.$model"
                 :class="{'is-invalid': v$.puertas.$error,}"
                 class="form-control"
                 placeholder="Ingrese el número de puertas"
                 @input="Mayuscula"
                 max="6"
                 id="puertas">
          <div v-for="(item, index) in v$.puertas.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-4">
          <label>Número de Factura <span class="text-danger">*</span></label>
          <input type="text"
                 v-model.trim="v$.factura.$model"
                 :class="{'is-invalid': v$.factura.$error,}"
                 class="form-control"
                 placeholder="Ingrese el no. de factura"
                 @input="Mayuscula"
                 required
                 id="factura">
          <div v-for="(item, index) in v$.factura.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-4">
          <label>Fecha de Factura <span class="text-danger">*</span></label>
          <flat-pickr type="text"
                      :class="{'is-invalid': v$.fechaFactura.$error,}"
                      v-model="v$.fechaFactura.$model"
                      class="form-control flatpickr-input inactive text-center"
                      :config="humanfriendlyConfig"
                      data-provider="flatpickr"
                      id="fechaFactura">
          </flat-pickr>
          <div v-for="(item, index) in v$.fechaFactura.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>

        </div>
      </div>
      <div class="col-md-4">
        <div class="mb-4">
          <label>Importe de la Factura <span class="text-danger">*</span></label>

          <input type="number" step="0.01"

                 v-model="v$.importeFactura.$model"
                 :class="{'is-invalid': v$.importeFactura.$error}"
                 class="form-control"
                 placeholder="Ingrese el importe de la factura"
                 required

                 id="importeFactura">
          <div v-for="(item, index) in v$.importeFactura.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="hstack gap-2 justify-content-end">
        <button class="btn-square-round-pantone-green" :disabled="v$.$invalid" type="submit">Agregar Vehículo</button>
      </div>
<!--      :disabled="v$.$invalid"-->
    </div>
  </form>
  <div class="mt-3">
    <div class="table-responsive">
      <table class="tabla table table-striped">
        <thead>
        <tr>
          <!--            <th scope="col">ID</th>-->
          <th scope="col">Marca</th>
          <th scope="col">Línea</th>
          <th>Año</th>
          <th>No. Serie</th>
          <th>No. Motor</th>
          <th>No. Factura</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody id="tabla">
        <tr v-for="vd in vehiculo">
          <td>{{ vd.marca }}</td>
          <td>{{ vd.linea }}</td>
          <td>{{ vd.anioModelo }}</td>
          <td>{{ vd.numSerie }}</td>
          <td>{{ vd.numMotor }}</td>
          <td>{{ vd.numFactura }}</td>
          <td>
            <div>
              <button class="btn btn-light btn-sm dropdown" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-dots-horizontal"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item"
                     style="cursor: pointer"
                     @click="editarAuto(vd)"
                  >
                    <i class="mdi mdi-grease-pencil mdi-18px align-center me-2 text-muted"></i>Editar Vehículo
                  </a>
                </li>
                <li>
                  <a class="dropdown-item"
                     style="cursor: pointer"
                     @click="eliminarVehiculo(vd)"
                  >
                    <i class="mdi mdi-trash-can-outline mdi-18px align-center me-2 text-muted "></i>Eliminar Vehiculo
                  </a>
                </li>

              </ul>
            </div>

          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="noresult" v-if="vehiculo.length === 0">
      <div class="text-center">
        <h5 class="mt-2">No hay vehículos registrados</h5>
        <p class="text-muted mb-0">
          No hay ninguna información de vehículo, puede agregar hasta 3 vehículos del mismo tipo.
        </p>
      </div>
    </div>
  </div>

  <ModalComponent ref="modalModificar">
    <template #header>
      <h5 class="modal-title">Datos del Vehículo</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>
    <template #body>

      <div class="col-md-12 mb-2">
        <label class="form-label">Marca
          <span class="text-danger">*</span>
        </label>
        <input type="text"
               v-model="ff.marca.$model"
               required
               :class="{'is-invalid': ff.marca.$error,}"
               @input="ff.marca.$touch()"
               class="form-control"
        >

        <div v-for="(item, index) in ff.marca.$errors" :key="index"
             class="invalid-feedback">
          <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="form-label">Linea
            <span class="text-danger">*</span>
          </label>
          <input type="text"
                 v-model="ff.linea.$model"
                 required
                 class="form-control"
                 :class="{'is-invalid': ff.linea.$error,}"
                 @input="ff.linea.$touch()"
          >
          <div v-for="(item, index) in ff.linea.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-label">Año Modelo
            <span class="text-danger">*</span>
          </label>
          <input type="number"
                 v-model="ff.modelo.$model"
                 required
                 class="form-control"
                 v-maska="'####'"
                 :class="{'is-invalid': ff.modelo.$error,}"
                 @input="ff.modelo.$touch()"
          >
          <div v-for="(item, index) in ff.modelo.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>

      <div class="col-md-12 mb-2">
        <label class="form-label">Número de serie
          <span class="text-danger">*</span>
        </label>
        <input type="text"
               v-model.trim="ff.Nserie.$model"
               @input="ff.Nserie.$touch()"

               :class="{'is-invalid': ff.Nserie.$error,}"
               class="form-control"
               required minlength="17" maxlength="17"
        >
        <div v-for="(item, index) in ff.Nserie.$errors" :key="index"
             class="invalid-feedback">
          <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-md-12 mb-2">
        <label class="form-label">Numero de motor
          <span class="text-danger">*</span>
        </label>
        <input type="text"
               v-model.trim="ff.Nmotor.$model"
               @input="ff.Nmotor.$touch()"
               :class="{'is-invalid': ff.Nmotor.$error,}"
               required minlength="17" maxlength="17"

               class="form-control"
        >
        <div v-for="(item, index) in ff.Nmotor.$errors" :key="index"
             class="invalid-feedback">
          <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-2">
          <label class="form-label">Color
            <span class="text-danger">*</span>
          </label>
          <input type="text"
                 v-model.trim="ff.color.$model"
                 @input="ff.color.$touch()"
                 required
                 :class="{'is-invalid': ff.color.$error,}"
                 class="form-control"
          >
          <div v-for="(item, index) in ff.color.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <label class="form-label">No. Cilindros
            <span class="text-danger">*</span>
          </label>
          <input type="number"
                 v-model.trim="ff.cilindro.$model"
                 @input="ff.cilindro.$touch()"
                 :class="{'is-invalid': ff.cilindro.$error,}"
                 required min="1" max="16"
                 class="form-control"
          >
          <div v-for="(item, index) in ff.cilindro.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
        <div class="col-md-4 mb-2" v-if="puertas !== 0">
          <label class="form-label">No. Puertas
            <span class="text-danger">*</span>
          </label>
          <input type="number"
                 v-model="data.puertas"
                 @input="ff.puertas.$touch()"
                 required
                 :class="{'is-invalid': ff.puertas.$error,}"
                 class="form-control"
          >
          <div v-for="(item, index) in ff.puertas.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-12 mb-2">
        <label class="form-label">Numero de Factura
          <span class="text-danger">*</span>
        </label>
        <input type="text"
               v-model.trim="ff.factura.$model"
               @input="ff.factura.$touch()"
               required
               :class="{'is-invalid': ff.factura.$error,}"
               class="form-control"
        >
        <div v-for="(item, index) in ff.factura.$errors" :key="index"
             class="invalid-feedback">
          <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-2">
          <label class="form-label">Fecha de la Factura
            <span class="text-danger">*</span>
          </label>
          <flat-pickr
              type="text"
              v-model="ff.fechaFactura.$model"
              @input="ff.fechaFactura.$touch()"
              :class="{'is-invalid': ff.fechaFactura.$error,}"
              :config="humanfriendlyConfig"
              required
              class="form-control flatpickr-input inactive text-center"

              v-maska="'##/##/####'"

              data-provider="flatpickr"
              id="MfechaFactura"></flat-pickr>
          <div v-for="(item, index) in ff.fechaFactura.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
        <div class="col-md-6 mb-2">
          <label class="form-label">Importe de la Factura
            <span class="text-danger">*</span>
          </label>
          <input type="number"
                 step="0.01"
                 v-model="ff.importeFactura.$model"
                 @input="ff.importeFactura.$touch()"
                 :class="{'is-invalid': ff.importeFactura.$error,}"
                 required
                 class="form-control"
          >
          <div v-for="(item, index) in ff.importeFactura.$errors" :key="index"
               class="invalid-feedback">
            <span class="text-danger" v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>

    </template>
    <template #footer>
      <div class="d-flex align-items-center col-12">
        <div class="col-6 px-2">
          <a class="btn btn-gray w-100" data-bs-dismiss="modal">Cancelar</a>
        </div>
        <div class="col-6 px-2">
          <button class="btn btn-info w-100" type="submit" :disabled="ff.$invalid" @click="actualizarAuto()">Aceptar
          </button>
        </div>
      </div>
    </template>
  </ModalComponent>

</template>