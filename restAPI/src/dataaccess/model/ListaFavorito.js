const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ListaFavoritoSchema = new Schema({
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    favoritos: [{type: Schema.Types.ObjectId, ref: 'Publicacion'}]
});

var ListaFavorito = mongoose.model('ListaFavorita', ListaFavoritoSchema);
module.exports = ListaFavorito;