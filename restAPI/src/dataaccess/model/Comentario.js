const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ComentarioSchema = new Schema({
    comentario: {
        required: true,
        type: String,
        trim: true
    },
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
})

var Comentario = mongoose.model('Comentario', ComentarioSchema);
module.exports = Comentario;