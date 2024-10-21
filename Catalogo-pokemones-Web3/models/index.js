const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//declaracion de las entidades--------------------//
db.pokemon = require('./pokemon.model.js')(sequelize, Sequelize);

// Relación de tablas de Pokémon, Tipo, Habilidad
db.tipos = require('./tipo.model.js')(sequelize, Sequelize);
db.habilidades = require('./habilidad.model.js')(sequelize, Sequelize);
db.pokemon = require('./pokemon.model.js')(sequelize, Sequelize);

// Relaciones de habilidades y tipos a Pokémon
db.pokemon.belongsTo(db.habilidades, { as: 'habilidad1', foreignKey: 'idHabilidad1' });
db.pokemon.belongsTo(db.habilidades, { as: 'habilidad2', foreignKey: 'idHabilidad2' });
db.pokemon.belongsTo(db.habilidades, { as: 'habilidad3', foreignKey: 'idHabilidad3' });

db.pokemon.belongsTo(db.tipos, { as: 'tipo1', foreignKey: 'idTipo1' });
db.pokemon.belongsTo(db.tipos, { as: 'tipo2', foreignKey: 'idTipo2' });

db.pokemon.belongsTo(db.pokemon, { as: 'evolucionPrevia', foreignKey: 'idEvPrevia' });
db.pokemon.belongsTo(db.pokemon, { as: 'evolucionSiguiente', foreignKey: 'idEvSiguiente' });


module.exports = db;
