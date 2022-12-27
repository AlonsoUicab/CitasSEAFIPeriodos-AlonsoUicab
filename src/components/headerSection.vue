<template>
    <div :class="padding">
        <h5 class="mb-1 mt-2 fw-semibold" :class="`text-${colorTittle} fs-${sizeTittle}`">
            {{ tittle }} <span :class="`text-${colorHighlight}`">{{highlight}}</span>
        </h5>
        <p  :class="`text-${colorText} ${marginText}`" v-show="!(text===null)">
            {{text}}
        </p>
    </div>
</template>

<script setup>
const props = defineProps({
    tittle          : String,
    highlight       : String,
    text            : String,
    padding         : {
        type        : String,
        default     : "pt-3",
    },
    marginText      : {
        type        : String,
        default     : "mb-4"
    },
    sizeTittle      : {
        type        : Number,
        default     : 0
    },
    colorTittle     : {
        type        : String,
        default     : ""
    },
    colorHighlight  : {
        type        : String,
        default     : ""
    },
    colorText       : {
        type        : String,
        default     : "muted"
    }
})
</script>