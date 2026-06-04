import { IBenefit } from "./types";

export const benefitsData: IBenefit[] = [
    {
        id: 1,
        institution: "IPS",
        title: "Pensión Garantizada Universal (PGU)",
        description: "Beneficio del Estado que reemplaza a los beneficios de vejez del Pilar Solidario.",
        tag: "Pensiones",
        url: "https://www.chileatiende.gob.cl/fichas/102077-pension-garantizada-universal-pgu",
        reqs: { minAge: 65 },
        reasons: { minAge: "Aún no cumples con la edad mínima de 65 años." },
        successes: { minAge: "Cumples con la edad mínima (Adulto Mayor)." }
    },
    {
        id: 2,
        institution: "IPS",
        title: "Aporte Familiar Permanente",
        description: "Bono Marzo para familias de menores ingresos que cumplan los requisitos.",
        tag: "Familias",
        url: "https://www.aportefamiliar.cl/",
        reqs: { maxIncome: 60 },
        reasons: { maxIncome: "Superas el tramo socioeconómico del 60% más vulnerable." },
        successes: { maxIncome: "Perteneces al tramo socioeconómico requerido (Dentro del 60%)." }
    },
    {
        id: 3,
        institution: "SENCE",
        title: "Bono al Trabajo de la Mujer",
        description: "Beneficio en dinero para mejorar los ingresos de mujeres trabajadoras.",
        tag: "Mujer",
        url: "https://sence.gob.cl/personas/btm",
        reqs: { gender: "F" },
        reasons: { gender: "Beneficio exclusivo para mujeres." },
        successes: { gender: "Cumples con el requisito de ser mujer." }
    },
    {
        id: 4,
        institution: "MINVU",
        title: "Subsidio de Arriendo",
        description: "Aporte temporal que entrega el Estado a familias para el pago mensual por el arriendo.",
        tag: "Vivienda",
        url: "https://www.minvu.gob.cl/beneficio/vivienda/subsidio-de-arriendo/",
        reqs: { maxIncome: 70 },
        reasons: { maxIncome: "No cumples el requisito de Registro Social de Hogares hasta 70%." },
        successes: { maxIncome: "Tu clasificación socioeconómica es compatible (Dentro del 70%)." }
    },
    {
        id: 5,
        institution: "MINEDUC",
        title: "Gratuidad Universitaria",
        description: "Permite estudiar en educación superior sin pagar matrícula ni arancel.",
        tag: "Estudiantes",
        url: "https://portal.beneficiosestudiantiles.cl/gratuidad",
        reqs: { isStudent: true, maxIncome: 60 },
        reasons: { 
            isStudent: "No registras calidad de estudiante o matrícula activa.",
            maxIncome: "Superas el tramo socioeconómico requerido (60%)." 
        },
        successes: {
            isStudent: "Posees matrícula de estudiante activo.",
            maxIncome: "Calificas dentro del 60% de vulnerabilidad."
        }
    },
    {
        id: 6,
        institution: "JUNAEB",
        title: "Beca de Alimentación Escolar (BAES)",
        description: "Tarjeta Junaeb para compras de alimentación en base a convenio universitario.",
        tag: "Estudiantes",
        url: "https://www.junaeb.cl/beca-baes",
        reqs: { isStudent: true },
        reasons: { isStudent: "Debes ser estudiante de Educación Superior matriculado." },
        successes: { isStudent: "Registras calidad de estudiante vigente." }
    },
    {
        id: 7,
        institution: "MINEDUC",
        title: "Bono Logro Escolar",
        description: "Beneficio para estudiantes menores de 24 años, entre 5to Básico y 4to Medio que pertenezcan al 30% más vulnerable.",
        tag: "Estudiantes",
        url: "https://www.chileatiende.gob.cl/fichas/15694-bono-logro-escolar",
        reqs: { isStudent: true, maxIncome: 30, maxAge: 24 },
        reasons: {
            isStudent: "No estás cursando Educación Básica/Media regular.",
            maxIncome: "Tu grupo familiar no pertenece al 30% más vulnerable.",
            maxAge: "Superas la edad máxima de 24 años para este beneficio."
        },
        successes: {
            isStudent: "Te encuentras registrado en el sistema escolar.",
            maxIncome: "Estás dentro del 30% de mayor vulnerabilidad.",
            maxAge: "Cumples con el rango etario (menor de 24 años)."
        }
    },
    {
        id: 8,
        institution: "IPS",
        title: "Asignación Familiar (Trabajador Hombre)",
        description: "Subsidio estatal para padres cotizantes con cargas familiares legalmente acreditadas.",
        tag: "Hombres",
        url: "https://www.chileatiende.gob.cl/",
        reqs: { gender: "M" },
        reasons: { gender: "Beneficio catalogado y filtrado solo para registro de padres hombres u otros asignatarios masculinos." },
        successes: { gender: "Cumples con el requisito de género registrado." }
    },
    {
        id: 9,
        institution: "SENCE",
        title: "Subsidio al Empleo Joven (SEJ)",
        description: "Aporte monetario del Estado para jóvenes trabajadores, dependientes o independientes.",
        tag: "Laboral",
        url: "https://sence.gob.cl/personas/sej",
        reqs: { minAge: 18, maxAge: 24, hasContract: true, maxIncome: 40 },
        reasons: {
            minAge: "Debes tener al menos 18 años de edad.",
            maxAge: "Superas la edad máxima de 24 años para este beneficio.",
            hasContract: "No registras contratos laborales ni cotizaciones vigentes.",
            maxIncome: "Superas el tramo socioeconómico requerido (40% más vulnerable)."
        },
        successes: {
            minAge: "Cumples con la mayoría de edad.",
            maxAge: "Tienes menos de 25 años.",
            hasContract: "Cuentas con un contrato de trabajo formal registrado.",
            maxIncome: "Calificas dentro del tramo socioeconómico del 40%."
        }
    },
    {
        id: 10,
        institution: "MINEDUC",
        title: "Ingreso Mínimo Garantizado (IMG)",
        description: "Subsidio para trabajadores dependientes con jornada ordinaria (mayor a 30 horas).",
        tag: "Laboral",
        url: "https://www.ingresominimo.cl/",
        reqs: { hasContract: true, minMonthsWorked: 3 },
        reasons: {
            hasContract: "Sistema no registra modalidad de trabajador dependiente.",
            minMonthsWorked: "Requieres al menos 3 meses de antigüedad o cotizaciones continuas."
        },
        successes: {
            hasContract: "Cotizas como empleado dependiente.",
            minMonthsWorked: "Tu vínculo laboral excede la antigüedad mínima exigida."
        }
    },
    {
        id: 11,
        institution: "MINEDUC",
        title: "Beca Presidente de la República",
        description: "Apoyo económico para estudiantes de buen rendimiento académico y vulnerabilidad socioeconómica.",
        tag: "Estudiantes",
        url: "https://www.junaeb.cl/beca-presidente-de-la-republica",
        reqs: { isStudent: true, maxIncome: 40 },
        reasons: {
            isStudent: "No te encuentras registrado como estudiante.",
            maxIncome: "Superas el 40% de vulnerabilidad del RSH."
        },
        successes: {
            isStudent: "Eres estudiante regular.",
            maxIncome: "Cumples con el nivel socioeconómico requerido."
        }
    },
    {
        id: 12,
        institution: "MINEDUC",
        title: "Beca Indígena",
        description: "Ayuda para estudiantes con ascendencia indígena acreditada por CONADI.",
        tag: "Estudiantes",
        url: "https://www.junaeb.cl/beca-indigena",
        reqs: { isStudent: true, maxIncome: 60 },
        manualReqs: ["Certificado de acreditación de calidad indígena emitido por CONADI."],
        reasons: {
            isStudent: "Debes ser estudiante para postular.",
            maxIncome: "Superas el 60% en el Registro Social de Hogares."
        },
        successes: {
            isStudent: "Estudiante regular.",
            maxIncome: "Cumples el requisito socioeconómico."
        }
    },
    {
        id: 13,
        institution: "MINEDUC",
        title: "Beca Nuevo Milenio",
        description: "Financia parte del arancel para estudiantes de carreras técnico-profesionales.",
        tag: "Estudiantes",
        url: "https://portal.beneficiosestudiantiles.cl/beca-nuevo-milenio",
        reqs: { isStudent: true, maxIncome: 70 },
        reasons: {
            isStudent: "Debes tener matrícula en educación superior.",
            maxIncome: "Tu nivel socioeconómico supera el 70%."
        },
        successes: {
            isStudent: "Registras matrícula estudiantil.",
            maxIncome: "Tramo socioeconómico adecuado."
        }
    },
    {
        id: 14,
        institution: "MINEDUC",
        title: "Beca Bicentenario",
        description: "Financia el arancel de referencia de carreras en universidades tradicionales (CRUCH).",
        tag: "Estudiantes",
        url: "https://portal.beneficiosestudiantiles.cl/beca-bicentenario",
        reqs: { isStudent: true, maxIncome: 70 },
        reasons: {
            isStudent: "Requisito de estudiante no cumplido.",
            maxIncome: "Superas el 70% de vulnerabilidad."
        },
        successes: {
            isStudent: "Calidad de estudiante activa.",
            maxIncome: "RSH dentro del rango."
        }
    },
    {
        id: 15,
        institution: "MINEDUC",
        title: "Beca Juan Gómez Millas",
        description: "Ayuda para arancel de carreras en instituciones de educación superior acreditadas.",
        tag: "Estudiantes",
        url: "https://portal.beneficiosestudiantiles.cl/beca-juan-gomez-millas",
        reqs: { isStudent: true, maxIncome: 70 },
        reasons: {
            isStudent: "No estás matriculado.",
            maxIncome: "Perteneces a un tramo superior al 70%."
        },
        successes: {
            isStudent: "Estudiante acreditado.",
            maxIncome: "Nivel socioeconómico adecuado."
        }
    },
    {
        id: 16,
        institution: "MINEDUC",
        title: "Fondo Solidario de Crédito Universitario (FSCU)",
        description: "Crédito para financiar parte del arancel de referencia para estudiantes universitarios.",
        tag: "Estudiantes",
        url: "https://portal.beneficiosestudiantiles.cl/fondo-solidario-de-credito-universitario",
        reqs: { isStudent: true, maxIncome: 80 },
        reasons: {
            isStudent: "Solo para estudiantes de Educación Superior.",
            maxIncome: "Superas el 80% más vulnerable."
        },
        successes: {
            isStudent: "Registras matrícula.",
            maxIncome: "Dentro del 80% más vulnerable."
        }
    },
    {
        id: 17,
        institution: "MINEDUC",
        title: "Crédito con Aval del Estado (CAE)",
        description: "Alternativa de financiamiento para estudiantes de educación superior con respaldo del Estado.",
        tag: "Estudiantes",
        url: "https://portal.beneficiosestudiantiles.cl/credito-con-aval-del-estado",
        reqs: { isStudent: true },
        reasons: {
            isStudent: "Debes estar aceptado en una institución de educación superior."
        },
        successes: {
            isStudent: "Estás matriculado o en vías de estarlo."
        }
    },
    {
        id: 18,
        institution: "MINEDUC",
        title: "Bono de Graduación de Enseñanza Media",
        description: "Premio al esfuerzo para personas de 24 años o más que obtengan su licencia de enseñanza media.",
        tag: "Educación",
        url: "https://www.chileatiende.gob.cl/fichas/39294-bono-de-graduacion-de-ensenanza-media",
        reqs: { minAge: 24, maxIncome: 30 },
        reasons: {
            minAge: "Debes tener 24 años o más.",
            maxIncome: "Debes pertenecer al subsistema Seguridades y Oportunidades."
        },
        successes: {
            minAge: "Cumples la edad mínima de 24 años.",
            maxIncome: "Estás dentro del perfil socioeconómico requerido."
        }
    },
    {
        id: 19,
        institution: "MINVU",
        title: "Subsidio Habitacional DS1 (Sectores Medios)",
        description: "Apoyo estatal para comprar o construir una vivienda (hasta 2.200 UF).",
        tag: "Vivienda",
        url: "https://www.minvu.gob.cl/beneficio/vivienda/comprar-una-vivienda/",
        reqs: { minAge: 18, maxIncome: 90 },
        reasons: {
            minAge: "Debes ser mayor de edad (18 años).",
            maxIncome: "Superas el 90% en el Registro Social de Hogares."
        },
        successes: {
            minAge: "Eres mayor de edad.",
            maxIncome: "Calificas socioeconómicamente."
        }
    },
    {
        id: 20,
        institution: "MINVU",
        title: "Subsidio DS49 (Elección de Vivienda)",
        description: "Permite comprar vivienda sin crédito hipotecario para familias de mayor vulnerabilidad.",
        tag: "Vivienda",
        url: "https://www.minvu.gob.cl/beneficio/vivienda/fondo-solidario-ds49/",
        reqs: { minAge: 18, maxIncome: 40 },
        manualReqs: ["Acreditar libreta de ahorro para la vivienda con el saldo mínimo exigido."],
        reasons: {
            minAge: "Debes ser mayor de edad.",
            maxIncome: "Este subsidio es para el 40% más vulnerable."
        },
        successes: {
            minAge: "Eres mayor de edad.",
            maxIncome: "Cumples con la vulnerabilidad exigida (40%)."
        }
    },
    {
        id: 21,
        institution: "IPS",
        title: "Subsidio Único Familiar (SUF)",
        description: "Aporte para personas vulnerables que no pueden proveer la mantención de sus cargas familiares.",
        tag: "Familias",
        url: "https://www.chileatiende.gob.cl/fichas/237-subsidio-familiar-suf",
        reqs: { maxIncome: 60 },
        reasons: {
            maxIncome: "Superas el 60% más vulnerable del RSH."
        },
        successes: {
            maxIncome: "Estás dentro del 60% más vulnerable."
        }
    },
    {
        id: 22,
        institution: "IPS",
        title: "Bono de Protección (Dueña de Casa)",
        description: "Aporte mensual por 24 meses para familias del Subsistema Seguridades y Oportunidades.",
        tag: "Familias",
        url: "https://www.chileatiende.gob.cl/fichas/13359-bono-de-proteccion",
        reqs: { maxIncome: 30 },
        reasons: {
            maxIncome: "No cumples el requisito socioeconómico de extrema vulnerabilidad."
        },
        successes: {
            maxIncome: "Calificas para el Subsistema Seguridades y Oportunidades."
        }
    },
    {
        id: 23,
        institution: "IPS",
        title: "Bono por Hijo",
        description: "Aporte estatal que incrementa la pensión de la mujer por cada hijo nacido vivo o adoptado.",
        tag: "Mujer",
        url: "https://www.chileatiende.gob.cl/fichas/10839-bono-por-hijo",
        reqs: { gender: "F", minAge: 65 },
        manualReqs: ["Acreditar maternidad mediante certificado de hijo nacido vivo o adopción."],
        reasons: {
            gender: "Beneficio exclusivo para mujeres.",
            minAge: "Aún no tienes los 65 años exigidos."
        },
        successes: {
            gender: "Eres mujer.",
            minAge: "Tienes 65 años o más."
        }
    },
    {
        id: 24,
        institution: "IPS",
        title: "Subsidio a la Cotización",
        description: "Aporte mensual a la cuenta de AFP para jóvenes entre 18 y 35 años.",
        tag: "Laboral",
        url: "https://www.chileatiende.gob.cl/fichas/12530-subsidio-a-la-cotizacion-de-trabajadores-jovenes",
        reqs: { minAge: 18, maxAge: 35, hasContract: true },
        reasons: {
            minAge: "Debes tener al menos 18 años.",
            maxAge: "Superas la edad máxima de 35 años.",
            hasContract: "Requiere cotizaciones de un contrato formal."
        },
        successes: {
            minAge: "Eres mayor de 18 años.",
            maxAge: "Estás dentro del rango hasta 35 años.",
            hasContract: "Registras cotizaciones laborales."
        }
    },
    {
        id: 25,
        institution: "IPS",
        title: "Bono Bodas de Oro",
        description: "Beneficio para parejas que demuestren 50 años de matrimonio y no estén separados.",
        tag: "Pensiones",
        url: "https://www.chileatiende.gob.cl/fichas/9986-bono-bodas-de-oro",
        reqs: { minAge: 70 },
        manualReqs: ["Presentar certificado de matrimonio que acredite 50 años de unión legal."],
        reasons: {
            minAge: "No cumples con la edad estimada para tener 50 años de matrimonio."
        },
        successes: {
            minAge: "Tu perfil de edad sugiere posibilidad de aplicar."
        }
    },
    {
        id: 26,
        institution: "IPS",
        title: "Bono de Invierno",
        description: "Aporte económico entregado una sola vez en el año para pensionados (mes de mayo).",
        tag: "Pensiones",
        url: "https://www.chileatiende.gob.cl/fichas/103239-bono-de-invierno",
        reqs: { minAge: 65 },
        reasons: {
            minAge: "Debes tener 65 años o más para este bono de pensionados."
        },
        successes: {
            minAge: "Tienes la edad mínima requerida (65+)."
        }
    },
    {
        id: 27,
        institution: "FOSIS",
        title: "Subsidio de Calefacción (Bono Leña)",
        description: "Apoyo económico para familias de la región de Aysén para gastos de calefacción.",
        tag: "Familias",
        url: "https://www.chileatiende.gob.cl/fichas/89569-subsidio-de-calefaccion-bono-lena",
        reqs: { maxIncome: 80 },
        reasons: {
            maxIncome: "Superas el 80% en el Registro Social de Hogares."
        },
        successes: {
            maxIncome: "Cumples la vulnerabilidad socioeconómica (80%)."
        }
    },
    {
        id: 28,
        institution: "SENCE",
        title: "IFE Laboral (Histórico)",
        description: "Incentivo para que los trabajadores se empleen formalmente.",
        tag: "Laboral",
        url: "https://www.subsidioalempleo.cl/",
        reqs: { hasContract: true },
        reasons: {
            hasContract: "Requiere nuevo contrato de trabajo formal."
        },
        successes: {
            hasContract: "Registras empleabilidad."
        }
    },
    {
        id: 29,
        institution: "IPS",
        title: "Pensión Solidaria de Invalidez (PBSI)",
        description: "Pensión para personas entre 18 y 64 años declaradas con invalidez.",
        tag: "Salud",
        url: "https://www.chileatiende.gob.cl/fichas/102078-pension-basica-solidaria-de-invalidez-pbsi",
        reqs: { minAge: 18, maxAge: 64, maxIncome: 80 },
        manualReqs: ["Resolución de invalidez emitida por las Comisiones Médicas (COMPIN)."],
        reasons: {
            minAge: "Debes tener al menos 18 años.",
            maxAge: "Mayores de 65 años aplican a la PGU.",
            maxIncome: "Superas el tramo socioeconómico del 80%."
        },
        successes: {
            minAge: "Tienes la edad mínima.",
            maxAge: "Eres menor de 65 años.",
            maxIncome: "Calificas socioeconómicamente."
        }
    },
    {
        id: 30,
        institution: "IPS",
        title: "Subsidio de Discapacidad",
        description: "Aporte mensual para menores de 18 años con discapacidad mental o física severa.",
        tag: "Salud",
        url: "https://www.chileatiende.gob.cl/fichas/235-subsidio-de-discapacidad",
        reqs: { maxAge: 17, maxIncome: 60 },
        manualReqs: ["Inscripción en el Registro Nacional de Discapacidad (COMPIN/SRCeI)."],
        reasons: {
            maxAge: "Exclusivo para menores de 18 años.",
            maxIncome: "El grupo familiar supera el 60% de vulnerabilidad."
        },
        successes: {
            maxAge: "Cumples el requisito de edad.",
            maxIncome: "El núcleo familiar pertenece al 60%."
        }
    }
];
