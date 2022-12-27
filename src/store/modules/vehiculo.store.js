import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import NotificacionError from "@/helpers/notifications/NotificacionError";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {useRouter} from "vue-router";


export const useAutoStorage = defineStore('Vehiculo', () => {
    const router = useRouter();
    let vehiculo = ref([]);
    let idCita = ref(null);
    let cita = ref([])

    const add = (autoss) => { //agrega

        vehiculo.value.push(autoss);
    }

    const edit = ([f, car]) => {
        // console.log(car)
        vehiculo.value.splice(f, 1, car)

    }

    const setteo = async (cita) => { //guarda en el storage y redirige (se activa desde la interfaz fecha

        localStorage.removeItem('Vehiculos');
        if (vehiculo.value.length >= 1) {
           // localStorage.setItem('Vehiculos', JSON.stringify(vehiculo.value));
           await router.push("/miscitas/citas/finalizar");
        } else {

           await NotificacionError.VehiculosVacios();
        }
    }

    const borrarStore =  () => {

        vehiculo.value.length = null;

    }

    const validacionAutos = async () =>{ //evita redireccionar si el listado de vehiculos es nulo
        if (vehiculo.value.length !== 0) {
            await router.push("/miscitas/citas/fecha");

        } else {
            await NotificacionError.VehiculosVacios();
        }
    }
    const deletVehiculo = (id) => {
        const f = vehiculo.value.indexOf(id)
        vehiculo.value.splice(f,1)
    }


    return {
        vehiculo,idCita,cita,
        add,
        setteo,
        borrarStore,
        validacionAutos,
        deletVehiculo,
        edit,

    };

});