"use strict";

const router = require("express").Router();
var CarreraController = require("../../controllers/carrera-controller");

router.get("/", CarreraController.getAll);

module.exports = router;
