# 🔐 Authentication, Middleware & Password Hashing


## 🔐 Authentication

Authentication means checking whether a user is a valid user or not.

For example, when a user logs in, the server checks the user's information. If everything is correct, the user can access protected routes.

Basic flow:

User → Login/Register → Server checks user → JWT Token → Protected Route

---

## 🎟️ JWT (JSON Web Token)

JWT is a token used to identify an authenticated user.

A JWT can be created using:

const token = jwt.sign(
    { id: user._id },
    "secret"
);

Here, `user._id` is stored in the token so that we can identify the user later.

The `secret` is used to sign the token.

---

## 🔍 jwt.verify()

When the client sends the token back to the server, the server verifies the token.

Example:

const decoded = jwt.verify(token, "secret");

If the token is valid, we get the decoded data.

For example:

decoded.id

If the token is invalid, `jwt.verify()` throws an error. Because of this, we use `try/catch`.

try {
    decoded = jwt.verify(token, "secret");
} catch (error) {
    return res.status(401).send("Invalid token");
}

Simple flow:

Token → jwt.verify() → Valid → Continue

Token → jwt.verify() → Invalid → Error → 401

---

## 🧩 Middleware

Middleware is a function that runs before the main route handler.

Example:

app.get(
    "/api/users/me",
    isAuthenticated,
    async (req, res) => {
        // route
    }
);

Here, `isAuthenticated` is the middleware.

The middleware checks the request before allowing it to reach the protected route.

Flow:

Request → Middleware → Check Token → next() → Route

---

## 🚪 next()

`next()` is used to continue the request to the next function.

Example:

const middleware = (req, res, next) => {

    // check something

    next();

};

If the request is valid, we call `next()`.

If the request is not valid, we send a response and do not call `next()`.

---

## 🛡️ Authentication Middleware

I created an authentication middleware to check the user's token.

Example:
```jsx
const isAuthenticated = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.send("token not found");
    }

    let decoded;

    try {
        decoded = jwt.verify(token, "secret");
    } catch (error) {
        return res.status(401).send("Invalid token");
    }

    const getUser = await userModel.findById(decoded.id);

    req.forMe = getUser;

    next();
};
```
The middleware works like this:

Get Token → Verify Token → Get User ID → Find User → Store User → next()

---

## 👤 Finding the User

After verifying the JWT, we get the user ID from:

decoded.id

Then we find the user from the database:

const getUser = await userModel.findById(decoded.id);

After finding the user, we store it in the request:

req.forMe = getUser;

Now the protected route can access the user using:

const user = req.forMe;

---

## 🔒 Password Hashing

Passwords should not be stored directly in the database.

For example, we should not store:

password: "123456"

Instead, we hash the password before saving it.

I used `bcryptjs` for this:

import bcrypt from "bcryptjs";

To hash a password:

const hashedPassword = await bcrypt.hash(password, 10);

Then we store the hashed password in the database.

Flow:

Original Password → bcrypt → Hashed Password → Database

---

## 🧂 Salt Rounds

In this code:

bcrypt.hash(password, 10);

`10` is the salt rounds value.

It controls the amount of work bcrypt performs when creating the password hash.

---

## 📝 Registration Flow

During registration, the password is first hashed.

Example:

const { username, email, password } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

const user = await userModel.create({
    name: username,
    email,
    password: hashedPassword,
});

const token = jwt.sign(
    { id: user._id },
    "secret"
);

The basic flow is:

User Data → Hash Password → Save User → Create JWT → Send Token

---

## 🛡️ Protected Route

A protected route can use the authentication middleware.

Example:

app.get(
    "/api/users/me",
    isAuthenticated,
    async (req, res) => {

        const user = req.forMe;

        res.send({
            message: "ok",
            user,
        });

    }
);

Before this route runs, `isAuthenticated` runs first.

If the token is valid:

Middleware → Verify Token → Find User → next() → Route

If the token is invalid:

Middleware → Verify Token → Error → 401 Response

---

## 🧠 What I Learned

Today I learned:

- 🔐 Authentication
- 🧩 Middleware
- 🎟️ JWT
- 🔍 jwt.sign()
- 🔍 jwt.verify()
- 🔒 Password Hashing
- 🧂 bcrypt Salt Rounds
- 🚪 next()
- 👤 Finding User from JWT
- 🛡️ Protected Routes

---

## 🚀 Basic Authentication Flow

Register

↓

Hash Password

↓

Save User

↓

Create JWT

↓

Send Token to Client

↓

Client Sends Token

↓

Middleware Checks Token

↓

Verify JWT

↓

Find User

↓

next()

↓

Protected Route

---

# 🔐 Authentication + Middleware

Learn → Build → Understand → Improve 🚀