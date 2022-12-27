<template>
    <li class="nav-item collapsed">
        <a class="nav-link"
           data-bs-toggle="collapse"
           role="button"
           @click="cambiarEstado"
           :class="{ 'active': pathActivo}"
           aria-expanded="false"
        >
            <i class="mdi" :class="modulo.icono"></i>
            {{ modulo.nombre }}
        </a>
        <div class="collapse menu-dropdown" ref="referencia">
            <ul class="nav nav-sm flex-column">
                <li class="nav-item" v-for="opcion in modulo.catOpciones">
                    <router-link @click="ocultarTodo" class="nav-link menu-link dropdown-item"
                                 :to="{name: opcion.url}"
                                 v-slot="{ isActive }">
                        <i class="mdi" :class="[{ 'active-link': isActive }, opcion.icono]"></i>
                        <span data-key="t-widgets"
                              :class="{ 'active': isActive,}">{{ opcion.nombre }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </li>
</template>

<script setup>
import Collapse from 'bootstrap/js/dist/collapse'
import { onMounted, ref, computed, getCurrentInstance } from 'vue'
import { useRoute } from "vue-router";

const props = defineProps(['modulo'])

const route = useRoute()

const referencia = ref()
const elemento   = ref()
const instance   = getCurrentInstance();

const pathActivo = computed(() => {
    return rutasOpciones.value.some(u => route.path.includes(u))
})

const rutasOpciones = computed(() => {
    const opcionesUrl = props.modulo.catOpciones.map(m => m.url.substring(1))
    return opcionesUrl.map(m => m.slice(0, m.indexOf('/')))
})

const cambiarEstado = () => {
    elemento.value.toggle()
}
const ocultarTodo   = () => {
    instance.parent.parent.refs.navBar.toggleHamburgerMenu()

}

onMounted(() => {
    elemento.value = new Collapse(referencia.value)
})

</script>

<style scoped>
</style>
