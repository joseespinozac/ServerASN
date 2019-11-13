const express = require('express');
const router = express.Router();
const Cuenta = require("../dataaccess/model/Cuenta");
const Usuario = require("../dataaccess/model/Usuario");
const mongoose = require('../dataaccess/MongoConnect');

router.get("/", (req, res) => {
    Usuario.find().populate('cuentaAsociada', ['_id', 'nombre', 'usuario']).exec(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            });
            console.error(err);
            return;
        }
        res.json(docs);
    });
});

router.delete("/:id", (req, res) => {
    var idUsuario = req.params.id;
    Usuario.findOneAndDelete({
        _id: idUsuario
    }, function(err, usuario) {
        if(err) {
            res.status(500).json({
                message: "Error al eliminar usuario de cuenta"
            })
            console.error(errr);
            return;
        }
        res.json(usuario);
    })
})

module.exports = router;