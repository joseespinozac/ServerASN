var jwt = require("jsonwebtoken")
const token_secret = "ultra secret string"

function OnlyAdminMW(req, res, next) {
    var token = req.headers["authorization"]
    if (!token) {
        res.status(401).json({
            "mensaje": "Token is needed"
        })
    }

    token = token.replace("Bearer ", "");

    jwt.verify(token, token_secret, function (err, payload) {
        if (err) {
            console.error(err);
            res.status(500).json({
                "mensaje": "Error al decodificar token"
            });

        } else {
            req.user = payload
            next()
        }
    });
}

module.exports = OnlyAdminMW