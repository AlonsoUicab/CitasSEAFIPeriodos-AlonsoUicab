<template>
    <div class="row">
        <div class="col-md-6 d-flex align-items-center">
            <div>
                <h4 class="text-center active fw-semibold">¿Qué requiero para agendar una cita?</h4>
                <ul class="list-group-numbered" >
                    <li class="list-group-item fw-bold">Contar con una cuenta de Llave Campeche
                        <p class="fst-italic text-pantone-red fw-normal">
                            <a @click="abrirEnlace('http://llave.presentacion.campeche.gob.mx/register')" style="cursor: pointer;">
                                ¿Aun no cuentas con una?
                            </a>
                        </p>
                    </li>
                    <li class="list-group-item fw-bold">Conocer los Tramites vehiculares Disponibles
                        <p class="fst-italic text-pantone-red fw-normal">
                            <a @click="mostrarTramitesDisponibles" style="cursor: pointer;">
                                ¿Cuales son los tramites disponibles?
                            </a>
                        </p>
                    </li>
                    <li class="list-group-item fw-bold">Contar con los datos del Vehiculo
                        <p class="fst-italic text-pantone-red fw-normal">
                            <a @click="mostrarDatosVehiculo" style="cursor: pointer;">
                                ¿Que datos del Vehiculo requiero?
                            </a>
                      </p>
                    </li>
                </ul>
                <div class="card alert alert-warning">
                    <p class="fw-bold m-1 text-center">¿Que ocurre si no cuento con algun requisito?</p>
                    <span style="text-align: justify;">Los Requisitos Listados son obligatorios y se realiza
                        verificacion de datos por lo que al no cumplir con alguno de ellos,
                        <strong>No podra agendar una cita.</strong>
                    </span>
                </div>
          </div>
        </div>
        <div class="col-md-6">
            <img src="@/assets/images/layouts/defaultView/asset03_seafi.png" alt="" style="width: 100%; display: block;
            padding: 2rem"/>
        </div>
    </div>
</template>

<script setup>
import {datosTramitesNombres} from "@/api/mocks/datos-informativos.mock";
import {datosVehiculo} from "@/api/mocks/datos-informativos.mock";
import Swal from "sweetalert2";

const mostrarTramitesDisponibles = () => {
  Swal.fire({
    title             : `<i class="mdi mdi-text-box-check-outline text-seafi-aqua" style="font-size:100px;"></i></br>` + 'Trámites vehiculares disponibles',
    html              : datosTramitesNombres,
    imageHeight       : 200,
    imageAlt          : 'RFC',
    showCloseButton   : true,
    confirmButtonText : 'Aceptar',
    confirmButtonColor: '#04989E',
  })
}
const mostrarDatosVehiculo = () => {
    Swal.fire({
        title         : `<i class="mdi mdi-car-info text-seafi-aqua" style="font-size:100px;"></i></br>` + 'Datos de Vehículo que necesita a la mano:',
        html          :datosVehiculo,
        showCloseButton: true,
        confirmButtonText : 'Aceptar',
        confirmButtonColor: '#04989E',
    })
}
const abrirEnlace = (url) => {
    window.open(url)
}

</script>

<style scoped lang="scss">
.list-group-item{
  border:0 !important;
}
.list-group-numbered{
  margin: 0 !important;
  padding: 0 !important;
}
</style>
