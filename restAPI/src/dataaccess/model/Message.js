const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message: {
        require: true,
        type: String
    },
    send: {
        require: true,
        type: Boolean
    },
    member: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    chatgroup: {type: Schema.Types.ObjectId, ref: 'ChatGroup'}
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;