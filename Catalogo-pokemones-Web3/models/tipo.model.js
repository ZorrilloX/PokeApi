module.exports = (sequelize, Sequelize) => {
    const Tipo = sequelize.define("tipos", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    Tipo.associate = (models) => {
        Tipo.belongsToMany(models.pokemon, {
            through: 'pokemonTipos',
            foreignKey: 'idTipo',
            otherKey: 'idPokemon'
        });
    };
    return Tipo;
};
