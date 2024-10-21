const db = require("../models");

exports.listTipos = async (req, res) => {
    try {
        const tipos = await db.tipos.findAll();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.getTipoById = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await db.tipos.findByPk(id);
        if (!tipo) {
            return res.status(404).json({ message: "Tipo no encontrado" });
        }
        res.json(tipo);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.createTipo = async (req, res) => {
    try {
        const tipo = await db.tipos.create({
            nombre: req.body.nombre
        });
        res.status(201).json(tipo);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.updateTipo = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await db.tipos.findByPk(id);
        if (!tipo) {
            return res.status(404).json({ message: "Tipo no encontrado" });
        }
        tipo.nombre = req.body.nombre || tipo.nombre;
        await tipo.save();
        res.json(tipo);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.deleteTipo = async (req, res) => {
    const id = req.params.id;
    try {
        const tipo = await db.tipos.findByPk(id);
        if (!tipo) {
            return res.status(404).json({ message: "Tipo no encontrado" });
        }
        //TODO: falta hacer que no se borre en cascada lo pokimones

        await tipo.destroy();
        res.json({ message: "Tipo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};