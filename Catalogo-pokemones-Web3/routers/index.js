module.exports = app => {
    require('./habilidades.routes')(app);
    require('./tipos.routes')(app);
    require('./pokemones.routes')(app);
    require('./home.routes')(app);
    //require('./imagenRoutes')(app);
};
