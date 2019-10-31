const express = require('express');
const router = express.Router();
const cuentaRouter = require("./api.cuenta.route");

router.use("/Cuenta", cuentaRouter);
router.get("/ping", (req, res) => {

    res.status(200).json({
        "ping": "pong"
    });
});

module.exports = router;