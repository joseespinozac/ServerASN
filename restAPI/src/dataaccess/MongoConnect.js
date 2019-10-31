const mongoose = require("mongoose");
const config = require("../config");
mongoose.connect(config.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})

module.exports = mongoose;