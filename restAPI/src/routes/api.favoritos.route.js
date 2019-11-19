const express = require('express');
const router = express.Router();
const ListaFavorito = require('../dataaccess/model/ListaFavorito');
const mongoose = require('../dataaccess/MongoConnect');
const config = require("../config");