# 📤 Multiple File Upload with React Hook Form and Multer

This is a simple example of uploading **multiple images** from React to an Express backend using:

* React Hook Form
* FormData
* Axios
* Multer

---

## 📌 Flow

```text
React Form
    ↓
React Hook Form
    ↓
FormData
    ↓
Axios
    ↓
Express
    ↓
Multer
    ↓
req.body + req.files
```

---

# 1. React Hook Form

Install React Hook Form:

```bash
npm install react-hook-form
```

Import it:

```js
import { useForm } from "react-hook-form";
```

Then:

```js
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

---

# 2. Register Form Fields

We can register our inputs using `register()`.

```jsx
<input
  type="text"
  {...register("name")}
/>
```

```jsx
<input
  type="number"
  {...register("age")}
/>
```

For image:

```jsx
<input
  type="file"
  multiple
  {...register("image")}
/>
```

---

# 3. Multiple Files

To select multiple files, use:

```html
multiple
```

Example:

```jsx
<input
  type="file"
  multiple
  accept="image/*"
  {...register("image")}
/>
```

Now the user can select multiple images.

---

# 4. FileList

When we use a file input with React Hook Form:

```js
data.image
```

contains a **FileList**.

For example:

```text
data.image
    ↓
FileList
    ↓
image 1
image 2
image 3
```

We can access a particular file using:

```js
data.image[0]
```

```js
data.image[1]
```

And total files using:

```js
data.image.length
```

---

# 5. Creating FormData

We use `FormData` when we want to send files with other form data.

```js
const formData = new FormData();
```

Add normal data:

```js
formData.append("name", data.name);
formData.append("age", data.age);
```

---

# 6. Adding Multiple Images

Because `data.image` is a FileList, we use a loop:

```js
for (let i = 0; i < data.image.length; i++) {
  formData.append("image", data.image[i]);
}
```

If the user selects 3 images:

```text
image[0] → first image
image[1] → second image
image[2] → third image
```

All three files are added to `FormData`.

---

# 7. Sending FormData with Axios

Now we can send the FormData to our backend:

```js
await axios.post(
  "http://localhost:3000/uploadFile",
  formData
);
```

---

# 8. Complete React Submit Function

```js
const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("age", data.age);

  for (let i = 0; i < data.image.length; i++) {
    formData.append("image", data.image[i]);
  }

  await axios.post(
    "http://localhost:3000/uploadFile",
    formData
  );
};
```

---

# 9. Multer

On the backend, we use **Multer** to handle uploaded files.

For one file:

```js
upload.single("image")
```

For multiple files:

```js
upload.array("image", 5)
```

Here:

```js
"image"
```

is the field name.

And:

```js
5
```

is the maximum number of files.

---

# 10. Backend Route

For multiple files:

```js
app.post(
  "/uploadFile",
  upload.array("image", 5),
  (req, res) => {

    const body = req.body;
    const files = req.files;

    console.log("Body -> ", body);
    console.log("Files -> ", files);

    res.status(201).json({
      message: "File Uploaded Successfully",
    });
  }
);
```

---

# 11. `req.body`

Normal form data is available in:

```js
req.body
```

Example:

```js
{
  name: "dev",
  age: "20"
}
```

---

# 12. `req.files`

Multiple uploaded files are available in:

```js
req.files
```

Example:

```text
req.files
    ↓
[
  file1,
  file2,
  file3
]
```

When using:

```js
upload.array("image", 5)
```

we use:

```js
req.files
```

not:

```js
req.file
```

---

# ⚠️ Common Mistake

Don't do this:

```js
formData.append("image", data.image);
```

Because:

```js
data.image
```

is a `FileList`.

Instead, use the individual files:

```js
for (let i = 0; i < data.image.length; i++) {
  formData.append("image", data.image[i]);
}
```

---

# 🧠 Quick Revision

### One file:

```js
upload.single("image")
```

File:

```js
req.file
```

---

### Multiple files:

```js
upload.array("image", 5)
```

Files:

```js
req.files
```

---

### React:

```jsx
<input
  type="file"
  multiple
  {...register("image")}
/>
```

### FormData:

```js
formData.append("image", data.image[i]);
```

### Axios:

```js
axios.post("/uploadFile", formData);
```

---

# 🚀 Final Flow

```text
<input type="file" multiple />
            ↓
      React Hook Form
            ↓
        data.image
            ↓
         FileList
            ↓
      data.image[i]
            ↓
         FormData
            ↓
          Axios
            ↓
         Express
            ↓
          Multer
            ↓
        req.files
```

> **React Hook Form gets the files, FormData prepares the data, Axios sends it, and Multer handles the files on the backend.**
