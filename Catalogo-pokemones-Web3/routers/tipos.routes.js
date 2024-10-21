module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/tipo.controller");

    router.get("/", controller.listTipos);
    router.get("/:id", controller.getTipoById);
    router.post("/", controller.createTipo);
    router.put("/:id", controller.updateTipo);
    router.delete("/:id", controller.deleteTipo);

    app.use('/tipos', router);
};