const express = require('express');
const router = express.Router();
const Cuenta = require("../dataaccess/model/Cuenta");


router.get("/", (req, res) => {
    Cuenta.find(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            return
        }

        res.json(docs);
    });
});

router.post("/", (req, res) => {
    var usuario = req.body.usuario;
    var password = req.body.password;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var telefono = req.body.telefono;

    if(usuario === undefined || password === undefined || nombre === undefined || apellido === undefined || correo === undefined || telefono === undefined) {
        res.status(400).json({
            "message": "Parametros invalidos o incompletos"
        })
        return;
    }

    var pin = "123"

    var cuenta = new Cuenta({
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        correo: correo,
        telefono: telefono,
        password: password,
        isVerified: false,
        pin: pin
       
    })

    cuenta.save(function(err, doc) {
        if(err) {
            res.status(500).json({
                message: "Error al guardar"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });

    
});

router.put("/:id", (req, res) => {
    var jsonId = req.params.id;
    var usuario = req.body.usuario;
    var password = req.body.password;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var correo = req.body.correo;
    var telefono = req.body.telefono;

    if(usuario === undefined || password === undefined || nombre === undefined || apellido === undefined || correo === undefined || telefono === undefined) {
        res.status(400).json({
            "message": "Parametros invalidos o incompletos"
        })
        return;
    }

    Cuenta.findOneAndUpdate({
        _id: jsonId
    }, {
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        correo: correo,
        telefono: telefono,
        password: password,
    }, function(err, doc){
        if(err) {
            res.status(500).json({
                message: "Error al ejecutar update"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
    
});

router.delete("/:id", (req, res) => {
    var jsonId = req.params.id;

    Cuenta.findOneAndDelete({
        _id: jsonId
    }, function (err, doc){
        if(err) {
            res.status(500).json({
                message: "Error al ejecutar delete"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

module.exports = router;

