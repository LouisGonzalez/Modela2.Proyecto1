var { Catedratico } = require("../db/db");

const getAll = async (req, res) => {
  try {
    const catedraticos = await Catedratico.findAll({
      raw: true,
    });
    console.log(catedraticos);
    return res.status(200).json({ catedraticos });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const create = async(req, res) => {
  try {
    const catedratico = await Catedratico.create({
      nombre: req.body.nombre,
      horaEntrada: req.body.horaEntrada,
      horaSalida: req.body.horaSalida,
      cualificaciones: req.body.cualificaciones
    });
    return res.status(200).json({ catedratico });
  } catch(error) { 
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAll,
  create
};
