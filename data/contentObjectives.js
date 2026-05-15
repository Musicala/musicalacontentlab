export const CONTENT_OBJECTIVES = [
  {
    id: "atraccion",
    name: "Atracción",
    description: "Contenido para que personas nuevas descubran Musicala."
  },
  {
    id: "confianza",
    name: "Confianza",
    description: "Contenido para mostrar procesos reales, calidad humana y credibilidad."
  },
  {
    id: "educacion",
    name: "Educación",
    description: "Contenido que enseña algo pequeño y útil."
  },
  {
    id: "vida_musicala",
    name: "Vida Musicala",
    description: "Contenido que muestra el día a día de la escuela."
  },
  {
    id: "autoridad",
    name: "Autoridad",
    description: "Contenido que posiciona a Musicala como escuela seria y con metodología."
  },
  {
    id: "comunidad",
    name: "Comunidad",
    description: "Contenido para fortalecer conexión con estudiantes, familias y seguidores."
  },
  {
    id: "reutilizacion",
    name: "Reutilización",
    description: "Contenido creado a partir de material ya grabado."
  }
];

export const OBJECTIVE_LABELS = Object.fromEntries(
  CONTENT_OBJECTIVES.map((item) => [item.id, item.name])
);
