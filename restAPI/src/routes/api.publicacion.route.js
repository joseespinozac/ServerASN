const express = require('express');
const router = express.Router();
const Publicacion = require("../dataaccess/model/Publicacion");

router.get("/", (req, res) => {
    Publicacion.find(function(err, docs){
        if(err){
            res.status(500).json({
                "message": "Hubo un error al ejecutar la consulta"
            })
            console.error(err);
            
        }
    });
})