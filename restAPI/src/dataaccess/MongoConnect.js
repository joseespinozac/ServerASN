const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/practicapp", {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})

module.exports = mongoose;