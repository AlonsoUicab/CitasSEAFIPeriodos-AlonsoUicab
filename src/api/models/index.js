export default {
    CodigoVerificacionDTO: {
        idCodigoVerificacion: {
            type  : "integer",
            format: "int32"
        },
        idUsuario           : {
            type  : "integer",
            format: "int32"
        },
        codigo              : {
            maxLength: 250,
            minLength: 0,
            type     : "integer",
            format   : "int32"
        },
        fechaInicio         : {
            type  : "string",
            format: "date-time"
        },
        fechaFin            : {
            type  : "string",
            format: "date-time"
        },
        activo              : {
            type: "boolean"
        }
    },

    DatoPerfilDTO: {
        required         : [
            "codigoPostal",
            "colonia",
            "curp",
            "direccion",
            "idMunicipio",
            "idSector",
            "nombre",
            "primerApellido",
            "rfc"
        ],
        idSector         : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        idMunicipio      : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        nombre           : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        primerApellido   : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        segundoApellido  : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        curp             : {
            maxLength: 250,
            minLength: 0,
            pattern  : "^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$",
            type     : "string"
        },
        rfc              : {
            maxLength: 250,
            minLength: 0,
            pattern  : "^([A-ZÑ&]{3,4})?(?:-?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01]))?(?:-?)?([A-Z\\d]{2})([A\\d])$",
            type     : "string"
        },
        telefono         : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        direccion        : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        colonia          : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        codigoPostal     : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        unidad           : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        ramo             : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        correoElectronico: {
            maxLength: 250,
            minLength: 0,
            pattern  : "^[^@]+@[^@]+\\.[a-zA-Z]{2,}$",
            type     : "string",
            nullable : true
        }
    },

    DatoPerfilModificarDTO: {
        required    : [
            "codigoPostal",
            "colonia",
            "curp",
            "direccion",
            "idMunicipio",
            "idSector",
            "rfc"
        ],
        idSector    : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        idMunicipio : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        curp        : {
            maxLength: 250,
            minLength: 0,
            pattern  : "^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$",
            type     : "string"
        },
        rfc         : {
            maxLength: 250,
            minLength: 0,
            pattern  : "^([A-ZÑ&]{3,4})?(?:-?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01]))?(?:-?)?([A-Z\\d]{2})([A\\d])$",
            type     : "string"
        },
        telefono    : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        direccion   : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        colonia     : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        codigoPostal: {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        unidad      : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        ramo        : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        }
    },



    LoginDTO: {
        required: [
            "password",
            "username"
        ],
        username: {
            type: "string"
        },
        password: {
            type: "string"
        }
    },

    ModuloDTO: {
        idModulo   : {
            type  : "integer",
            format: "int32"
        },
        nombre     : {
            type    : "string",
            nullable: true
        },
        descripcion: {
            type    : "string",
            nullable: true
        },
        icono      : {
            type    : "string",
            nullable: true
        },
        catOpciones   : {
            type    : "array",
            items   : {
                $ref: "#/components/schemas/OpcionDTO"
            },
            nullable: true
        }
    },

    OpcionDTO: {
        idOpcion   : {
            type  : "integer",
            format: "int32"
        },
        idModulo   : {
            type  : "integer",
            format: "int32"
        },
        nombre     : {
            type    : "string",
            nullable: true
        },
        descripcion: {
            type    : "string",
            nullable: true
        },
        url        : {
            type    : "string",
            nullable: true
        },
        icono      : {
            type    : "string",
            nullable: true
        },
        activo     : {
            type: "boolean"
        }
    },

    TipoContribuyenteDTO: {
        idTipoContribuyente: {
            type  : "integer",
            format: "int32"
        },
        nombre     : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
    },

    EstatusSatDTO: {
        idEstatusSat: {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        nombre: {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
    },

    TiposTramitesDTO: {
        idTramite: {
            type  : "integer",
            format: "int32"
        },
        nombre         : {
            type    : "string",
            nullable: true
        },
        urlDocumento     : {
            type    : "string",
            nullable: true
        },
        homoclave             : {
            type  : "integer",
            format: "int32"
        }
    },

    PermisoSistemaRolDTO: {
        idPermisoSistema: {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        rol             : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        }
    },



    SectorDTO: {
        idSector   : {
            type  : "integer",
            format: "int32"
        },
        nombre     : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        },
        descripcion: {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            nullable : true
        }
    },

    SistemaAgregarDTO: {
        required   : [
            "activo",
            "descripcion",
            "icono",
            "nombre",
            "publico",
            "url"
        ],
        nombre     : {
            type: "string"
        },
        descripcion: {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        icono      : {
            maxLength: 250,
            minLength: 0,
            type     : "string"
        },
        url        : {
            maxLength: 250,
            minLength: 0,
            type     : "string",
            format   : "uri"
        },
        publico    : {
            type: "boolean"
        },
        activo     : {
            type: "boolean"
        }
    },



    TokenDTO: {
        vigencia: String,
        token  : String
    },

    UsuarioDto: {
        required         : [
            "correoElectronico",
            "password"
        ],
        curp             : {
            maxLength: 250,
            minLength: 0,
            pattern  : "^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$",
            type     : "string",
            nullable : true
        },
        rfc              : {
            maxLength: 250,
            minLength: 0,
            pattern  : "^([A-ZÑ&]{3,4})?(?:-?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01]))?(?:-?)?([A-Z\\d]{2})([A\\d])$",
            type     : "string",
            nullable : true
        },
        correoElectronico: {
            maxLength: 250,
            minLength: 0,
            pattern  : "^[^@]+@[^@]+\\.[a-zA-Z]{2,}$",
            type     : "string"
        },
        password         : {
            type: "string"
        }
    },

    UsuarioModificarPasswordDTO: {
        required        : [
            "passwordAnterior",
            "passwordNuevo"
        ],
        passwordAnterior: {
            type: "string"
        },
        passwordNuevo   : {
            type: "string"
        }
    },

    UsuarioNuevoCorreoElectronicoDTO: {
        required              : [
            "codigoVerificacion",
            "nuevoCorreoElectronico"
        ],
        codigoVerificacion    : {
            type  : "integer",
            format: "int32"
        },
        nuevoCorreoElectronico: {
            pattern: "^[^@]+@[^@]+\\.[a-zA-Z]{2,}$",
            type   : "string"
        }
    },

    UsuarioNuevoPasswordDTO: {
        required          : [
            "codigoVerificacion",
            "nuevoPassword"
        ],
        codigoVerificacion: {
            type  : "integer",
            format: "int32"
        },
        nuevoPassword     : {
            type: "string"
        }
    },

    UsuarioObtenerDTO: {
        idUsuario        : {
            type  : "integer",
            format: "int32"
        },
        nombreCompleto   : {
            type    : "string",
            nullable: true
        },
        rfc              : {
            type    : "string",
            nullable: true
        },
        curp             : {
            type    : "string",
            nullable: true
        },
        correoElectronico: {
            type    : "string",
            nullable: true
        },
        idRol            : {
            type  : "integer",
            format: "int32"
        }
    },

    UsuarioPaginadoDTO: {
        filtro      : {
            type    : "string",
            nullable: true
        },
        pagina      : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        numElementos: {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        columna     : {
            type  : "integer",
            format: "int32"
        },
        orden       : {
            type    : "string",
            nullable: true
        }
    },

    UsuarioPaginadoObtenerDTO: {
        paginaActual      : {
            type  : "integer",
            format: "int32"
        },
        registrosPorPagina: {
            type  : "integer",
            format: "int32"
        },
        totalPaginas      : {
            type  : "integer",
            format: "int32"
        },
        totalRegistros    : {
            type  : "integer",
            format: "int32"
        },
        registros         : {
            type    : "array",
            items   : {
                $ref: "#/components/schemas/UsuarioObtenerDTO"
            },
            nullable: true
        }
    },

    UsuarioRolDTO: {
        idUsuario: {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        },
        idRol    : {
            pattern: "^[1-9]+[0-9]*$",
            type   : "integer",
            format : "int32"
        }
    }
}