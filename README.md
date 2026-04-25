# @sfagnoni/express-cloudinary-upload

A simple, clear abstraction that integrates Cloudinary and Multer for Express projects.

This package aims to eliminate repetitive boilerplate when uploading files to Cloudinary and to provide easy-to-understand error messages.

# Documentation

- English (default)
- Español → README.es.md

---

# Installation

```bash
npm install @sfagnoni/express-cloudinary-upload
```

You also need a Cloudinary account and the following credentials:

* `cloud_name`
* `api_key`
* `api_secret`

---

# What this package solves

Working with Cloudinary usually requires repeating the same steps every time:

* manual Cloudinary configuration
* multer setup
* file validation
* unclear error handling
* manual uploads to Cloudinary
* inconsistent response handling

This package simplifies all of that with a cleaner API:

```js
initCloudinary()
singleUpload()
uploadToCloudinary()
```

---

# Available functions

## initCloudinary()

Configures Cloudinary once when your server starts.

```js
initCloudinary({
  cloud_name,
  api_key,
  api_secret
})
```

### Example

```js
initCloudinary({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
```

### Common error

If a credential is missing you'll see:

```txt
Cloudinary configuration is incomplete.
Please provide cloud_name, api_key and api_secret.
```

---

## singleUpload()

A `multer` middleware for uploading a single file.

```js
singleUpload("image")
```

### Example

```js
app.post(
  "/upload",
  singleUpload("image"),
  controller
)
```

---

## multipleUpload()

Middleware for multiple files.

```js
multipleUpload("images", 5)
```

This allows up to 5 files.

---

## uploadToCloudinary()

Uploads the file received by `multer` to Cloudinary.

```js
await uploadToCloudinary(filePath, folder)
```

### Parameters

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| filePath  | string | temporary path of the file     |
| folder    | string | destination folder in Cloudinary |

### Example

```js
const result = await uploadToCloudinary(
  req.file.path,
  "students"
);
```

### Response

```json
{
  "url": "https://...",
  "public_id": "students/abc123",
  "original_filename": "photo",
  "format": "jpg"
}
```

---

# Complete Express example

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

# Important constraints

## Size limit

At the moment the package enforces:

```txt
5 MB per file
```

This can be modified internally in `multer.middleware.js`.

---

## File types

There is currently no extension filtering.

This means it may accept:

* images
* PDFs
* videos
* other files

Developers are encouraged to add additional validations according to their project's needs.

---

# License

MIT

---

# Repository Links

## GitHub Repository

https://github.com/sfagnoni/express-cloudinary-upload

Use this repository to:

- clone the project
- report issues
- suggest improvements
- create forks
- submit Pull Requests

---

## NPM Package

https://www.npmjs.com/package/@sfagnoni/express-cloudinary-upload

Install the package with:

```bash
npm install @sfagnoni/express-cloudinary-upload