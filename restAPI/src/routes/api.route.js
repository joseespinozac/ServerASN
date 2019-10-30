const express = require('express');
const router = express.Router();
const cuentaRouter = require("./api.cuenta.route");

router.use("/Cuenta", cuentaRouter);

module.exports = router;