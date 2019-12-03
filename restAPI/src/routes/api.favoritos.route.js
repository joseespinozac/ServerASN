const express = require('express');
const router = express.Router();
const ListaFavorito = require('../dataaccess/model/ListaFavorito');
const mongoose = require('../dataaccess/MongoConnect');
const config = require("../config");

router.get("/:idUsuario", (req, res) => {
    var idUsuario = req.params.idUsuario;

    ListaFavorito.find().exec(function(err, docs) {
        _id: idUsuario
    }, {
        //TO DO
    });
});