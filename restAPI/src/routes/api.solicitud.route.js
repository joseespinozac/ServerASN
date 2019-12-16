const express = require('express');
const router = express.Router();
const Solicitud = require("../dataaccess/model/Solicitud");
const mongoose = require("../dataaccess/MongoConnect");

var estados = {
    PENDIENTE: 1,
    CANCELADA: 2,
    ACEPTADA: 3,
    RECHAZADA: 4,
    properties: {
        1 : {estado: "pendiente"},
        2 : {estado: "cancelada"},
        3 : {estado: "aceptada"},
        4 : {estado: "rechazado"}
    }
}


//Get Solicitudes de un usuario
router.get("/:idUsuario", (req, res) => {
    var idUsuario = req.params.idUsuario;
    Solicitud.find({
        $or:[{usuarioEnvia: idUsuario}, {usuarioRecibe: idUsuario}]
    }).exec(function(err, docs){
            if(err){
                res.status(500).json({
                    "message": "Hubo un error al consultar las solicitudes"
                });
                console.error(err);
                return;
            }
            

            res.json(docs);
        });
});

//Get amigos de un usuario
router.get("/amigos/:idUsuario", (req, res) => {

    let listaAmigos = [];
    var idUsuario = req.params.idUsuario;

    Solicitud.find({
        $and:[{$or:[{usuarioEnvia: idUsuario}, {usuarioRecibe: idUsuario}]},
         {estadoSolicitud: estados.properties[3].estado}]
    }).
    exec(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al consultar las solicitudes"
            });
            console.error(err);
            return;
        }
        if(docs) {
            docs.forEach(solicitud => {
                if(solicitud.usuarioEnvia == idUsuario) {
                    listaAmigos.push(solicitud.usuarioRecibe);
                } else {
                    listaAmigos.push(solicitud.usuarioEnvia);
                }
            });

            res.json(listaAmigos);
        }

    });
});

router.post("/", (req, res) => {
    var usuarioEnviaId = req.body.usuarioEnviaId;
    var usuarioRecibeId = req.body.usuarioRecibeId;

    if(usuarioEnviaId === undefined || usuarioRecibeId === undefined){
        res.status(400).json({
            "message": "Parametros invalidos o incompletos"
        });
    }

    var solicitud = new Solicitud({
        usuarioEnvia: usuarioEnviaId,
        usuarioRecibe: usuarioRecibeId,
        estadoSolicitud: estados.properties[estados.ACEPTADA].estado
    });

    solicitud.save(function(err, doc) {
        if(err) {
            res.status(500).json({
                "message": "Error al registrar la solicitud de amistad"
            });
            console.error(err);
            return;
        }
        res.json(doc);
    });
});

router.put("/modificarEstado/:idSolicitud", (req, res) => {
    var nuevoEstado = req.body.estado;
    var idSolicitud = req.params.idSolicitud;

    if(nuevoEstado === undefined && (nuevoEstado < 5 && nuevoEstado > 0) ){
        res.status(400).json({
            "message": "Parametros invalidos o incompletos. Asegurese de seleccionar un estado valido"
        });
        return;
    }
    
    Solicitud.findOneAndUpdate({
        _id: idSolicitud
    }, {
        estadoSolicitud: estados.properties[nuevoEstado].estado
    }, function (err, doc){
        if(err) {
            res.status(500).json("Error al ejecutar update de estado de Solicitud");
        }
        if(doc) {
            res.json(doc);
        }
    })

})



module.exports = router;