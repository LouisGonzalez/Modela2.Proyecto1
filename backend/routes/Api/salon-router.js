"use strict";

const router = require("express").Router();
var SalonController = require("../../controllers/salon-controller");

router.get("/", SalonController.getAll);
router.post("/", SalonController.create);

module.exports = router;
