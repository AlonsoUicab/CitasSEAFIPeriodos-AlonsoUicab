<template>
    <div class="profile-foreground position-relative mx-n4 mt-n4">
        <div class="profile-wid-bg">
            <img src="~@/assets/images/layouts/background/background_seafi.svg" alt=""  class="profile-wid-img" >
        </div>
    </div>
    <div class="pt-4 mb-4 mb-lg-3 pb-lg-4">
        <div class="row g-4">
            <div class="col">
                <div class="col-md-12 text-center ">
                    <div class="p-2 ">
                        <h1 class="text-white mb-1 fw-bold"> Agenda tu cita</h1>
                        <h1 class="text-white fw-light">para trámites de la SEAFI</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <div class="col-lg-12 ">
    <div class="card">
      <div class="card-header py-0">
          <div class="step-arrow-nav mx-n3 ">
              <ul class="nav nav-pills nav-justified custom-nav" >
                  <li class="nav-item" >
                      <router-link class="nav-link fs-15 p-3"
                                   to="/miscitas/citas/datospersonales" @click.native.prevent.capture="clicked"
                                   active-class="active"
                                   >
                          <span class="text-truncate align-middle">
                              <i class="mdi mdi-account-circle fs-4 me-2"></i>Datos Personales
                          </span>
                      </router-link>
                  </li>
                  <li class="nav-item" >
                      <router-link class="nav-link fs-15 p-3"
                                   active-class="active"
                                   to="/miscitas/citas/tramite" @click.native.prevent.capture="clicked">
                          <span class="text-truncate align-middle">
                              <i class="mdi mdi-file-document-outline fs-4 me-2"></i>Trámite
                          </span>
                      </router-link>
                  </li>
                  <li class="nav-item" id="buton" >
                      <router-link class="nav-link fs-15 p-3"

                                   active-class="active"
                                   to="/miscitas/citas/vehiculo" @click.native.prevent.capture="clicked">
                          <span class="text-truncate align-middle">
                              <i class="mdi mdi-car-info fs-4 me-2"></i>Vehículos
                          </span>
                      </router-link>
                  </li>
                  <li class="nav-item" id="buton" >
                      <router-link class="nav-link fs-15 p-3"

                                   active-class="active"
                                   to="/miscitas/citas/fecha" @click.native.prevent.capture="clicked">
                          <span class="text-truncate align-middle">
                              <i class="mdi mdi-calendar-clock-outline fs-4 me-2"></i>Fecha y hora
                          </span>
                      </router-link>
                  </li>
                  <li class="nav-item" id="buton" >
                      <router-link class="nav-link fs-15 p-3 "

                                   active-class="active"
                                   to="/miscitas/citas/finalizar" @click.native.prevent.capture="clicked">
                          <span class="text-truncate align-middle">
                              <i class="mdi mdi-calendar-check-outline fs-4 me-2"></i>Finalizar
                          </span>
                      </router-link>
                  </li>
              </ul>

          </div>
         </div>
      <div class="card-body ">

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import {RouterLink} from "vue-router"
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {SansionesService} from "@/api/connection/providers/Sansiones.service";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";

const router = useRouter()
const opt = true

const clicked = (e) => {
  e.preventDefault()
}


const validarSancion = async () => {
    let response = await SansionesService.validarSanciones()
    if(response===true){
        await NotificacionesCitas.tieneSancion();
        await router.push({name: 'default'})

    }else{
        await router.push({name: 'datospersonales', replace:true})
      
    }
}

onMounted( async () => {
    await validarSancion()
})

// window.addEventListener('popstate',function (event){
//   history.pushState(null,null,window.location.pathname);
//   history.pushState(null,null,window.location.pathname);
// },false);



</script>

<style scoped>
</style>
