const mongoose = require("../MongoConnect");
const Schema = mongoose.Schema;

var ChatGroupSchema = new Schema({
    members: [{
        member: {type: Schema.Types.ObjectId, ref: "Usuario"}
    }]
});

var ChatGroup = mongoose.model('ChatGroup', ChatGroupSchema);
module.exports = ChatGroup;