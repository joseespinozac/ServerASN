const express = require('express');
const app = express();
const apiRoute = require("./routes/api.route");
const bodyParser = require("body-parser");
const config = require("./config");
const morgan = require('morgan');

app.use(bodyParser.json({limit: '10mb'}));

//app.use(morgan("dev"));
app.use("/api", apiRoute);

app.use('/public', express.static('uploads'));

app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT + "!");
})



module.exports = app;