const express = require('express');
const router = express.Router();
const Publicacion = require("../dataaccess/model/Publicacion");

router.get("/", (req, res) => {
    Publicacion.find().
    populate('usuarioAsociado').
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

router.post("/", (req, res) => {
    var fotoUrl = req.body.fotoUrl;
    var fechaCarga = new Date(Date.now()).toISOString();
    var descripcion = req.body.descripcion;
    var idUsuario = req.body.idUsuario;

    console.log(fotoUrl + " " + fechaCarga + " " + descripcion + " " + idUsuario);

    if(fotoUrl === undefined || fechaCarga === undefined || descripcion === undefined || idUsuario === undefined){
        res.status(400).json({
            "message": "Parametros invalido o incompletos"
        })
        return;
    }

    var publicacion = new Publicacion({
        fotoUrl: fotoUrl,
        fechaCarga: fechaCarga,
        descripcion: descripcion,
        usuario: idUsuario
    })

    publicacion.save(function(err, doc){
        if(err) {
            res.status(500).json({
                "message": "Error al guardar publicación"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    })
});

router.put("/:idPublicacion", (req, res) => {
    var fotoUrl = req.body.fotoUrl;
    var descripcion = req.body.descripcion;
    var idPublicacion = req.params.idPublicacion;

    if(fotoUrl === undefined || descripcion === undefined){
        res.status(400).json({
            "message": "Parametros invalido o incompletos"
        })
        return;
    }

    Publicacion.findOneAndUpdate({
        _id: idPublicacion 
    }, {
        fotoUrl: fotoUrl,
        descripcion: descripcion
    }, function(err, doc){
        if(err) {
            res.status(500).json({
                "message": "Error al ejecutar update"
            })
            console.error(err);
            return;
        }
        res.json(doc);
    });

});


router.delete("/:id", (req, res) => {
    var jsonId = req.params.id;

    Publicacion.findOneAndDelete({
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