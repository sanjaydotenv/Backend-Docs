# 🔐 Authentication with JWT

Authentication is used to **verify who the user is**.

In this example, we are using:

* Express.js
* MongoDB
* JWT (JSON Web Token)

---

## 🚀 Register API

```js
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const createdUser = await userModel.create({
    name,
    email,
    password,
  });

  const token = await jwt.sign(
    {
      email,
      _id: createdUser._id,
    },
    "uwfekwjekjfwekjkjfwekjhkhjfwe",
  );

  return res.status(201).json({
    message: "user created successfully",
    createdUser,
    token,
  });
});
```

### 🔍 How it works

First, we get the user data from the request:

```js
const { name, email, password } = req.body;
```

Then we create the user in MongoDB:

```js
const createdUser = await userModel.create({
  name,
  email,
  password,
});
```

After creating the user, we create a JWT token:

```js
const token = await jwt.sign(
  {
    email,
    _id: createdUser._id,
  },
  "secret-key",
);
```

The token contains some information about the user, like:

```js
{
  email,
  _id
}
```

---

## 🎟️ What is JWT?

JWT stands for **JSON Web Token**.

It is a token that the server gives to the user after authentication.

Later, the user can send this token when accessing protected APIs.

```text
Register / Login
       ↓
     Server
       ↓
    JWT Token
       ↓
     Client
       ↓
 Protected API
```

So, simply:

> **JWT helps the server identify the authenticated user.**

---

## 📦 Response

After successful registration, the server sends:

```json
{
    "message": "user created successfully",
    "createdUser": {
        "name": "my name is name",
        "email": "this ia my email",
        "password": "this ia a password",
        "_id": "6a970cb5addfabd5de2dc18f",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaXMgaWEgbXkgZW1haWwiLCJfaWQiOiI2YTk3MGNiNWFkZGZhYmQ1ZGUyZGMxOGYiLCJpYXQiOjE3ODgyODQwODV9.RuKSN9XKnj4J8Vh4MmEE6JgjqsvCIQrabm4IQ6VPuQg"
}
```

---

## ⚠️ Important

In a real project:

* Never store passwords directly in the database.
* Hash passwords using something like `bcrypt`.
* Do not write the JWT secret directly in the code.
* Store the JWT secret inside `.env`.

Example:

```env
JWT_SECRET=your-secret-key
```

---

## 🧠 Simple Flow

```text
User Register
      ↓
Save User
      ↓
Create JWT
      ↓
Send Token
      ↓
User can access protected routes
```
