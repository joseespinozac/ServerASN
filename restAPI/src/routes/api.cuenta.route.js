const express = require('express');
const router = express.Router();
const Cuenta = require("../dataaccess/model/Cuenta");
const Usuario = require("../dataaccess/model/Usuario");
const mongoose = require('../dataaccess/MongoConnect');
const jwt = require("jsonwebtoken");
const config = require("../config");

router.get("/", (req, res) => {
    Cuenta.find().populate('usuarioAsociado').exec(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            return;
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
        _id: new mongoose.Types.ObjectId(),
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        correo: correo,
        telefono: telefono,
        password: password,
        isVerified: false,
        pin: pin,
        usuarioAsociado: ''
       
    });

    var usuarioAsociado = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        foto_perfil: '',
        descripcion: '',
        cuentaAsociada: cuenta._id
    });

    cuenta.usuarioAsociado = usuarioAsociado._id;


    cuenta.save(function(err, doc) {
        if(err) {
            res.status(500).json({
                message: "Error al guardar cuenta"
            })
            console.error(err);
            return;
        }
        usuarioAsociado.save(function (err) {
            if(err) {
                res.status(500).json({
                    message: "Error al guardar usuario de cuenta"
                })
                console.error(err);
                return;
            }
        });
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
        });
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
        password: password
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
    var idCuenta = req.params.id;

    Cuenta.findOneAndDelete({
        _id: idCuenta
    }, function (err, cuenta){
        if(err) {
            res.status(500).json({
                message: "Error al eliminar cuenta"
            })
            console.error(err);
            return;
        }
        console.log(cuenta);

        //TODO
        if(cuenta){
            var idUsuarioAsociado = cuenta.usuarioAsociado;
            Usuario.findOneAndDelete({
                _id: idUsuarioAsociado
            }, function(err, usuario) {
                if(err) {
                    res.status(500).json({
                        message: "Error al eliminar usuario de cuenta"
                    })
                    console.error(errr);
                    return;
                }

                if(usuario){
                    res.json("Cuenta y usuario eliminados");
                } else {
                    res.status(404).json({
                        message: "No se encontro el usuario de la cuenta solicitada"
                    });
                }

                
            })
        } else {
            res.status(404).json({
                message: "No se encontro la cuenta solicitada"
            });
        }
    });
});

router.post("/login", (req, res) => {
    var correo = req.body.correo;
    var password = req.body.password;

    if (!correo || !password) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return
    }


    Cuenta.find({
        correo: correo,
        password: password
    }, function (err, doc) {

        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            })
            console.error(err)
            return
        }
        if (doc) {
            var tokenPayload = {
                _id: doc._id,
                username: doc.username
            }

            var token = jwt.sign(tokenPayload, config.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 7 // Expira en una semana
            })

            res.json({
                token: token
            })

        } else {
            res.status(401).json({
                message: "Username not found"
            });
        }
    })
});

router.put("/modUsuario/:idCuenta", (req, res) => { 
    var foto_perfil = req.body.foto_perfil;
    var descripcion = req.body.descripcion;

    var jsonId = req.params.idCuenta;
    Cuenta.findOne({
        _id: jsonId
    }, function (err, cuenta) {
        if(err) {
            res.status(500).json({
                message: "Error al ejecutar consulta"
            })
            console.error(err);
            return;
        }
        if(cuenta) {
            var idUsuarioAsociado = cuenta.usuarioAsociado;
            Usuario.findOneAndUpdate({
                _id: idUsuarioAsociado
            }, {
                foto_perfil: foto_perfil,
                descripcion: descripcion
            }, function(err, doc){
                if(err) {
                    res.status(500).json("Error al ejecutar update de usuario");
                }
                if(doc){
                    res.json("Exito para modificar info de usuario");
                    
                }
            });
        }

    });
    
});


module.exports = router;

