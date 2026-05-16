export const CONTENT_OBJECTIVES = [
  {
    id: "descubrimiento",
    name: "Descubrimiento",
    description: "Contenido para que alguien entienda rápido qué es Musicala y por qué existe."
  },
  {
    id: "servicio_arte",
    name: "Servicio / arte",
    description: "Contenido para mostrar una clase, área artística, instrumento, taller o modalidad concreta."
  },
  {
    id: "talento",
    name: "Talento",
    description: "Contenido para mostrar profes, estudiantes, avances, interpretaciones, muestras y momentos vivos."
  },
  {
    id: "confianza_proceso",
    name: "Confianza / proceso",
    description: "Contenido para mostrar cómo se aprende: ensayo, error, acompañamiento, práctica y avance real."
  },
  {
    id: "diferencial",
    name: "Diferencial",
    description: "Contenido para explicar herramientas, metodología CREA, recursos, espacios y formas de enseñar."
  },
  {
    id: "conversion_suave",
    name: "Conversión suave",
    description: "Contenido para invitar a escribir, reservar clase, preguntar por un servicio o visitar la sede sin sonar como vendedor con megáfono."
  },
  {
    id: "reutilizacion",
    name: "Reutilización",
    description: "Contenido creado a partir de material ya grabado para convertir una pieza madre en varios formatos."
  }
];

export const OBJECTIVE_LABELS = Object.fromEntries(
  CONTENT_OBJECTIVES.map((item) => [item.id, item.name])
);
