var { Curso } = require("../db/db");

const getAll = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      raw: true,
    });
    console.log(cursos);
    return res.status(200).json({ cursos });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const create = async (req, res) => {
  try {
    const curso = await Curso.create({
      nombre: req.body.nombre,
      carrera: req.body.carrera,
      noAsignados: req.body.noAsignados,
      catedratico: req.body.catedratico,
      prioritario: req.body.prioritario
    });
    return res.status(200).json({ curso });
  } catch(error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAll,
  create
};
