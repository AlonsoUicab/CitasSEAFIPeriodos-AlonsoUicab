<template>
    <div class="ms-1 header-item d-sm-flex">
        <a class="btn-icon btn-topbar btn-ghost-pantone-gold rounded-circle light-dark-mode"
           data-bs-toggle="tooltip"
           data-bs-placement="left"
           title="Cambiar tema"
           style="cursor: pointer"
           @click="toggleDarkMode">
            <i class="bx bx-moon fs-22"></i>
        </a>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/store/modules/layout.store";

const layoutStore = useLayoutStore()

const {tema}           = storeToRefs(layoutStore)
const {establecerTema} = layoutStore

const toggleDarkMode = () => {
    if (tema.value === "dark")
        establecerTema('light')
    else
        establecerTema('dark')
}
</script>

<style scoped>

</style>