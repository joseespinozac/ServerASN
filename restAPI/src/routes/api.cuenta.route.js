const express = require('express');
const router = express.Router();
const Cuenta = require("../dataaccess/model/Cuenta");
const Usuario = require("../dataaccess/model/Usuario");
const ListaFavorito = require("../dataaccess/model/ListaFavorito");
const mongoose = require('../dataaccess/MongoConnect');
const jwt = require("jsonwebtoken");
const config = require("../config");

router.get("/", (req, res) => {
    Cuenta.find().
        exec(function(err, docs){
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

router.get("/buscarCuenta/:nombreusuario", (req, res) => {
    var nombreusuario = req.params.nombreusuario;
    Cuenta.findOne({
        usuario: nombreusuario
    }).exec(function(err, cuenta) {
        if(err){
            res.status(500).json({
                "message": "Error al consultar usuario"
            });
            console.log(err);
            return;
        }
        if(cuenta) {
            Cuenta.populate(cuenta, {path: 'usuarioAsociado', select: ['foto_perfil', 'descripcion']}, function(err, cue){
                console.log(cue);
                res.json(cue); 
            });
        }
    });
});

router.get("/MiCuenta/:idCuenta", (req, res) => {
    var jsonId = req.params.idCuenta;
    console.log(jsonId);
    
    Cuenta.findOne({
        _id: jsonId
    }, function(err, cuenta) {
        if(err){
            console.log("hola2");
            res.status(500).json({
                "message": "Error al consultar usuario"
            });
            console.log(err);
            return;
        }
        if(cuenta) {
            console.log("hola2");
            Cuenta.populate(cuenta, {path: 'usuarioAsociado', select: ['foto_perfil', 'descripcion']}, function(err, cue){
                console.log(cue);
                res.json(cue); 
            });
        }
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
        usuarioAsociado: '',
        isModerador: false
       
    });

    var usuarioAsociado = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        foto_perfil: '',
        descripcion: '',
        nombrePublico: cuenta.usuario,
        cuentaAsociada: cuenta._id
    });

    var listaFavoritos = new ListaFavorito({
        usuario: usuarioAsociado._id
    });

    cuenta.usuarioAsociado = usuarioAsociado._id;


    cuenta.save(function(errCuenta, doc) {
        if(errCuenta) {
            res.status(500).json({
                message: "Error al guardar cuenta"
            });
            console.error(errCuenta);
            return;
        }
        usuarioAsociado.save(function (errUsuario) {
            if(errUsuario) {
                res.status(500).json({
                    message: "Error al guardar usuario de cuenta"
                });
                console.error(errUsuario);
                return;
            }
            listaFavoritos.save(function (errLista) {
                if(errLista) {
                    res.status(500).json({
                        message: "Error al iniciar lista de favoritos"
                    });
                    console.error(errLista);
                    return;
                }
            })
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

    if(usuario === undefined || password === undefined ||
         nombre === undefined || apellido === undefined ||
          correo === undefined || telefono === undefined) {

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
    var usuario = req.body.usuario;
    var password = req.body.password;
    console.log(usuario, password);

    if (!usuario || !password) {
        res.status(400).json({
            message: "Invalid body params"
        })
        return;
    }


    Cuenta.findOne({
        usuario: usuario,
        password: password
    }, function (err, doc) {

        if (err) {
            res.status(500).json({
                message: "Error en la BD"
            });
            console.error(err);
            return;
        }
        if (doc) {
            var tokenPayload = {
                _id: doc._id,
                username: doc.username
            }
            console.log(doc);
            var token = jwt.sign(tokenPayload, config.TOKEN_SECRET, {
                expiresIn: 60 * 60 * 24 * 7 // Expira en una semana
            });

            res.json({
                token: token,
                idCuenta: doc._id,
                idUsuario: doc.usuarioAsociado,
                usuario: doc.usuario,
                isModerador: doc.isModerador
            });

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

