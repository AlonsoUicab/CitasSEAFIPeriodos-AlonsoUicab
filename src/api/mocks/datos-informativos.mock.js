export const datosTramitesNombres = `
<ul style="text-align: left">
    <li>ALTA DE VEHÍCULO NUEVO</li>
    <li>ALTA DE VEHÍCULO USADO</li>
    <li>ALTA DE VEHÍCULO EXTRANJERO</li>
    <li>CAMBIO DE PROPIETARIO</li>
    <li>CAMBIO DE MOTOR</li>
    <li>CAMBIO DE DOMICILIO</li>
    <li>BAJA DE VEHÍCULO</li>
    <li>REEMPLACAMIENTO POR EXTRAVIÓ O ROBO DE PLACAS</li>
</ul>
`
export const datostramite = [
    {tipoTramite: 'ALTA DE VEHÍCULO NUEVO', t : 1},
    {tipoTramite: 'ALTA DE VEHÍCULO USADO', t: 2},
    {tipoTramite: 'ALTA DE VEHÍCULO EXTRANJERO' ,t: 3 },
    {tipoTramite: 'CAMBIO DE PROPIETARIO' ,t: 4},
    {tipoTramite: 'CAMBIO DE MOTOR' ,t: 5},
    {tipoTramite: 'CAMBIO DE DOMICILIO' ,t: 6},
    {tipoTramite: 'BAJA DE VEHÍCULO' ,t: 7},
    {tipoTramite: 'REEMPLACAMIENTO POR EXTRAVIÓ O ROBO DE PLACAS' ,t: 8}
]

export const datosContribuyente = `
<div class="row p-0 m-0">
    <div class="col-md-6 px-0 mx-0">
        <ul class="text-uppercase mb-0"
            style="text-align: left;">
            <li>RFC / CURP</li>
            <li>Nombre</li>
            <li>Primer Apellido</li>
            <li>Segundo apellido*</li>
            <li>Correo Electrónico</li>
            <li>Teléfono</li>
        </ul>
    </div>
    <div class="col-md-6 px-0 mx-0">
        <ul class="text-uppercase mb-o"
            style="text-align: left;">
            <li>Calle</li>
            <li>Num. Exterior</li>
            <li>Num. Interior</li>
            <li>Cruzamiento 1</li>
            <li>Cruzamiento 2</li>
            <li>Referencia</li>
        </ul>
    </div>
</div>
<small class="text-muted" style="text-align: left">*Datos no obligatorios</small>
`

export const datosVehiculo = `
<div class="row p-0 m-0">
    <div class="col-md-6 px-0 mx-0">
        <ul class="text-uppercase mb-0"
            style="text-align: left;">
            <li>Tipo de Vehículo</li>
            <li>Marca</li>
            <li>Línea</li>
            <li>Año Modelo</li>
            <li>Número de Serie</li>
            <li>Número de Motor</li>
        </ul>
    </div>
    <div class="col-md-6 px-0 mx-0">
        <ul class="text-uppercase mb-o"
            style="text-align: left;">
            <li>Color</li>
            <li>Puertas*</li>
            <li>Cilindros</li>
            <li>Número de factura</li>
            <li>Fecha de factura</li>
            <li>Importe de la factura</li>
        </ul>
    </div>
</div>
<small class="text-muted">*Aplica solo en ciertos vehículos</small>
`

export const opcionesDeUso = [
    {
        icono : 'calendar-multiple',
        label : 'Llevar un historial de citas.'
    },
    {
        icono : 'calendar-check',
        label : 'Agendar citas.'
    },
    {
        icono : 'calendar-edit',
        label : 'Reagendar citas.'
    },
    {
        icono : 'calendar-remove',
        label : 'Cancelar citas.'
    },
]
export const advertenciasCitas = [
    {
        icon    : "account-alert",
        text    : "La cita es intransferible y personal, por lo que debe asistir la persona que la realizó.",
        span    : ""
    },
    {
        icon    : "clock-alert-outline",
        text    : "Se debe asistir con 10 minutos de antelación a la hora establecida en su cita.",
        span    : "¡No hay tolerancia!"
    },
    {
        icon    : "file-document-multiple-outline",
        text    : "Debe contar con todos los documentos solicitados para el trámite.",
        span    : "Los documentos pueden variar de acuerdo al trámite"
    },
    {
        icon    : "alert-octagon-outline",
        text    : "La acumulación de 3 inasistencias en el periodo será motivo de sanción.",
        span    : "Se le negará la posibilidad de agendar citas durante el proximo mes, a partir de su ultima inasistencia."
    },
    {
        icon    : "calendar-remove",
        text    : "Con tres cancelaciones acumuladas en un periodo de una semana, sera motivo de sanción.",
        span    : "Se le negará la posibilidad de agendar citas durante el proximo mes, a partir de su ultima cancelación."
    },
    {
        icon    : "calendar-edit",
        text    : "Puede reagendar o cancelar una cita de ser necesario, el reagendar no implica ninguna sanción.",
        span    : " Sin embargo, solo se puede hasta máximo 3 días" +
            " antes de la fecha programada, de lo contrario queda a criterio del Contribuyente el asistir o no a su cita y las sanciones que ocasiona."
    },

]

export const requisitostramite = [
    {
        id : 1,
        tramite    : "Emplacamiento de vehiculos nuevos",
        requisitos    : [
            {
                requisito: "Original y copia de la factura del vehículo verificada con sellos originales de verificación vehicular " +
                    "expedido por la Secretaria de Protección y Seguridad Ciudadana., Para vehículos Financiados o a Crédito presentar: copia de factura y original de la carta factura vigente."
            },
            {
                requisito: "Original y copia de la CURP del propietario del vehículo (personas físicas)"
            },
            {
                requisito: "Correo electrónico del propietario del vehículo"
            },
            {
                requisito: `Original y copia del comprobante de domicilio (luz, agua, teléfono, predial, domicilio catastral) a nombre del propietario del vehículo. En caso de no estar a nombre del propietario del vehículo, además del comprobante podrá presentar lo siguiente:` +
                    `a.Contrato de arrendamiento notariado.` +
                    `b.Identificación Oficial expedida por el INE del propietario del vehículo con el mismo domicilio señalado en el Comprobante de domicilio.`
            },
            {
                requisito: "Identificación oficial del propietario del vehículo:" +
                    "Persona Física." +
                    "I.Original y copia de la Identificación Oficial expedida por el INE, Licencia de conducir, cartilla del SMN, o pasaporte.  " +
                    "Persona Física con actividad empresarial.    " +
                    "I.Original y copia R.F.C" +
                    "II. Original y copia de la Identificación Oficial expedida por el INE, Licencia de conducir, cartilla del SMN, o pasaporte " +
                    "Persona Moral.    " +
                    "I.Original y copia del R.F.C. de la Empresa, Institución o Ente Público   " +
                    "II.Original y copia del Acta Constitutiva y/o Poder Notarial " +
                    "III.Original y copia de la Identificación Oficial expedida por el INE del Representante o del Apoderado Legal.  "
            },
            {
                requisito: "En caso de que no se presente el propietario del vehículo, deberá presentar carta poder dirigida a nombre del Servicio de Administración Fiscal del Estado de Campeche, y original y copia de la identificación del tramitador, así como también copias del INE de ambos testigos. Cuando se trate de persona moral deberá presentar poder notarial o carta poder notariada."
            },
        ]
    },
    {
        id : 2,
        tramite    : "Emplacamiento de vehiculos usados",
        requisitos    : [
            {
                requisito: "Original y copia de la factura del vehículo verificada con sellos originales de verificación vehicular expedido por la Secretaria de Protección y Seguridad Ciudadana., Para vehículos Financiados o a Crédito presentar: copia de factura y original de la carta factura vigente"
            },
            {
                requisito: "Original y copia de la CURP del propietario del vehículo (personas físicas)"
            },
            {
                requisito: "Correo electrónico del propietario del vehículo"
            },
            {
                requisito: "Original y copia de los últimos cinco pagos del Impuesto sobre Tenencia o Uso de Vehículos y/o Derechos Vehiculares."
            },
            {
                requisito: "Juego de Placas de circulación o, en su caso, original y copia del Acta levantada ante la Fiscalía General del Estado por extravío o robo de Placas o Baja expedida por la Dependencia correspondiente."
            },
            {
                requisito: "Original del recibo de pago de Derechos Vehiculares del H. Ayuntamiento según corresponda."
            },
            {
                requisito: "Original y copia del comprobante de domicilio (luz, agua, teléfono, predial, domicilio catastral) a nombre del propietario del vehículo. En caso de no estar a nombre del propietario del vehículo, además del comprobante podrá presentar lo siguiente:" +
                    "a.Contrato de arrendamiento notariado." +
                    "b.Identificación Oficial expedida por el INE del propietario del vehículo con el mismo domicilio señalado en el Comprobante de domicilio."
            },
            {
                requisito: "Identificación oficial del propietario del vehículo:" +
                    "Persona Física.  " +
                    "I.Original y copia de la Identificación Oficial expedida por el INE, Licencia de conducir, cartilla del SMN, o pasaporte.  " +
                    "Persona Física con actividad empresarial.    " +
                    "I.Original y copia R.F.C  " +
                    "II. Original y copia de la Identificación Oficial expedida por el INE, Licencia de conducir, cartilla del SMN, o pasaporte " +
                    "Persona Moral.    " +
                    "I.Original y copia del R.F.C. de la Empresa, Institución o Ente Público   " +
                    "II.Original y copia del Acta Constitutiva y/o Poder Notarial " +
                    "III.Original y copia de la Identificación Oficial expedida por el INE del Representante o del Apoderado Legal.  "
            },
            {
                requisito: "En caso de que no se presente el propietario del vehículo, deberá presentar carta poder dirigida a nombre del Servicio de Administración Fiscal del Estado de Campeche, y original y copia de la identificación del tramitador, así como también copias del INE de ambos testigos. Cuando se trate de persona moral deberá presentar poder notarial o carta poder notariada."
            }
        ]
    }
]

/*
* Fecha y hora de MisCitas
*/
export const diasOcupados = [
    "2022-10-26",
    "2022-10-24"
]


export const diasInhabiles = [
    "2022-10-03",
    "2022-10-28",
]

export const HorariosCitas = [
    {Hora: "9:00 a.m"},{Hora:"10:00 a.m"},{Hora:"11:00 p.m"},{Hora: "12:00 p.m"}
]

export const datosVehiculos = [
    {
        tipo:"Automovil",
        marca:"Audi",
        modelo:"A5",
        anioModelo:"2022",
        serie:"AVFSFYTDVGTDRSFY",
        motor:4551742544284,
        color:"Rojo",
        cilindros:"8",
        puertas:"4",
        noFactura: 45155,
        facturaFecha:"01/10/2022",
        facturaImporte:"1,000,000"
    },
    {
        tipo:"Automovil",
        marca:"BMW",
        modelo:"Serie 6",
        anioModelo:"2022",
        serie:"ERDFSFSDGGEDD",
        motor:44441244874,
        color:"Verde",
        cilindros:"12",
        puertas:"8",
        noFactura: 45155,
        facturaFecha:"01/10/2022",
        facturaImporte:"1,500,000"
    },
    {
        tipo:"Automovil",
        marca:"Chevrolet",
        modelo:"Camaro",
        anioModelo:"2023",
        serie:"OOEDDFGTTE",
        motor:57548621455265,
        color:"Cafe",
        cilindros:"24",
        puertas:"8",
        noFactura: 87455784,
        facturaFecha:"01/10/2022",
        facturaImporte:"2,500,000"
    }
]
export const situacionFiscal = [
    {situacion:"Situacion 1"},{situacion: "Situacion 2"},{situacion: "Situacion 3"}
]