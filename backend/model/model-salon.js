module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Salon', {
        noSalon: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        noAsientos: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Salon',
        tableName: 'Salon',
        timestamps: false
    });
}