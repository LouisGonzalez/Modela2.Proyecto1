"use strict";

const router = require("express").Router();
var CatedraticoController = require("../../controllers/catedratico-controller");

router.get("/", CatedraticoController.getAll);
router.post("/", CatedraticoController.create);

module.exports = router;
