//import { generarHorario3 } from "../services/horarios-service.js";
const { sequelize } = require("../db/db");
const service = require('../services/horarios-service')
const prioridadCursos = require('../services/prioridad-cursos-service');
var SalonController = require("../controllers/salon-controller");
var { Salon } = require("../db/db");

const generarHorarioPorEspacios = async(req, res) => {
    try {
        const [dataCursosAsc, metadata] = await sequelize.query(
          "SELECT curso.id AS curso_id, carrera.nombre AS carrera, curso.nombre AS nombre_curso, curso.noAsignados AS noAsignados, curso.prioritario AS prioritario FROM carrera JOIN curso ON carrera.id = curso.carrera ORDER BY curso_id ASC"
        );
        const [dataCursosDesc, metadata2] = await sequelize.query(
          "SELECT curso.id AS curso_id, carrera.nombre AS carrera, curso.nombre AS nombre_curso, curso.noAsignados AS noAsignados, curso.prioritario AS prioritario FROM carrera JOIN curso ON carrera.id = curso.carrera ORDER BY curso_id DESC"
        );
        const salones = await Salon.findAll({
            raw: true
        });
        const asignaciones = service.generarHorario3(dataCursosAsc, salones);
        const asignacionesDesc = service.generarHorario3(dataCursosDesc, salones);

        const result = {
            opciones: [
                { ...asignaciones},
                { ...asignacionesDesc}
            ],
            noSalones: salones.length
        }
        return res.status(200).send(result);
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

const generarHorarioPorCurso = async(req, res) => {
    try {
        const [dataCursosAsc, metadata] = await sequelize.query(
          "SELECT curso.id AS curso_id, carrera.nombre AS carrera, curso.nombre AS nombre_curso, curso.noAsignados AS noAsignados, curso.prioritario AS prioritario FROM carrera JOIN curso ON carrera.id = curso.carrera ORDER BY curso_id ASC"
        );
        const [dataCursosDesc, metadata2] = await sequelize.query(
          "SELECT curso.id AS curso_id, carrera.nombre AS carrera, curso.nombre AS nombre_curso, curso.noAsignados AS noAsignados, curso.prioritario AS prioritario FROM carrera JOIN curso ON carrera.id = curso.carrera ORDER BY curso_id DESC"
        );
        const salones = await Salon.findAll({
            raw: true
        });
        const asignaciones = prioridadCursos.generarHorario(dataCursosAsc, salones);
        const asignacionesDesc = prioridadCursos.generarHorario(dataCursosDesc, salones);
        const result = {
            opciones: [
                { ...asignaciones },
                { ...asignacionesDesc }
            ],
            noSalones: salones.length
        }
        return res.status(200).send(result);
    } catch(error) {
        return res.status(500).send(error.message);
    }
}


const test = async(req, res) => {
    try {
        service.generarHorario3();
        const horario = {
            test: 'this is a test'

        };

        return res.status(200).json(horario);
    } catch(error){
        return res.status(500).send(error.message);
    }
}

module.exports = {
    test,
    generarHorarioPorEspacios,
    generarHorarioPorCurso
}