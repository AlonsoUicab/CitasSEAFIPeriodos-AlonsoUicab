import {defineStore} from "pinia";
import {VehiculosService} from "@/api/connection/providers/Vehiculos.service";
const tipoVehiculos = VehiculosService;

import {NotificacionesRecepcion} from "@/helpers/notifications/NotificacionesRecepcion";
import {CitasService} from "@/api/connection/providers/Citas.service";
import {NotificacionesCitas} from "@/helpers/notifications/NotificacionCitas";
import {FechasHorarios} from "@/api/connection/providers/FechasHorarios.service";
import {UtilsDate} from "@/helpers/Dates/UtilsDate";
import {diasOcupados} from "@/api/mocks/datos-informativos.mock";

import {ref} from "vue";
import PantallaCarga from "@/helpers/notifications/PantallaCarga";
import NotificacionError from "@/helpers/notifications/NotificacionError";
import {ReportesService} from "@/api/connection/providers/Reporte.service";

export const useCitaStorage = defineStore('Citas',  {

    state: () => ({
        idCita: null, //Desactivado momentaneamente para poder enviar el state correcto a la api
        idTramite: null,
        idTipoContribuyente: "1", //apoderado o dueño valores entre 1 y 2
        fechaCita: "",
        idHorario: null,
        idEstatusSat: null,
        datosVehiculo: null,
        diasOcupados : [],
        diasInhabiles: [],
        citaAgendada: [] //guardara todos los datos que me devuelva el server
    }),

    getters: {

    },

    actions: {
        async atenderRequisitosCompletos(idCita, numFolio) {
            const confirmado = await NotificacionesRecepcion.ConfirmacionAtender(numFolio, "Completos")
            if (confirmado.isConfirmed) {
                try {
                    await CitasService.requisitosCompletos(idCita)
                    await NotificacionesRecepcion.PantallaExito("La cita ha sido atendida con Exito")
                } catch (e) {
                    await NotificacionesRecepcion.PantallaError('Ocurrio un error al marcar');
                    throw e
                }
            }
        },

        async atenderRequisitosIncompletos(idCita, numFolio) {
            const confirmado = await NotificacionesRecepcion.ConfirmacionAtender(numFolio,"Incompletos")
            if (confirmado.isConfirmed) {
                try {
                    await CitasService.requisitosIncompletos(idCita)
                    await NotificacionesRecepcion.PantallaExito("La cita ha sido atendida con Exito")
                } catch (e) {
                    await NotificacionesRecepcion.PantallaError("Ocurrio un error al marcar");
                    throw e
                }
            }
        },

        async marcarCancelarCita(numFolio,idCita) {
            let validar = await CitasService.validarCitasCanceladasSemana(idCita)
            const confirmado = await NotificacionesCitas.ConfirmacionCancelacion(numFolio, validar)
            if (confirmado.isConfirmed) {
                try {
                    PantallaCarga.mostrar()
                    await CitasService.cancelarCita(idCita)
                    await NotificacionesCitas.ExitoCancelacion("La cancelacion ha sido un exito");
                } catch (e) {
                    await NotificacionesCitas.ErrorCancelacion(e);
                }
            }
        },

        async consultaDias(){
            this.diasOcupados = await FechasHorarios.ObtenerDiasNoDisponiblesEnPeriodosActivos()
            localStorage.setItem('diasOcupados',this.diasOcupados)

            this.diasInhabiles = await FechasHorarios.ObtenerListaDiasInhabiles()

            localStorage.setItem('diasInhabiles',this.diasInhabiles)
        },

        async generarAcuse(numFolio, idCita){
            try {
                PantallaCarga.mostrar()
                let blob = await ReportesService.obtenerAcuse(idCita)
                let url = window.URL.createObjectURL(new Blob([blob]));
                let link = document.createElement('a');
                link.href = url;
                link.download = `Acuse_${numFolio}.pdf`;
                document.body.appendChild(link);
                link.click();
                link.remove();
            }catch(e){
                await NotificacionError.Reportes(e);
            }finally {
                PantallaCarga.ocultar();
            }
        }

    }
});