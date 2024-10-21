const db = require("../models");

// Listar todos los Pokémon
exports.getPokemons = async (req, res) => {
    try {
        const pokemones = await db.pokemon.findAll({
            order: [['noPokedex']]
        });
        res.json(pokemones);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

exports.getPokemonById = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await db.pokemon.findByPk(id, {
            include: [
                { model: db.habilidades, as: 'habilidad1' },
                { model: db.habilidades, as: 'habilidad2' },
                { model: db.habilidades, as: 'habilidad3' },
                { model: db.tipos, as: 'tipo1' },
                { model: db.tipos, as: 'tipo2' },
                { model: db.pokemon, as: 'evolucionPrevia', 
                    attributes: ['id', 'nombre', 'nivelEvolucion']
                },
                { model: db.pokemon, as: 'evolucionSiguiente', 
                    attributes: ['id', 'nombre', 'nivelEvolucion']
                }
            ],
        });

        if (!pokemon) {
            return res.status(404).json({ msg: "Pokémon no encontrado." });
        }

        res.json(pokemon);
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


exports.getLineaEvolutiva = async (req, res) => {
    try {
        const id = req.params.id;

        // Buscar el Pokémon por su ID
        const pokemonActual = await db.pokemon.findByPk(id);

        if (!pokemonActual) {
            return res.status(404).json({ msg: "Pokémon no encontrado." });
        }

        let evolution1 = null;
        let evolution2 = null;
        let evolution3 = null;

        // Caso en que el Pokémon actual es el del medio (tiene ambos idEvPrevia e idEvSiguiente)
        if (pokemonActual.idEvPrevia !== null && pokemonActual.idEvSiguiente !== null) {
            evolution2 = pokemonActual;
            evolution1 = await db.pokemon.findByPk(pokemonActual.idEvPrevia); // Evolución previa
            evolution3 = await db.pokemon.findByPk(pokemonActual.idEvSiguiente); // Evolución siguiente
        }
        // Caso en que el Pokémon actual es la primera fase (idEvPrevia es null)
        else if (pokemonActual.idEvPrevia === null && pokemonActual.idEvSiguiente !== null) {
            evolution1 = pokemonActual;
            evolution2 = await db.pokemon.findByPk(pokemonActual.idEvSiguiente); // Evolución siguiente
            evolution3 = evolution2 ? await db.pokemon.findByPk(evolution2.idEvSiguiente) : null; // Evolución siguiente de la segunda fase
        }
        // Caso en que el Pokémon actual es la última fase (idEvSiguiente es null)
        else if (pokemonActual.idEvPrevia !== null && pokemonActual.idEvSiguiente === null) {
            evolution3 = pokemonActual;
            evolution2 = await db.pokemon.findByPk(pokemonActual.idEvPrevia); // Evolución previa
            evolution1 = evolution2 ? await db.pokemon.findByPk(evolution2.idEvPrevia) : null; // Evolución previa de la segunda fase
        }

        res.json({
            evolution1: evolution1 ? { id: evolution1.id, nombre: evolution1.nombre, nivelEvolucion: evolution1.nivelEvolucion } : null,
            evolution2: evolution2 ? { id: evolution2.id, nombre: evolution2.nombre, nivelEvolucion: evolution2.nivelEvolucion } : null,
            evolution3: evolution3 ? { id: evolution3.id, nombre: evolution3.nombre, nivelEvolucion: evolution3.nivelEvolucion } : null
        });
    } catch (error) {
        console.error('Error al obtener la línea evolutiva:', error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

