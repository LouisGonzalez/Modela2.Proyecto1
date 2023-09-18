'use strict'

const router = require('express').Router();
var HorarioController = require('../../controllers/horario-controller');

router.get('/', HorarioController.test);
router.get('/horario-por-espacios', HorarioController.generarHorarioPorEspacios)
router.get('/horario-por-curso', HorarioController.generarHorarioPorCurso)

module.exports = router;