"use strict";

const router = require("express").Router();
var CursoController = require("../../controllers/cursos-controller");

router.get("/", CursoController.getAll);
router.post("/", CursoController.create);

module.exports = router;
