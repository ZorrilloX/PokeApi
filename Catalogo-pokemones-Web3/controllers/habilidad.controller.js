const db = require("../models");

exports.listHabilidades = async (req, res) => {
    try {
        const habilidades = await db.habilidades.findAll();
        res.json(habilidades);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.getHabilidadById = async (req, res) => {
    const id = req.params.id;
    try {
        const habilidad = await db.habilidades.findByPk(id);
        if (!habilidad) {
            return res.status(404).json({ message: "Habilidad no encontrada" });
        }
        res.json(habilidad);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.createHabilidad = async (req, res) => {
    try {
        const habilidad = await db.habilidades.create({
            nombre: req.body.nombre
        });
        res.status(201).json(habilidad);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.updateHabilidad = async (req, res) => {
    const id = req.params.id;
    try {
        const habilidad = await db.habilidades.findByPk(id);
        if (!habilidad) {
            return res.status(404).json({ message: "Habilidad no encontrada" });
        }
        habilidad.nombre = req.body.nombre || habilidad.nombre;
        await habilidad.save();
        res.json(habilidad);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

exports.deleteHabilidad = async (req, res) => {
    const id = req.params.id;
    try {
        const habilidad = await db.habilidades.findByPk(id);
        if (!habilidad) {
            return res.status(404).json({ message: "Habilidad no encontrada" });
        }
        await habilidad.destroy();
        res.json({ message: "Habilidad eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};
