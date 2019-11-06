require('dotenv').config()
const config = {
    MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
    MONGODB_CONNECTION_STRING_PRODUCTION: process.env.MONGODB_CONNECTION_STRING_PRODUCTION,
    PORT: process.env.PORT,
    BINDIND_IP: process.env.BINDIND_IP,
    TOKEN_SECRET: process.env.TOKEN_SECRET
}

module.exports = config