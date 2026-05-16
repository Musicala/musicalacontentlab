# Musicala Content Lab

App web para que Alek y Cata organicen la creación diaria de contenido de Musicala sin depender de memoria, corazonadas ni el clásico “ahorita lo hacemos”.

## Qué cambió en esta versión

Esta versión deja de trabajar con un día distinto para cada objetivo. Antes el sistema funcionaba como:

- lunes atracción,
- martes confianza,
- miércoles educación,
- jueves vida Musicala,
- etc.

Eso sonaba bonito, pero en la práctica obligaba a pensar diferente todos los días. Gran invento humano: complicarse el martes porque el lunes ya se sintió profundo.

Ahora la app funciona con una **matriz diaria fija**:

1. Qué hacemos en Musicala.
2. Servicio o arte del día.
3. Talento en acción.
4. Proceso real de aprendizaje.
5. Herramienta o diferencial Musicala.
6. Invitación suave a preguntar.
7. Plano anti-selfie del día.

Cada tarea está pensada como **pieza madre**, no como una publicación aislada. Es decir, una misma captura puede convertirse en:

- reel o short,
- historias,
- carrusel o publicación,
- foto para Google Business Profile,
- material reutilizable para otro día.

## Cómo rota la semana

Los objetivos se mantienen todos los días, pero el enfoque rota para que semanalmente haya contenido de todo:

- Lunes: Musicala clara, qué hacemos, sede, modalidades.
- Martes: música, piano, guitarra, violín, canto, batería.
- Miércoles: danza, baile latino, urbano, ballet.
- Jueves: artes plásticas, dibujo, pintura, escultura.
- Viernes: diferenciales, metodología CREA, herramientas y recursos.
- Sábado: talento real, profes, estudiantes, muestras y clases vivas.
- Domingo: reciclaje creativo, banco de material y planeación.

## Qué incluye

- Login con Google Auth.
- Acceso solo para:
  - alekcaballeromusic@gmail.com
  - catalina.medina.leal@gmail.com
- Checklist diario basado en matriz fija.
- Rotación semanal de artes, servicios y diferenciales.
- Registro rápido de material ya grabado.
- Categorías, objetivos, formatos y plataformas editables desde la vista Ajustes.
- Metas diarias configurables.
- Banco de ideas base según Musicala.
- Calendario editorial de 14 días.
- Historial creativo.
- Evaluación simple de resultado:
  - Funcionó,
  - No funcionó,
  - En prueba.
- Estados de contenido:
  - Pendiente
  - Grabado
  - Editado
  - Programado
  - Publicado
  - Hecho
  - Omitido
  - Reprogramado
- PWA básica con manifest y service worker.

## Enfoque de uso diario

La vista Hoy está pensada para abrirla y ver rápido:

- qué falta grabar,
- qué pieza madre falta capturar,
- qué servicio o arte toca mover,
- qué ya quedó registrado,
- qué puede convertirse en reel, historia, carrusel o publicación.

Si grabaron algo no planeado, no hace falta convertirlo primero en estrategia, campaña, funnel, ni ritual de productividad. Solo se registra en el formulario rápido como contenido grabado y luego se decide si se publica, edita, programa o recicla.

## Archivos clave

- `data/contentMatrix.js`: define la matriz diaria, la rotación semanal y los entregables sugeridos.
- `data/contentObjectives.js`: define los objetivos de contenido.
- `data/contentPillars.js`: define categorías/pilares.
- `data/defaultContentIdeas.js`: banco base de ideas Musicala.
- `utils/rotationEngine.js`: genera tareas diarias usando la matriz y la rotación.

## Instalación rápida

1. Crear proyecto en Firebase.
2. Activar Authentication > Google.
3. Activar Cloud Firestore.
4. Copiar la configuración web de Firebase.
5. Pegarla en:

```js
firebase/firebase.config.js
```

6. Publicar las reglas de Firestore desde consola o Firebase CLI.

## Reglas de Firestore

El archivo `firestore.rules` permite leer y escribir únicamente a los dos correos autorizados.

Colecciones usadas:

- `contentTasks`
- `contentIdeas`
- `contentSettings`

## Probar localmente

La app usa módulos ES y Firebase CDN, así que deben abrirla con servidor local, no doble clic.

Opciones:

```bash
npx serve .
```

O con VS Code:

```bash
Live Server
```

## Deploy en GitHub Pages

Se puede subir todo el contenido de esta carpeta a un repositorio y activar GitHub Pages.

Importante:

- El `firebase.config.js` debe tener los datos reales.
- En Firebase Authentication, agregar el dominio de GitHub Pages a dominios autorizados.

## Nota sobre ajustes guardados

Esta versión usa `strategyVersion: weekly-matrix-v1`. Si Firebase tenía ajustes viejos guardados, la app prioriza la nueva matriz base para que no siga cargando el modelo anterior.

## Nota sobre caché / PWA

Esta versión mantiene caché PWA. Si el navegador insiste en mostrar una versión vieja, desinstalen la PWA o limpien caché del sitio. Los navegadores guardan versiones antiguas con la intensidad emocional de un ex tóxico.
