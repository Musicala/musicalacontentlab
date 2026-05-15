export const DEFAULT_DAILY_TEMPLATES = [
  {
    weekday: 1,
    name: "Lunes de atracción",
    objective: "atraccion",
    theme: "Descubrimiento de Musicala",
    suggestedTasks: [
      {
        title: "Grabar un contenido corto para personas que aún no conocen Musicala",
        description: "Debe mostrar en pocos segundos qué se vive en la escuela: arte, proceso, alegría y acompañamiento humano.",
        format: "Reel",
        pillar: "Vida cotidiana Musicala",
        platforms: ["Instagram", "Facebook", "TikTok", "YouTube Shorts"],
        priority: "high"
      },
      {
        title: "Subir historias mostrando movimiento real del día",
        description: "Nada de solo selfie. Mostrar salones, instrumentos, materiales, estudiantes llegando o detalles del ambiente.",
        format: "Historia",
        pillar: "Espacios Musicala",
        platforms: ["Instagram", "Facebook", "WhatsApp Estados"],
        priority: "medium"
      },
      {
        title: "Guardar una idea nueva para contenido de atracción",
        description: "Una idea que ayude a que alguien diga: 'yo también quiero aprender eso'.",
        format: "Idea",
        pillar: "Mitos sobre aprender arte",
        platforms: ["Banco de ideas"],
        priority: "medium"
      }
    ]
  },
  {
    weekday: 2,
    name: "Martes de confianza",
    objective: "confianza",
    theme: "Procesos reales y calidad humana",
    suggestedTasks: [
      {
        title: "Mostrar cómo un profe acompaña un proceso real",
        description: "Puede ser una corrección, una explicación breve o un momento donde se vea paciencia y cercanía.",
        format: "Reel",
        pillar: "Profesores Musicala",
        platforms: ["Instagram", "Facebook", "TikTok", "YouTube Shorts"],
        priority: "high"
      },
      {
        title: "Grabar detrás de cámaras de una clase",
        description: "Mostrar preparación, materiales, instrumentos, movimiento o ambiente antes/durante/después.",
        format: "Historia",
        pillar: "Detrás de cámaras",
        platforms: ["Instagram", "Facebook"],
        priority: "medium"
      },
      {
        title: "Capturar un detalle que demuestre cuidado",
        description: "Un recurso didáctico, una partitura, un dibujo, una postura corregida, una frase del profe o un tablero.",
        format: "Foto documental",
        pillar: "Historias reales de clase",
        platforms: ["Instagram", "Google Business Profile"],
        priority: "medium"
      }
    ]
  },
  {
    weekday: 3,
    name: "Miércoles educativo",
    objective: "educacion",
    theme: "Tips pequeños que enseñan",
    suggestedTasks: [
      {
        title: "Crear un tip artístico de máximo 20 segundos",
        description: "Puede ser de música, danza, teatro o artes plásticas. Una sola idea clara, no una tesis doctoral con filtros.",
        format: "Tutorial corto",
        pillar: "Música",
        platforms: ["Instagram", "TikTok", "YouTube Shorts"],
        priority: "high"
      },
      {
        title: "Convertir el tip en carrusel o historia",
        description: "Reutilizar el mismo tema en otro formato para no depender de la inspiración divina.",
        format: "Carrusel",
        pillar: "Mitos sobre aprender arte",
        platforms: ["Instagram", "Facebook", "Pinterest"],
        priority: "medium"
      },
      {
        title: "Guardar el tema como reusable",
        description: "Marcar el contenido para futuras versiones: niños, adultos, principiantes o familias.",
        format: "Reciclaje",
        pillar: "Reutilización",
        platforms: ["Historial"],
        priority: "low"
      }
    ]
  },
  {
    weekday: 4,
    name: "Jueves de vida Musicala",
    objective: "vida_musicala",
    theme: "Escuela viva",
    suggestedTasks: [
      {
        title: "Grabar 5 planos del ambiente de Musicala",
        description: "Fachada, recepción, salón, instrumentos, clase, pasillo, materiales o algo que muestre que aquí pasan cosas.",
        format: "Historia",
        pillar: "Espacios Musicala",
        platforms: ["Instagram", "Facebook", "WhatsApp Estados"],
        priority: "high"
      },
      {
        title: "Crear un mini recap del día",
        description: "Un montaje corto con 3 a 5 clips del movimiento de la escuela.",
        format: "Reel",
        pillar: "Vida cotidiana Musicala",
        platforms: ["Instagram", "Facebook", "TikTok"],
        priority: "medium"
      },
      {
        title: "Tomar una foto documental para Google",
        description: "Foto clara, luminosa y real de la sede, una clase o un espacio activo.",
        format: "Post de Google Business Profile",
        pillar: "Espacios Musicala",
        platforms: ["Google Business Profile"],
        priority: "medium"
      }
    ]
  },
  {
    weekday: 5,
    name: "Viernes de autoridad",
    objective: "autoridad",
    theme: "Metodología y criterio",
    suggestedTasks: [
      {
        title: "Crear contenido sobre cómo Musicala acompaña el aprendizaje",
        description: "Hablar de proceso, rutas, edad, paciencia, disciplina artística o metodología CREA.",
        format: "Reel",
        pillar: "Metodología CREA",
        platforms: ["Instagram", "Facebook", "LinkedIn", "YouTube Shorts"],
        priority: "high"
      },
      {
        title: "Publicar una reflexión corta de Alek o Cata",
        description: "Una idea honesta sobre arte, educación, procesos, miedos o aprendizaje.",
        format: "Voz en off",
        pillar: "Autoridad humana",
        platforms: ["Instagram", "Facebook", "TikTok"],
        priority: "medium"
      },
      {
        title: "Programar o dejar lista una pieza del fin de semana",
        description: "El viernes no debería terminar con 'mañana miramos'. Esa frase ha destruido civilizaciones.",
        format: "Programación",
        pillar: "Planeación creativa",
        platforms: ["Calendario"],
        priority: "medium"
      }
    ]
  },
  {
    weekday: 6,
    name: "Sábado de captura",
    objective: "comunidad",
    theme: "Material real de clases",
    suggestedTasks: [
      {
        title: "Grabar clips naturales durante clases",
        description: "Planos cortos: manos, instrumentos, movimiento, materiales, tablero, pies bailando, espacios y detalles.",
        format: "Clip documental",
        pillar: "Historias reales de clase",
        platforms: ["Instagram", "TikTok", "YouTube Shorts"],
        priority: "high"
      },
      {
        title: "Subir historias del movimiento del sábado",
        description: "Mostrar actividad real sin convertir todo en comercial forzado.",
        format: "Historia",
        pillar: "Vida cotidiana Musicala",
        platforms: ["Instagram", "Facebook"],
        priority: "medium"
      },
      {
        title: "Clasificar material grabado para reutilizar",
        description: "Guardar notas: qué sirve para reel, qué sirve para historia, qué sirve para carrusel.",
        format: "Reciclaje",
        pillar: "Reutilización",
        platforms: ["Historial"],
        priority: "medium"
      }
    ]
  },
  {
    weekday: 0,
    name: "Domingo de reciclaje creativo",
    objective: "reutilizacion",
    theme: "Revisar, ordenar y preparar",
    suggestedTasks: [
      {
        title: "Revisar material grabado no publicado",
        description: "Elegir clips que puedan transformarse en reels, shorts, historias o posts.",
        format: "Recap semanal",
        pillar: "Reutilización",
        platforms: ["Instagram", "TikTok", "YouTube Shorts"],
        priority: "high"
      },
      {
        title: "Planear 3 contenidos de la semana",
        description: "Uno de atracción, uno de confianza y uno educativo.",
        format: "Planeación",
        pillar: "Calendario editorial",
        platforms: ["Calendario"],
        priority: "high"
      },
      {
        title: "Marcar pilares olvidados",
        description: "Revisar si danza, teatro, artes plásticas o Musicalitos quedaron abandonados esta semana.",
        format: "Revisión creativa",
        pillar: "Balance de pilares",
        platforms: ["Historial"],
        priority: "medium"
      }
    ]
  }
];
