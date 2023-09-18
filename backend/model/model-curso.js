module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Curso",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      carrera: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      noAsignados: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      catedratico: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      prioritario: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Curso",
      tableName: "Curso",
      timestamps: false,
    }
  );
};
