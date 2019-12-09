const express = require('express');
const router = express.Router();
const Cuenta = require("../dataaccess/model/Cuenta");
const mongoose = require('../dataaccess/MongoConnect');


router.get("/", (req, res) => {
    Cuenta.find().
        exec(function (err, docs) {
            if (err) {
                res.status(500).json({
                    "message": "Hubo un error al ejecutar la consulta"
                })
                console.error(err);
                return;
            }

            res.json(docs);
        });
});


router.post("/addModerador", (req, res )=>{

    var usuario = req.body.usuario;
    var password = req.body.password;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var telefono = req.body.telefono;

    if (usuario === undefined || password === undefined || nombre === undefined || apellido === undefined || correo === undefined || telefono === undefined) {
        res.status(400).json({
            "message": "Parametros invalidos o incompletos"
        })
        return;
    }

    var pin = "123"

    var cuenta = new Cuenta({
        _id: new mongoose.Types.ObjectId(),
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        correo: correo,
        telefono: telefono,
        password: password,
        isVerified: false,
        pin: pin,
        isModerador: true

    });

    cuenta.save(function (errCuenta, doc) {
        if (errCuenta) {
            res.status(500).json({
                message: "Error al guardar cuenta"
            });
            console.error(errCuenta);
            return;
        }
        res.json(doc);
    });

});

module.exports = router;