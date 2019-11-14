const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var PublicacionSchema = new Schema({
    fotoUrl:{
        required: true,
        type: String,
        trim: true
    },
    fechaCarga:{
        required: true,
        type: Date,
        trim: true
    },
    descripcion:{
        required: true,
        type: String,
        trim: true
    },
    usuario: [{type: Schema.Types.ObjectId, ref: 'Usuario'}]
})

var Publicacion = mongoose.model('Publicacion', PublicacionSchema);
module.exports = Publicacion;