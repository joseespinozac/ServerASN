const mongoose = require('../MongoConnect');
const Schema = mongoose.Schema;

var ReaccionSchema = new Schema({
    tipo: {
        required: true,
        type: String
    },
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
})

var Reaccion = mongoose.model('Reaccion', ReaccionSchema);
module.exports = Reaccion;