const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    foto_perfil: {
        required: false,
        type: String,
        trim: true
    },
    descripcion: {
        required: false,
        type: String,
        trim: true
    },
    cuentaAsociada:[{type: Schema.Types.ObjectId, ref: 'Cuenta'}]

});

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;