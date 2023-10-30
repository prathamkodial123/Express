const express = require("express");
const { registerUser, getUsername,exitsEmail, exitsUsername, exitsMobileNo, currentUser, loginUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.post("", registerUser);
router.post("/exits-email", exitsEmail);
router.post("/exits-username", exitsUsername);
router.post("/exits-mobile-no", exitsMobileNo);
router.post("/generate-token", loginUser);
router.post("/current-id", getUsername);

// router.get("/current", validateToken, currentUser);

module.exports = router;
