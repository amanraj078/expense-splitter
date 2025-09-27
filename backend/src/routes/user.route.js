const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUsers,
} = require("../controller/user.controller.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get", getUsers);

module.exports = router;
