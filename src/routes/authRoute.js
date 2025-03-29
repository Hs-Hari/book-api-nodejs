const {userRegister, userLogin} = require("../controller/authcontroller");
const { Router } = require("express");
const app = Router();

app.post("/register", userRegister);
app.post("/login", userLogin);

module.exports = app;