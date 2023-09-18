'use strict'

const router = require('express').Router();

var apiHorarios = require('./Api/horario-router');
router.use('/horario', apiHorarios);

var apiSalon = require('./Api/salon-router');
router.use('/salon', apiSalon);

var apiCursos = require('./Api/curso-router');
router.use('/cursos', apiCursos);

var apiCatedraticos = require('./Api/catedratico-router');
router.use('/catedraticos', apiCatedraticos);

var apiCarreras = require('./Api/carrera-router');
router.use('/carreras', apiCarreras);


module.exports = router;