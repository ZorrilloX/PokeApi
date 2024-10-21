const db = require("../models");
const { manejarImagen } = require("../utils/manejoImagenes"); 

// Listar todos los Pokémon
exports.listPokemon = async (req, res) => {
    try {
        const pokemon = await db.pokemon.findAll();
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Obtener un Pokémon por ID
exports.getPokemonById = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemon.findByPk(id);
        if (!pokemon) {
            res.status(404).json({ msg: "Pokémon no encontrado" });
            return;
        }
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Crear un nuevo Pokémon
exports.createPokemon = async (req, res) => {
    try {
        const pokemon = await db.pokemon.create(req.body);

        res.status(201).json(pokemon);
    } catch (error) {
        console.error('Error en el servidor:', error); // Log para depurar
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Actualizar un Pokémon
exports.updatePokemon = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemon.findByPk(id);
        if (!pokemon) {
            res.status(404).json({ msg: "Pokémon no encontrado" });
            return;
        }
        pokemon.nombre = req.body.nombre || pokemon.nombre;
        pokemon.noPokedex = req.body.noPokedex || pokemon.noPokedex;
        pokemon.idHabilidad1 = req.body.idHabilidad1 || pokemon.idHabilidad1;
        pokemon.idHabilidad2 = req.body.idHabilidad2 || pokemon.idHabilidad2;
        pokemon.idHabilidad3 = req.body.idHabilidad3 || pokemon.idHabilidad3;
        pokemon.idTipo1 = req.body.idTipo1 || pokemon.idTipo1
        pokemon.idTipo2 = req.body.idTipo2 || pokemon.idTipo2;
        pokemon.descripcion = req.body.descripcion || pokemon.descripcion;
        pokemon.hp = req.body.hp || pokemon.hp;
        pokemon.attack = req.body.attack || pokemon.attack;
        pokemon.defense = req.body.defense || pokemon.defense;
        pokemon.spattack = req.body.spattack || pokemon.spattack;
        pokemon.spdefense = req.body.spdefense || pokemon.spdefense;
        pokemon.speed = req.body.speed || pokemon.speed;
        pokemon.nivelEvolucion = req.body.nivelEvolucion || pokemon.nivelEvolucion;
        pokemon.idEvPrevia = req.body.idEvPrevia || pokemon.idEvPrevia;
        pokemon.idEvSiguiente = req.body.idEvSiguiente || pokemon.idEvSiguiente;

        await pokemon.update(req.body);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Eliminar un Pokémon
exports.deletePokemon = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await db.pokemon.findByPk(id);
        if (!pokemon) {
            res.status(404).json({ msg: "Pokémon no encontrado" });
            return;
        }
        await pokemon.destroy();
        res.json({ msg: "Pokémon eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
