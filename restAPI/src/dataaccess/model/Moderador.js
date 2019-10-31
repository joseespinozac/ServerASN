const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ModeradorSchema = new Schema({
    username: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

var Moderador = mongoose.model('Moderador', ModeradorSchema);
module.exports = Moderador;