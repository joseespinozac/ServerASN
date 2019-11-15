const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var SolicitudSchema = new Schema({

    usuarioEnvia: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    usuarioRecibe: {type: Schema.Types.ObjectId, ref: 'Usuario'},

    estadoSolicitud: {
        required: true,
        type: String
    }
});

var Solicitud = mongoose.model('Solicitud', SolicitudSchema);
module.exports = Solicitud;