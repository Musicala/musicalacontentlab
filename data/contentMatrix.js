export const WEEKLY_CONTENT_FOCUS = [
  {
    weekday: 1,
    name: "Lunes · Musicala clara",
    focus: "Qué hacemos en Musicala",
    servicePool: ["Qué hacemos en Musicala", "Modalidades: sede, hogar y virtual", "Sede Musicala", "Musicalitos"]
  },
  {
    weekday: 2,
    name: "Martes · Música en acción",
    focus: "Música",
    servicePool: ["Piano", "Guitarra", "Violín", "Canto", "Batería"]
  },
  {
    weekday: 3,
    name: "Miércoles · Danza y cuerpo",
    focus: "Danza",
    servicePool: ["Baile latino", "Danza urbana", "Ballet"]
  },
  {
    weekday: 4,
    name: "Jueves · Artes plásticas",
    focus: "Artes plásticas",
    servicePool: ["Dibujo", "Pintura", "Escultura"]
  },
  {
    weekday: 5,
    name: "Viernes · Diferenciales Musicala",
    focus: "Herramientas y recursos",
    servicePool: ["Metodología CREA", "Herramientas y recursos", "Profesores Musicala", "Servicios Musicala"]
  },
  {
    weekday: 6,
    name: "Sábado · Talento real",
    focus: "Talento Musicala",
    servicePool: ["Estudiantes Musicala", "Profesores Musicala", "Eventos y muestras", "Historias reales de clase"]
  },
  {
    weekday: 0,
    name: "Domingo · Reciclaje y planeación",
    focus: "Reutilización",
    servicePool: ["Reutilización", "Banco de material", "Calendario editorial", "Prueba social"]
  }
];

export const DAILY_CONTENT_SLOTS = [
  {
    id: "descubrimiento",
    objective: "descubrimiento",
    title: "Qué hacemos en Musicala",
    pillar: "Qué hacemos en Musicala",
    format: "Paquete de contenido",
    platforms: ["Instagram", "Facebook", "TikTok", "YouTube Shorts", "WhatsApp Estados"],
    priority: "high",
    packagePlan: ["1 reel/short", "2-3 historias", "1 publicación o carrusel cuando aplique"],
    description: "Explicar una parte concreta de Musicala: qué hacemos, para quién es, cómo se vive una clase o por qué el arte también es proceso."
  },
  {
    id: "servicio_arte",
    objective: "servicio_arte",
    title: "Servicio o arte del día",
    pillar: "Servicios Musicala",
    format: "Paquete de contenido",
    platforms: ["Instagram", "Facebook", "TikTok", "YouTube Shorts", "Google Business Profile"],
    priority: "high",
    packagePlan: ["1 reel educativo o demostrativo", "1 historia con pregunta", "1 post/foto para Google si hay buen material"],
    description: "Mostrar un área o servicio específico: qué se aprende, cómo se ve una clase, para qué sirve y quién podría tomarla."
  },
  {
    id: "talento",
    objective: "talento",
    title: "Talento en acción",
    pillar: "Profesores Musicala",
    format: "Reel",
    platforms: ["Instagram", "TikTok", "YouTube Shorts", "Facebook"],
    priority: "high",
    packagePlan: ["1 clip corto", "1 historia etiquetable", "1 versión sin texto para reutilizar"],
    description: "Un profe o estudiante mostrando algo real: tocar, cantar, bailar, dibujar, explicar, practicar o avanzar."
  },
  {
    id: "confianza_proceso",
    objective: "confianza_proceso",
    title: "Proceso real de aprendizaje",
    pillar: "Historias reales de clase",
    format: "Historia",
    platforms: ["Instagram", "Facebook", "WhatsApp Estados"],
    priority: "medium",
    packagePlan: ["3 historias del proceso", "1 foto documental", "1 nota para futuro reel"],
    description: "Mostrar ensayo, error, repetición, preparación, correcciones, materiales y acompañamiento. O sea: el arte real, no la fantasía editada por duendes."
  },
  {
    id: "diferencial",
    objective: "diferencial",
    title: "Herramienta o diferencial Musicala",
    pillar: "Herramientas y recursos",
    format: "Carrusel",
    platforms: ["Instagram", "Facebook", "LinkedIn", "Google Business Profile"],
    priority: "medium",
    packagePlan: ["1 explicación corta", "1 historia mostrando el recurso", "1 carrusel o post cuando se pueda"],
    description: "Mostrar algo que hace diferente a Musicala: metodología CREA, materiales, rutas, juegos, recursos, espacios, acompañamiento o forma de enseñar."
  },
  {
    id: "conversion_suave",
    objective: "conversion_suave",
    title: "Invitación suave a preguntar",
    pillar: "Servicios Musicala",
    format: "Historia",
    platforms: ["Instagram", "Facebook", "WhatsApp Estados"],
    priority: "medium",
    packagePlan: ["1 historia con CTA", "1 sticker/pregunta", "1 mensaje claro de servicio"],
    description: "Cerrar el día con una invitación simple: escribir por información, reservar clase, preguntar por horarios o conocer la sede. Sin sonar a perifoneo de camioneta."
  }
];

export const SERVICE_ROTATION = [
  "Piano",
  "Guitarra",
  "Violín",
  "Canto",
  "Batería",
  "Dibujo",
  "Pintura",
  "Escultura",
  "Baile latino",
  "Danza urbana",
  "Ballet",
  "Teatro",
  "Musicalitos",
  "Adultos aprendiendo arte",
  "Niños y procesos artísticos",
  "Modalidades: sede, hogar y virtual",
  "Sede Musicala",
  "Metodología CREA",
  "Herramientas y recursos"
];

export const PACKAGE_HINTS = {
  reel: "Graben vertical 9:16, 8 a 35 segundos si es simple, con un gancho claro en los primeros segundos.",
  stories: "Suban 2 o 3 historias del mismo tema: contexto, momento real y llamada a interactuar.",
  post: "Si el tema explica un servicio o diferencial, conviértanlo luego en carrusel o publicación fija.",
  google: "Si hay buena foto clara de sede, clase o servicio, guárdenla también para Google Business Profile."
};
