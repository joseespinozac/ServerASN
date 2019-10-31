const express = require('express');
const router = express.Router();
const moderador = require("../dataaccess/model/Moderador");

router.get("/", (req, res) => {
    moderador.find(function (err, docs) {
        if (err) {
            res.status(500).json({
                "mensaje": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            return;
        }

        res.json(docs);
    });
});

router.post("/", (req, res) => {
    //recuperar las variables del cuerpo de la peticion
    var username = req.body.username
    var password = req.body.password

    //verificar que existan
    if (username == undefined || password == undefined) {
        res.status(401).json({
            "mensage": "Invalid body parms"
        })
        return;
    }

    //Crear objeto moderador
    var moderador = new moderador({
        username: username,
        password: password
    });

    //ejecutamos guardar y verificamos el resultado
    moderador.save(function (err, docs) {
        if (err) {
            res.status(500).json({
                "mensaje": "Error al ejecutar save"
            })

            console.error(err);
            return;
        }

        res.json(docs);
    });
});


module.exports = router;