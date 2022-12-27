import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import storePinia from '@/store'

import BootstrapVue3 from 'bootstrap-vue-3';
import vClickOutside from "click-outside-vue3"
import VueApexCharts from "vue3-apexcharts";
import Maska from 'maska';

import VueFeather from 'vue-feather';
import Particles from "particles.vue3";

import '@/assets/scss/config/material/app.scss';
import '@vueform/slider/themes/default.css';
import "@vueform/multiselect/themes/default.css";
import './registerServiceWorker'

createApp(App)
    .use(storePinia)
    .use(router)
    .use(VueApexCharts)
    .use(BootstrapVue3)
    .component(VueFeather.type, VueFeather)
    .use(Maska)
    .use(Particles)
    .use(vClickOutside).mount('#app')
