<template>
    <div :class="`col-md-${cols} col-sm-12`">
        <div class="d-flex mb-4">
            <div class="flex-shrink-0 avatar-xs align-self-center me-3">
                <div class="avatar-title bg-light rounded-circle fs-16 text-pantone-red shadow">
                    <i :class="`mdi mdi-${icono} mdi-24px`"></i>
                </div>
            </div>
            <div class="flex-grow-1 overflow-hidden">
                <p class="mb-1 fw-bold text-gray">{{ label }}</p>
                <h6 class="fw-bold mb-0">{{ texto }}</h6>  <!--text-truncate-->
                <h6 v-if="texto==null" class="text-truncate mb-0 text-pantone-gold">{{placeholder}}</h6>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    icono: String,
    label: String,
    texto: String,
  numero: Number,
    cols : Number,
    placeholder: String,
})
</script>

<style scoped>

</style>