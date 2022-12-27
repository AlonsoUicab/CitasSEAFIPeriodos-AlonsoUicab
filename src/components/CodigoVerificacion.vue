<template>
    <label class="form-label fw-semibold">Código de verificación <span class="text-danger">*</span></label>
    <div class="row d-flex justify-content-center">
        <v-otp-input
            inputClasses="form-control control-codigo text-center mx-1"
            ref="otpInput"
            separator=""
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
            input-type="number"
        />
    </div>
</template>

<script setup>
import VOtpInput from 'vue3-otp-input';
import { onMounted, onUnmounted, ref } from "vue";

const codigo   = ref('')
const otpInput = ref()

const handleOnComplete = (value) => {
    codigo.value = value
}
const handleOnChange   = (value) => {
    codigo.value = value
}
const handleClearInput = () => {
    otpInput.value.clearInput();
    codigo.value = ''
}

onMounted(() => {
    codigo.value = ''
})

onUnmounted(() => {
    codigo.value = ''
})

defineExpose({
    codigo
})
</script>

<style scoped>
.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    textalign: "center";
}

.error {
    border: 1px solid red !important;
}

.control-codigo {
    min-height: calc(1.5em + 1rem + 2px);

    font-size: 1rem;
    border-radius: 0.3rem;
}
</style>
