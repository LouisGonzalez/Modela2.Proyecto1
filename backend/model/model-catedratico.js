module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Catedratico",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.CHAR(150),
        allowNull: false,
      },
      horaEntrada: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      horaSalida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cualificaciones: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Catedratico",
      tableName: "Catedratico",
      timestamps: false,
    }
  );
};
