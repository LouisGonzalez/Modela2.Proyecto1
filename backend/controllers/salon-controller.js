var { Salon } = require('../db/db');

const getAll = async(req, res) => {
    try {
        const salones = await Salon.findAll({
            raw: true
        });
        return res.status(200).json({ salones });
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

const create = async(req, res) => {
    try {
        const salon = await Salon.create({
            noSalon: req.body.noSalon,
            noAsientos: req.body.noAsientos
        });
        return res.status(200).json({ salon });
    } catch(error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAll,
    create
}