<template>
  <div class="row justify-content-center">

    <div class="p-2 mt-4">

      <form class="needs-validation" @submit.prevent="guardarTabla">
        <div class="col-md-12">
          <div class="mb-4 row">
            <div class="col-md-4">
              <label>Nombre*</label>
              <input type="text" class="form-control" placeholder="Ingrese sus nombre"
                     name="marca" required>
            </div>
            <div class="col-md-4">
              <label>Primer Apellido*</label>
              <input type="text" class="form-control" placeholder="Ingrese su primer apellido"
                     name="linea"  required>
            </div>
            <div class="col-md-4">
              <label>Segundo Apellido*</label>
              <input type="text" class="form-control" placeholder="Ingrese su segundo apellido"
                     name="modelo" required>
            </div>
          </div>
          <div class="mb-4 row">
            <div class="col-md-4">
              <label>RFC*</label>
              <input type="text" class="form-control" placeholder="RFC"
                    v-model="RFC"  name="RFC" disabled required>
            </div>
            <div class="col-md-4">
              <label>CURP*</label>
              <input type="text" class="form-control" placeholder="Ingrese su CURP"
                    v-model="CURP" name="motor" required>
            </div>
            <div class="col-md-4">
              <label>Correlo Electrónico*</label>
              <input type="text" class="form-control" placeholder="Ingrese su correo electrónico"
                     name="color" required>
            </div>
          </div>
        </div>

        <div class="mb-4 row">

          <div class="col-md-4">
            <label>Teléfono*</label>
            <input type="text" class="form-control" placeholder="Ingrese su teléfono"
                   name="cilindros" required>
          </div>
          <div class="col-md-4">
            <label>Dirección*</label>
            <input type="text" class="form-control" placeholder="Ingrese su dirección"
                   name="puertas" required>
          </div>
          <div class="col-md-4">
            <label>Colonia*</label>
            <input type="text" class="form-control" placeholder="Ingrese su colonia"
                   name="n0factura" required>
          </div>
        </div>
        <div class="col-md-12">
          <button class="btn-square-round-pantone-green mt-4 h-35 float-end" type="submit">Siguiente
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

defineProps({
  RFC:String,
  CURP:String,
});
const propietario = ref({
  Nombre: '',
  PrimerApellido:'',
  SegundoApellido:'',
  RFC:'',
  CURP:'',
  CorreoElectronico:'',
  Telefono:'',
  Direccion:'',
  Colonia:'',
})
</script>