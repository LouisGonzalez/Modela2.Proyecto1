var { Carrera } = require("../db/db");

const getAll = async (req, res) => {
  try {
    const carreras = await Carrera.findAll({
      raw: true,
    });
    console.log(carreras);
    return res.status(200).json({ carreras });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAll,
};
