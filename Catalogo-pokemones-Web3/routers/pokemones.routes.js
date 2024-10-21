module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemon.controller");

    router.get("/", controller.listPokemon);
    router.get("/:id", controller.getPokemonById);
    router.post("/",controller.createPokemon);
    router.put("/:id", controller.updatePokemon);
    router.delete("/:id", controller.deletePokemon);

    app.use('/pokemon', router);
};
