<template>
  <div class="card-body">
    <HeaderSection tittle="Vehículos del trámite" :size-tittle="4"
                   text="Por favor complete la información a continuación"/>
    <div class="row">
      <div class="mb-4">
        <label class="form-label">
          Tipo de vehículo <span class="text-danger">*</span>
        </label>
        <div class="hstack gap-2">
          <div class="form-check pe-2">
            <input class="form-check-input" @click="auto()" type="checkbox" name="auto" id="auto"
                   value="option2">
            <label class="form-check-label" for="auto">
              <h5 class="fw-semibold" >Automóvil</h5>
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" @click="moto()" type="checkbox" name="moto" id="moto"
                   value="option2">
            <label class="form-check-label" for="moto">
              <h5 class="fw-semibold"> Motocicleta</h5>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="aut === true">
      <h4 class="py-2">Vehículo: <span class="text-seafi-red">Automóvil</span></h4>
      <FormVehiculo ref="mostrar" :idTipoVehiculo=1 :activaR="activaR"></FormVehiculo>
    </div>
    <div v-if="mot === true">
      <h4 class="py-2">Vehículo: <span class="text-seafi-red">Motocicleta</span></h4>
      <FormVehiculo :puertas="0" :idTipoVehiculo=2 :activaR="activaR" ></FormVehiculo>
    </div>
  </div>


  <div class="card-footer">
    <div class="mt-2">
      <div class="col-lg-12 py-2">
        <div class="hstack gap-2 justify-content-end">
          <b-button class="m-2" @click="volver" variant="btn btn-square-soft-pantone-gray" >
            <i class="  mdi mdi-arrow-left-bold align-middle pe-2"></i>Atras
          </b-button>
          <div  @click="siguiente">
          <b-button variant="btn btn-square-round-pantone-green" id="siguiente"> Siguiente
            <i class="mdi mdi-arrow-right-bold align-middle ps-2"></i>
          </b-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useUsuarioStore} from "@/store/modules/usuario.store";
import {useSsoStore} from "@/store/modules/sso.store";
import HeaderSection from "@/components/headerSection";
import FormVehiculo from "@/views/modules/user/components/content/FormVehiculo";
import {onMounted, ref} from "vue";
import {useAutoStorage} from "@/store/modules/vehiculo.store";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {useCitaStorage} from "@/store/modules/cita.store";
import {VehiculosService} from "@/api/connection/providers/Vehiculos.service";


const citaStore = useCitaStorage()

const vehiculoStore = useAutoStorage(); //para el guardado local del vector automoviles

const {vehiculo} = storeToRefs(vehiculoStore)
const {setteo} = vehiculoStore;

const {validacionAutos} = vehiculoStore;
const {borrarStore} = vehiculoStore;
const v = ref();
const usuarioStore = useUsuarioStore()
const ssoStore = useSsoStore()
const router = useRouter();

const mostrar = ref();

const opt = ref(false);
const aut = ref(false);
const mot = ref(false);

const auto = () => {
  var auto = document.getElementById("auto");
  var moto = document.getElementById("moto");
  if (auto.checked === true) {
    aut.value = true;
    mot.value = false;
    moto.checked = false;
    localStorage.removeItem('Automoviles');
    vehiculo.value.length = null;

  } else {
    aut.value = false;
  }
}

const moto = () => {
  let moto = document.getElementById("moto");
  let auto = document.getElementById("auto");
  if (moto.checked === true) {
    mot.value = true;
    aut.value = false;
    auto.checked = false;
    localStorage.removeItem('Automoviles');
    vehiculo.value.length = null;

  } else {
    mot.value = false;
  }
}




const siguiente = async () => {
  try {
  await validacionAutos()
  }catch (e) {
    console.log(e)
  }
}

const volver = () => {
  borrarStore
  router.push('/miscitas/citas/tramite')
}

const activaR = async () =>{
  let buton = document.querySelector("#siguiente");
  buton.disabled = vehiculo.value.length === 0;


}



onMounted( async () => {
await activaR()


});

</script>