export const ROTATION_RULES = {
  dailyTaskLimit: 6,
  requiredVariety: {
    avoidSamePillarDays: 2,
    avoidSameFormatDays: 1
  },
  antiSelfiePrompts: [
    "Grabar manos tocando un instrumento.",
    "Grabar pies bailando o marcando ritmo.",
    "Grabar materiales de artes plásticas en uso.",
    "Grabar una puerta, pasillo o salón antes de clase.",
    "Grabar una explicación del profe desde atrás o lateral.",
    "Grabar un tablero, partitura o cuaderno.",
    "Grabar sonido ambiente con planos detalle.",
    "Grabar preparación de instrumentos o materiales.",
    "Grabar una mini entrevista sin convertirla en interrogatorio policial.",
    "Grabar voz en off con imágenes de apoyo."
  ],
  weeklyBalance: [
    "Qué hacemos en Musicala",
    "Sede Musicala",
    "Música",
    "Danza",
    "Teatro",
    "Artes plásticas",
    "Musicalitos",
    "Adultos aprendiendo arte",
    "Niños y procesos artísticos",
    "Herramientas y recursos",
    "Metodología CREA"
  ]
};

export const TASK_STATUSES = [
  "pending",
  "recorded",
  "edited",
  "scheduled",
  "published",
  "done",
  "skipped",
  "rescheduled"
];

export const STATUS_LABELS = {
  pending: "Pendiente",
  recorded: "Grabado",
  edited: "Editado",
  scheduled: "Programado",
  published: "Publicado",
  done: "Hecho",
  skipped: "Omitido",
  rescheduled: "Reprogramado"
};

export const PRIORITY_LABELS = {
  high: "Alta",
  medium: "Media",
  low: "Baja"
};
