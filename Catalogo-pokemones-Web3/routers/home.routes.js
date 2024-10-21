module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/home.controller");

    router.get("/", controller.getPokemons);
    router.get("/:id/", controller.getPokemonById);
    router.get("/evoluciones/:id/", controller.getLineaEvolutiva);

    app.use('/pokeApi', router);
};
