import { defineStore } from "pinia";

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        tema: 'light'
    }),

    getters: {},

    actions: {
        establecerTema(color){
            this.tema = color
            document.documentElement.setAttribute("data-layout-mode", color)
        }
    },
})