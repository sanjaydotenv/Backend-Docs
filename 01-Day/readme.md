# 🚀 Node.js HTTP Server — Basic Server & Routing

A simple beginner-friendly example of how to create an **HTTP server using Node.js** without using Express.

---

## 📌 What I Learned

Today I learned how to:

* Create a server using Node.js
* Use Node.js's built-in `http` module
* Handle incoming requests
* Check the requested URL using `req.url`
* Send a response using `res.end()`
* Create basic routes
* Start a server on a specific port

---

## 🛠️ Technologies Used

* **Node.js**
* **HTTP Module**
* **JavaScript**

> No external package is required for this example.

---

## 📂 Basic Code

```js
const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.end("Hi, I am server");
  }

  if (req.url === "/page1") {
    res.end("I am page 1");
  }

  if (req.url === "/page2") {
    res.end("I am page 2");
  }

});

server.listen(3000, () => {
  console.log("Server is running");
});
```

---

## 🧠 How It Works

### 1. Import the HTTP module

```js
const http = require("http");
```

Node.js provides a built-in `http` module that allows us to create an HTTP server.

---

### 2. Create the server

```js
const server = http.createServer((req, res) => {

});
```

`createServer()` creates an HTTP server.

It gives us two important objects:

* `req` → Request from the client
* `res` → Response that we send back to the client

---

### 3. Check the URL

```js
if (req.url === "/") {
  res.end("Hi, I am server");
}
```

`req.url` tells us which URL the user requested.

For example:

```text
/
```

means the user opened the home route.

---

### 4. Create different routes

```js
if (req.url === "/page1") {
  res.end("I am page 1");
}

if (req.url === "/page2") {
  res.end("I am page 2");
}
```

Now our server has three basic routes:

| URL      | Response        |
| -------- | --------------- |
| `/`      | Hi, I am server |
| `/page1` | I am page 1     |
| `/page2` | I am page 2     |

---

## ▶️ Start the Server

```js
server.listen(3000, () => {
  console.log("Server is running");
});
```

`listen()` starts the server on port `3000`.

After running the JavaScript file:

```bash
node server.js
```

You can open:

```text
http://localhost:3000
```

or:

```text
http://localhost:3000/page1
```

or:

```text
http://localhost:3000/page2
```

---

## 🔄 Request & Response Flow

```text
Browser
   │
   │  Request
   ▼
Node.js Server
   │
   │  Check req.url
   ▼
Route Matching
   │
   ├── "/"      → "Hi, I am server"
   ├── "/page1" → "I am page 1"
   └── "/page2" → "I am page 2"
   │
   ▼
Response
   │
   ▼
Browser
```

---

## 💡 Important Methods

### `http.createServer()`

Creates an HTTP server.

### `req.url`

Tells us which URL the client requested.

### `res.end()`

Sends a response and ends the request.

### `server.listen()`

Starts the server on the given port.

---

## 🎯 Final Example

This small project is the basic idea behind how a server handles different URLs:

```text
Request
   ↓
Server receives request
   ↓
Check URL
   ↓
Find matching route
   ↓
Send response
```

This is a simple introduction to **creating servers and handling routes with Node.js's built-in HTTP module**.
