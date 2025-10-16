import express from"express";
import router from express.Router();
export const { signup, login } = require("../controllers/authcontroller");

router.post("/signup", signup);
router.post("/login", login);

//module.exports = router;
