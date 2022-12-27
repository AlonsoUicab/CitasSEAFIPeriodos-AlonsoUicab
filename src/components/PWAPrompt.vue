<template>
    <!--    <div v-if="shown">
            ¿Dese instalar la aplicación?

            <button @click="installPWA">
                Instalar
            </button>

            <button @click="dismissPrompt">
                No
            </button>
        </div>-->
    <div id="liveToast" class="toast bg-light position-absolute bottom-0 start-50 translate-middle-x"
         style="z-index: 10000" role="alert" aria-live="assertive" aria-atomic="true" ref="Ele">
        <div class="toast-body">
            ¿Dese instalar la aplicación?
            <div class="mt-2 pt-2 border-top">
                <button type="button" class="btn btn-primary btn-sm mx-2" @click="installPWA">Instalar</button>
                <button type="button" class="btn btn-secondary btn-sm" @click="dismissPrompt" data-bs-dismiss="toast">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Toast from 'bootstrap/js/dist/toast'
import { onMounted, ref } from "vue";

const shown        = ref(false)
const installEvent = ref()

let Ele          = ref();
let thisToastObj = null;


window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installEvent.value = e
    thisToastObj.show()
})

const dismissPrompt = () => {
    thisToastObj.hide()
}

const installPWA = () => {
    installEvent.value.prompt()
    installEvent.value.userChoice.then((choice) => {
        dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
            // Do something additional if the user chose to install
        } else {
            // Do something additional if the user declined
        }
    })
}

onMounted(() => {
    thisToastObj = new Toast(Ele.value);
    thisToastObj.show()
})
/*
 export default {
 data: () => ({
 shown: true,
 }),

 beforeMount() {
 window.addEventListener('beforeinstallprompt', (e) => {
 e.preventDefault()
 this.installEvent = e
 this.shown        = true
 })
 },

 methods: {
 dismissPrompt() {
 this.shown = false
 },

 installPWA() {
 this.installEvent.prompt()
 this.installEvent.userChoice.then((choice) => {
 this.dismissPrompt() // Hide the prompt once the user's clicked
 if (choice.outcome === 'accepted') {
 // Do something additional if the user chose to install
 } else {
 // Do something additional if the user declined
 }
 })
 },
 }
 }*/
</script>