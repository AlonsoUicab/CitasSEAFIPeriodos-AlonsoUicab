<template>
  <!-- Grids in modals -->
  <div class="modal fade"  id="editarVehiculo" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalgridLabel">Grid Modals</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="javascript:void(0);">
            <div class="row g-3">
              <div class="col-xxl-6">
                <div>
                  <label for="firstName" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="firstName" placeholder="Enter firstname">
                </div>
              </div><!--end col-->
              <div class="col-xxl-6">
                <div>
                  <label for="lastName" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="lastName" placeholder="Enter lastname">
                </div>
              </div><!--end col-->
              <div class="col-lg-12">
                <label for="genderInput" class="form-label">Gender</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">Female</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                    <label class="form-check-label" for="inlineRadio3">Others</label>
                  </div>
                </div>
              </div><!--end col-->
              <div class="col-xxl-6">
                <div>
                  <label for="emailInput" class="form-label">Email</label>
                  <input type="email" class="form-control" id="emailInput" placeholder="Enter your email">
                </div>
              </div><!--end col-->
              <div class="col-xxl-6">
                <div>
                  <label for="passwordInput" class="form-label">Password</label>
                  <input type="password" class="form-control" id="passwordInput" value="451326546">
                </div>
              </div><!--end col-->
              <div class="col-lg-12">
                <div class="hstack gap-2 justify-content-end">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </div><!--end col-->
            </div><!--end row-->
          </form>
        </div>
      </div>
    </div>
  </div>




  <ModalComponent id="eliminarVehiculo" variant="btn btn-pantone-red">
    <template #header>
      <h5>Eliminar automóvil</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </template>

    <template #body>
      <div class="text-center">
        <i class="mdi mdi-car-off text-info" style="font-size:100px;"></i>
        <h3>Esta seguro que desea eliminar el vehículo:{{dd}}</h3>
      </div>
    </template>

    <template #footer>
      <div class="d-flex align-items-center col-12">
        <div class="col-6 px-2">
          <a class="btn btn-gray w-100" data-bs-dismiss="modal">Cancelar</a>
        </div>
        <div class="col-6 px-2">
          <a class="btn btn-info w-100" @click="$emit('borrar',dd)">Aceptar</a>
        </div>
      </div>
    </template>
  </ModalComponent>

</template>

<script setup>
import ModalComponent from "@/components/ModalComponent";
import {defineProps, reactive, ref} from "vue";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";

const seleccionado   = ref();
const idVehiculo      = ref();

const props = defineProps({Vehiculos: Array, dd: String})

defineEmits(["updateVehiculo", 'deleteVehiculo']);

const mostrarEliminar = async (index) => {
  seleccionado.value = index;
  const sistema      = props.Vehiculos[index];
  idVehiculo.value    = sistema.idVehiculo;
  const confirmado   = await NotificacionesCitas.PantallaConfirmacion()
  if (confirmado.isConfirmed) {
    console.log("Borrado con exito");
    await NotificacionesModal.PantallaExito('El sistema se ha eliminado');
    emit('deleteVehiculo', seleccionado.value)
  }
}

</script>