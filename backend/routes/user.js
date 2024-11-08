const express = require("express");
const { signup, login, getAllUsers } = require("../controller/user");

const router = express.Router();

router.get("/users", getAllUsers)
router.post("/signup", signup)
router.post("/login",login);

module.exports = router;