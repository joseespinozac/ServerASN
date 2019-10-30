const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

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
    }

})

var Cuenta = mongoose.model('Cuenta', CuentaSchema);
module.exports = Cuenta;