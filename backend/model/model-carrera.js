module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Carrera",
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
    },
    {
      sequelize,
      modelName: "Carrera",
      tableName: "Carrera",
      timestamps: false,
    }
  );
};
