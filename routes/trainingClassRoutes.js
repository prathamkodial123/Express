const express = require("express");
const { createTrainingClass, findAllTrainingClasses,get } = require("../controllers/trainingClassController");
const router = express.Router();
router.post("", createTrainingClass);
router.get("", findAllTrainingClasses);
router.get("/:id", get);
module.exports = router;
