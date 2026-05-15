# Musicala Content Lab

App web MVP para que Alek y Cata organicen la creación diaria de contenido de Musicala.

## Qué incluye

- Login con Google Auth.
- Acceso solo para:
  - alekcaballeromusic@gmail.com
  - catalina.medina.leal@gmail.com
- Checklist diario de contenido.
- Generador automático de tareas según día de la semana.
- Banco de ideas base según Musicala.
- Calendario editorial de 14 días.
- Historial creativo.
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

## Instalación rápida

1. Crear proyecto en Firebase.
2. Activar Authentication > Google.
3. Activar Cloud Firestore.
4. Copiar la configuración web de Firebase.
5. Pegarla en:

```js
firebase/firebase.config.js
```

Reemplazar:

```js
apiKey: "PEGAR_API_KEY",
authDomain: "PEGAR_AUTH_DOMAIN",
projectId: "PEGAR_PROJECT_ID",
storageBucket: "PEGAR_STORAGE_BUCKET",
messagingSenderId: "PEGAR_MESSAGING_SENDER_ID",
appId: "PEGAR_APP_ID"
```

6. Publicar las reglas de Firestore desde consola o Firebase CLI.

## Reglas de Firestore

El archivo `firestore.rules` ya permite leer y escribir únicamente a los dos correos autorizados.

## Probar localmente

La app usa módulos ES y Firebase CDN, así que deben abrirla con servidor local, no doble clic.

Opciones:

```bash
npx serve .
```

o con VS Code:

```bash
Live Server
```

## Deploy en GitHub Pages

Se puede subir todo el contenido de esta carpeta a un repositorio y activar GitHub Pages.

Importante:
- El `firebase.config.js` debe tener los datos reales.
- En Firebase Authentication, agregar el dominio de GitHub Pages a dominios autorizados.

## Nota sobre el service worker

Si actualizan archivos y GitHub Pages parece seguir mostrando versión vieja, cambien el nombre del cache en `sw.js`:

```js
const CACHE_NAME = "musicala-content-lab-v2";
```

Porque los navegadores aman guardar cosas viejas como si fueran recuerdos de colegio.
