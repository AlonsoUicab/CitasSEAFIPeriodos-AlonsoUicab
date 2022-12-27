<template>
  <li class="nav-item flex-grow-1 text-center text-pantone-green">
    <a class="nav-link done text-truncate"
       @click="cambiarOpcion(3)"
       :class="{'active':opcion ===3}"
       style="cursor: pointer"
       id="3"
    >
      Vehiculo 3
    </a>
  </li>
</template>

<script setup>
const props = defineProps({
  icono: String,
  label: String,
  texto: String,
  cols : Number,
  placeholder: String,
})
</script>