const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;
const Usuario = require("./Usuario");

var CuentaSchema = new Schema({
    nombre:{
        required: true,
        type: String,
        trim: true
    },
    apellido:{
        required: true,
        type: String,
        trim: true
    },
    usuario:{
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    correo:{
        required: true,
        type: String,
        trim: true,
    },
    telefono:{
        required: true,
        type: String,
        trim: true,
    },
    password:{
        required: true,
        type: String
    },
    isVerified:{
        required: true,
        type: Boolean
    },
    pin:{
        required: true,
        type: String
    },
    usuarioAsociado: {type: Schema.Types.ObjectId, ref: 'Usuario'}

})

var Cuenta = mongoose.model('Cuenta', CuentaSchema);
module.exports = Cuenta;