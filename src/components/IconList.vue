<template>
    <li class="list-group-item">
        <h6>
            <i :class="`mdi mdi-${icono} fs-3 me-2 al align-middle`"></i>
            {{label}}
        </h6>
    </li>
</template>

<script setup>
const props = defineProps({
    icono: String,
    label: String
})
</script>

<style scoped>

</style>
