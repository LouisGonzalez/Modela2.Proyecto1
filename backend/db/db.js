const { Sequelize } = require('sequelize');
const { database } = require('../config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                required: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

const salonModel = require('../model/model-salon');
const Salon = salonModel(sequelize, Sequelize);

const carreraModel = require("../model/model-carrera");
const Carrera = carreraModel(sequelize, Sequelize);

const cursoModel = require("../model/model-curso");
const Curso = cursoModel(sequelize, Sequelize);

const catedraticoModel = require('../model/model-catedratico');
const Catedratico = catedraticoModel(sequelize, Sequelize);



Curso.belongsTo(Catedratico, { foreignKey: 'catedratico' });
Catedratico.hasOne(Curso, { foreignKey: 'catedratico' });

Curso.belongsTo(Carrera, { foreignKey: 'carrera' });
Carrera.hasMany(Curso, { foreignKey: 'carrera' });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((err) => console.log(err));

module.exports = {
  sequelize,
  Salon,
  Carrera,
  Curso,
  Catedratico
};