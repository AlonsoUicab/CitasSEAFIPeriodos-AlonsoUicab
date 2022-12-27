<template>
    <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";
import { useLayoutStore } from "@/store/modules/layout.store";
import { storeToRefs } from "pinia/dist/pinia";

document.documentElement.setAttribute("data-layout", "horizontal");

const layoutStore = useLayoutStore()

const {tema} = storeToRefs(layoutStore)

const {establecerTema} = layoutStore

onMounted(() => {
    establecerTema(tema.value)

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        establecerTema(newColorScheme)
    });
})
</script>
