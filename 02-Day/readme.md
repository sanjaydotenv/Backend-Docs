# 🚀 Express.js — Basic Server

A basic **Express.js server** built with Node.js to understand routes, middleware, HTTP methods, and JSON request data.

---

## 📌 Why Express.js?

Node.js already provides the built-in `http` module to create servers.

So why do we use **Express.js**?

### Node.js HTTP

With the native `http` module, we have to manually handle things like:

* Request URL
* HTTP method
* Routing
* Request body
* Responses

Example:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("Home");
  }

  if (req.url === "/about" && req.method === "GET") {
    res.end("About");
  }
});

server.listen(3000);
```

As the application grows, this can become difficult to manage.

### Express.js

Express provides a simpler and cleaner way to build HTTP servers and APIs.

```js
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});
```

So basically:

```text
Node.js HTTP
     ↓
Low-level HTTP handling
     ↓
Express.js
     ↓
Easy routing + middleware + APIs
```

> 💡 **Express.js does not replace HTTP. It is a framework built on top of Node.js HTTP functionality.**

---

# 🛠️ Installation

```bash
npm init -y
npm install express
```

---

# 💻 Express Server

```js
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hy i am server");
});

app.get("/home", (req, res) => {
  res.send("Hy i am home page");
});

app.post("/get-data", (req, res) => {
  console.log(req.body);

  res.send("backend");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

---

# 🔍 Code Explanation

### 1. Import Express

```js
const express = require("express");
```

Imports the Express.js package into our project.

---

### 2. Create Express App

```js
const app = express();
```

Creates an Express application.

We use `app` to create routes, middleware, and start our server.

---

### 3. JSON Middleware

```js
app.use(express.json());
```

This middleware allows Express to read **JSON data** sent by the client.

Example:

```json
{
  "name": "Mayur",
  "role": "Developer"
}
```

We can access this data using:

```js
req.body
```

---

### 4. GET Route

```js
app.get("/", (req, res) => {
  res.send("Hy i am server");
});
```

When the client sends:

```text
GET /
```

Express sends:

```text
Hy i am server
```

---

### 5. Home Route

```js
app.get("/home", (req, res) => {
  res.send("Hy i am home page");
});
```

Request:

```text
GET /home
```

Response:

```text
Hy i am home page
```

---

### 6. POST Route

```js
app.post("/get-data", (req, res) => {
  console.log(req.body);

  res.send("backend");
});
```

This route receives data from the client.

Example request body:

```json
{
  "name": "Mayur",
  "age": 18
}
```

We can access it using:

```js
req.body
```

---

### 7. Start Server

```js
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

This starts the server on **port 3000**.

Open:

```text
http://localhost:3000
```

---

# 🌐 Protocols — Basic Overview

Protocols are **rules that define how devices communicate and exchange data**.

### 🔹 TCP

**Transmission Control Protocol**

* Reliable
* Ordered data delivery
* Connection-oriented

```text
Client ───────► Server
      Reliable
```

---

### 🔹 UDP

**User Datagram Protocol**

* Very fast
* No guaranteed delivery
* Connectionless

```text
Client ───────► Server
         Fast
```

Used where speed is more important than reliability.

---

### 🔹 HTTP

**HyperText Transfer Protocol**

Used for communication between **clients and web servers**.

```text
Client ── HTTP Request ──► Server
Client ◄─ HTTP Response ── Server
```

Express.js is mainly used to build **HTTP servers and APIs**.

---

### 🔹 WebSocket

Used for **real-time, two-way communication**.

```text
Client ◄────────► Server
       Real-time
```

Examples:

* Chat
* Live notifications
* Live dashboards
* Multiplayer games

---

### 🔹 FTP

**File Transfer Protocol**

Used to transfer files between a client and server.

```text
Client ── Upload ──► Server
Client ◄─ Download ─ Server
```

---

### 🔹 SMTP

**Simple Mail Transfer Protocol**

Used mainly for **sending emails**.

```text
Application
     ↓
   SMTP
     ↓
Mail Server
```

Examples:

* OTP emails
* Password reset emails
* Notification emails

---

# 🧠 Quick Summary

```text
TCP       → Reliable data transfer
UDP       → Fast data transfer
HTTP      → Web/API communication
WebSocket → Real-time communication
FTP       → File transfer
SMTP      → Email sending
```

---

# 📊 Express vs Node HTTP

| Node.js `http`              | Express.js              |
| --------------------------- | ----------------------- |
| Built into Node.js          | External framework      |
| More manual work            | Less boilerplate        |
| Manual routing              | Easy routing            |
| Manual request handling     | Middleware support      |
| Good for understanding HTTP | Great for building APIs |

> 🚀 **Node.js gives us the HTTP foundation, while Express.js makes building HTTP servers and APIs much easier.**

---

# ▶️ Run

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

---

## 🎯 Learning Flow

```text
Node.js
   ↓
HTTP Module
   ↓
Express.js
   ↓
Routes & Middleware
   ↓
REST APIs
   ↓
WebSockets
   ↓
Backend Development
```

**Built while learning Node.js & Backend Development 🚀**
