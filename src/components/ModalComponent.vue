<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Modal from 'bootstrap/js/dist/modal'

defineProps({
    sizeModal          : {
        type        : String,
        default     : "500px"
    },
});
let modalEle     = ref();
let thisModalObj = null;

onMounted(() => {
    thisModalObj = new Modal(modalEle.value);
    document.body.classList.contains("modal-backdrop.fade.show")
        ? document.body.classList.remove("modal-backdrop.fade.show")
        : document.body.classList.add("modal-backdrop.fade.show");
});

function _show() {
    thisModalObj.show();
}

function _hide() {
    thisModalObj.hide()
}

onUnmounted(() => {
    thisModalObj.hide()
})

defineExpose({show: _show, hide: _hide});
</script>

<template>
    <div class="modal fade"
         id="exampleModal"
         tabindex="-1"
         aria-labelledby=""
         data-bs-backdrop="static"
         data-bs-keyboard="false"
         aria-hidden="true"
         role="dialog"
         ref="modalEle">
        <div class="modal-dialog modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"/>
                </div>
                <div class="modal-body">
                    <slot name="body"/>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.modal-content {
    -webkit-border-radius: 15px !important;
    -moz-border-radius: 15px !important;
    border-radius: 15px !important;
}
@media (min-width: 576px){
.modal-dialog {
    max-width: v-bind('sizeModal')!important;
}
}
</style>
