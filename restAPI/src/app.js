const express = require('express');
const app = express();
const apiRoute = require("./routes/api.route");
const bodyParser = require("body-parser");
const config = require("./config");

app.use(bodyParser.json({limit: '10mb'}));
app.use("/api", apiRoute);

app.listen(config.PORT, config.BINDIND_IP, function() {
    console.log("App listening on " + config.BINDIND_IP + " at " + config.PORT + "!");
})