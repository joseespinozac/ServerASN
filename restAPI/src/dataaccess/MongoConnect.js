const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://jet23:zHnhqC3rCLiOIl44@asndb-wzeae.mongodb.net/asndb?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})

module.exports = mongoose;