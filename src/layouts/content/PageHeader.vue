<script setup>
const props = defineProps({
    title: {
        type   : String,
        default: "",
    },
    items: {
        type   : Array,
        default: () => {
            return [];
        },
    }
})
</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">{{ title }}</h4>
                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item" v-for="(item, index) in items" :key="index"
                            :class="{ active: item[0] }">
                            <router-link :to="item.href">{{ item.text }}</router-link>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>
