# 📁 Multer — File Upload in Express.js

> **Multer** is a Node.js middleware used for handling `multipart/form-data`, mainly for **file uploads** in Express.js applications.

---

## 🚀 What is Multer?

Normally, Express can handle data like:

```js
app.use(express.json());
```

But when a client sends a **file** like an image, PDF, video, etc., we need Multer.

Multer reads the uploaded file and gives us access to it through:

```js
req.file
```

And normal form fields through:

```js
req.body
```

---

## 📦 Installation

```bash
npm install multer
```

Then import it:

```js
const multer = require("multer");
```

---

# 💾 Storage

Multer provides different storage options.

## 1. Disk Storage

`diskStorage()` stores the uploaded file directly on the server's disk.

```js
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "uploads"));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
```

### `destination`

It tells Multer **where to save the file**.

```js
destination: (req, file, cb) => {
    cb(null, "uploads");
}
```

### `filename`

It decides the **name of the uploaded file**.

```js
filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
}
```

---

# 🧠 Memory Storage

`memoryStorage()` does **not save the file on disk**.

Instead, it keeps the uploaded file in memory as a **Buffer**.

```js
const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage
});
```

The uploaded file can then be accessed using:

```js
req.file
```

And its actual binary data is available in:

```js
req.file.buffer
```

---

# 📤 Uploading a Single File

For uploading one file:

```js
upload.single("image")
```

Example:

```js
app.post(
    "/upload",
    upload.single("image"),
    (req, res) => {

        console.log(req.file);
        console.log(req.body);

        res.json({
            message: "File uploaded"
        });
    }
);
```

### Important ⚠️

The name inside:

```js
upload.single("image")
```

must match the frontend form field name.

For example:

```html
<input type="file" name="image">
```

Both names should be:

```text
image
```

---

# 📦 `req.file`

When using:

```js
upload.single("image")
```

Multer puts the uploaded file inside:

```js
req.file
```

It contains information like:

```js
{
    fieldname,
    originalname,
    encoding,
    mimetype,
    size,
    buffer
}
```

For example:

```js
console.log(req.file.originalname);
console.log(req.file.mimetype);
console.log(req.file.size);
```

---

# 📝 `req.body`

Normal form fields are available inside:

```js
req.body
```

Example:

```html
<input type="text" name="username">
<input type="file" name="image">
```

Then:

```js
console.log(req.body.username);
console.log(req.file);
```

So simply:

```text
req.body  → normal form data
req.file  → uploaded file
```

---

# 🔄 How Multer Works

```text
Client
   ↓
FormData / multipart-form-data
   ↓
Express Route
   ↓
Multer Middleware
   ↓
File Processing
   ↓
req.file
   ↓
Controller
```

---

# 🛠️ Complete Example

### multer.js

```js
const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const upload = multer({
    storage: memoryStorage
});

module.exports = upload;
```

### app.js

```js
const express = require("express");
const upload = require("./multer");

const app = express();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post(
    "/upload",
    upload.single("image"),
    (req, res) => {

        console.log(req.file);
        console.log(req.body);

        res.status(200).json({
            message: "File uploaded successfully"
        });
    }
);

module.exports = app;
```

---

# 🔥 Important Methods

### Single File

```js
upload.single("image")
```

One file upload.

### Multiple Files

```js
upload.array("images", 5)
```

Maximum 5 files.

Files are available in:

```js
req.files
```

### Multiple Fields

```js
upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "documents", maxCount: 3 }
])
```

Useful when different types of files are uploaded.

---

# ⚠️ Important Things to Remember

* Multer is mainly used for **file uploads**.
* It works with `multipart/form-data`.
* `req.file` → single uploaded file.
* `req.files` → multiple uploaded files.
* `req.body` → normal form fields.
* `diskStorage()` → saves files on disk.
* `memoryStorage()` → keeps files in memory.
* `req.file.buffer` → actual file data when using memory storage.
* `upload.single("image")` → accepts one file.
* Frontend field name and Multer field name must match.

---

# 🎯 One-Line Summary

> **Multer is an Express middleware that handles file uploads and makes uploaded files available through `req.file` or `req.files`.**
