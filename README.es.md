

# @sfagnoni/express-cloudinary-upload

Una abstracción simple y clara de Cloudinary y Multer para proyectos con Express.

Este paquete busca evitar el boilerplate repetitivo al momento de subir archivos a Cloudinary y ofrecer mensajes de error fáciles de entender.

# Documentación

- English (default)
- Español → README.es.md

---

# Instalación

```bash
npm install @sfagnoni/express-cloudinary-upload
```

También necesitás tener una cuenta en Cloudinary y obtener:

* `cloud_name`
* `api_key`
* `api_secret`

---

# Qué resuelve este paquete

Normalmente trabajar con Cloudinary implica repetir siempre:

* configuración manual de Cloudinary
* configuración de multer
* validación de archivos
* control de errores poco claros
* subida manual a Cloudinary
* manejo de respuestas inconsistentes

Este paquete simplifica todo eso con una API más limpia:

```js
initCloudinary()
singleUpload()
uploadToCloudinary()
```

---

# Funciones disponibles

## initCloudinary()

Configura Cloudinary una sola vez al iniciar tu servidor.

```js
initCloudinary({
  cloud_name,
  api_key,
  api_secret
})
```

### Ejemplo

```js
initCloudinary({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
```

### Error común

Si falta alguna credencial:

```txt
Cloudinary configuration is incomplete.
Please provide cloud_name, api_key and api_secret.
```

---

## singleUpload()

Middleware de multer para subir un único archivo.

```js
singleUpload("image")
```

### Ejemplo

```js
app.post(
  "/upload",
  singleUpload("image"),
  controller
)
```

---

## multipleUpload()

Middleware para múltiples archivos.

```js
multipleUpload("images", 5)
```

Esto permite hasta 5 archivos.

---

## uploadToCloudinary()

Sube el archivo recibido por multer hacia Cloudinary.

```js
await uploadToCloudinary(filePath, folder)
```

### Parámetros

| Parámetro | Tipo   | Descripción                   |
| --------- | ------ | ----------------------------- |
| filePath  | string | ruta temporal del archivo     |
| folder    | string | carpeta destino en Cloudinary |

### Ejemplo

```js
const result = await uploadToCloudinary(
  req.file.path,
  "students"
);
```

### Respuesta

```json
{
  "url": "https://...",
  "public_id": "students/abc123",
  "original_filename": "photo",
  "format": "jpg"
}
```

---

# Ejemplo completo con Express

```js
import express from "express";
import {
  initCloudinary,
  singleUpload,
  uploadToCloudinary
} from "@sfagnoni/express-cloudinary-upload";

const app = express();

initCloudinary({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

app.post(
  "/upload",
  singleUpload("image"),
  async (req, res) => {
    try {
      const result = await uploadToCloudinary(
        req.file.path,
        "students"
      );

      res.json({
        ok: true,
        data: result
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        ok: false,
        message: error.message
      });
    }
  }
);
```

---

# Restricciones importantes

## Límite de tamaño

Actualmente el paquete permite:

```txt
5 MB por archivo
```

Esto se puede modificar internamente en `multer.middleware.js`.

---

## Tipos de archivo

Actualmente no filtra extensiones.

Esto significa que puede aceptar:

* imágenes
* PDFs
* videos
* otros archivos

Se recomienda que el desarrollador agregue validaciones adicionales según su proyecto.

---

# Licencia

MIT

---

