/**
 * Ingresa fecha en formato Date (Date Fri Oct 21 2022 00:00:00 GMT-0500 (hora de verano central))
 * y retorna fecha en formato String (2022-10-21)
 **/
function toStringDate(fecha) {
    try {
        const z = n => ('0' + n).slice(-2);
        return fecha.getFullYear() + '-' + z(fecha.getMonth()+1) + '-' + z(fecha.getDate());
    }catch (e){

    }
}

/**
 * Ingresa fecha en formato String (2022-10-21)
 * y retorna arreglo de fechas en formato Date.parse
 **/
function toDatePaser(fecha){
    let identificador = fecha[0]
    let split = []
    let divisor = identificador.includes("/") ? "/" : "-";

    if(!fecha.includes(' ')){
    fecha.map(x =>{
                let fechas = {
                    dia: x.split(divisor)[0],
                    mes: (parseInt(x.split(divisor)[1])-1).toString(),
                    anio : x.split(divisor)[2]
                }
                return split.push(fechas)
            })

            let fechas = split.map(x => {
                return Date.parse(new Date(x.anio, x.mes, x.dia))
            })

            return fechas
    }

    return []
}

function toYearMonthDay(fecha){
    const [dia, mes,anio] = fecha.split("/")
    return `${anio}/${mes}/${dia}`;

}

/**
 * Ingresa hora en formato HH:MM:SS y retorna hora en formato HH:MM
 **/
const toHourMinute = (hora) =>{
    const [hh, mm, ss] = hora.split(":")
    return `${hh}:${mm}`;
}

/**
 * Ingresa fecha en formato HH:MM:SS y retorna hora en formato DD/MM/YY
 **/
const toDayMonthYear = (fecha) =>{
    if(fecha.includes("T")){
        const formart = fecha.split("T")[0]
        const [anio, mes, dia] = formart.split('-');
        return `${dia}/${mes}/${anio}`;
    }

    const [anio, mes, dia] = fecha.split("/")


    return `${dia}/${mes}/${anio}`;
}

export const UtilsDate = {
    toDayMonthYear,
    toHourMinute,
    toStringDate,
    toDatePaser,
    toYearMonthDay
}