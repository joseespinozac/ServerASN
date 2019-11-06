const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
const Cuenta = require('./Cuenta');

router.post('/:id', function (req, res) {
    var toEmail = req.body.emailTo;
    var jsonId = req.params.id;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebaservice22@gmail.com',
            pass: 'userPrueba'
        }
    });

    Cuenta.findById({
        _id: jsonId
    }, function (err, docs) {
        if (err) {
            res.status(500).json({
                "mensaje": "Hubo un error al recuperar la Cuenta"
            })
            console.error(err);
            return;
        }

            var pin = docs.pin;
            var mailOptions = {
                from: 'pruebaservice22@gmail.com',
                to: toEmail,
                subject: 'Envio del pin',
                text: 'Correo de prueba de envio ' + pin 
            };

            transporter.sendMail(mailOptions, function (err, inf) {
                if (err) {
                    console.log(err);
                    res.send(500, err.message);

                } else {
                    console.log("Email sent");
                    res.status(200).jsonp(req.body);
                }
            });
    });
});

module.exports = router;