const express = require("express");
const {findAllSubscription , activeSub ,isActivateSubId ,findAllSchedule} = require("../controllers/subscriptionController");
const router = express.Router();
router.get("/user-subscription/:userId", findAllSubscription);
router.post("/active/:id/:userId", activeSub);
router.post("/exits", isActivateSubId);
router.get("/schedule/:userId", findAllSchedule);

module.exports = router;
