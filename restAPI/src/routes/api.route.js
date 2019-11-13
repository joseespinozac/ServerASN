const express = require('express');
const router = express.Router();
const cuentaRouter = require("./api.cuenta.route");
const usuarioRouter = require("./api.usuario.route");
//const emailCtrl = require("../dataaccess/model/email");
const config = require("../config");


//router.use("/email", emailCtrl);
router.use("/Cuenta", cuentaRouter);
router.use("/Usuario", usuarioRouter);
router.get("/ping", (req, res) => {

    res.status(200).json({
        "ping": "pong"
    });
});

module.exports = router;