//import {IProductImage, IProductOption, IProductVariant} from "shopify-api-node";

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const _ = require("underscore");
const moment = require('moment-timezone');
moment.tz.link("Asia/Calcutta|Asia/Kolkata");
mongoose.set('useFindAndModify', false);
const {ExportToCsv} = require("export-to-csv");
var md5 = require('md5');
const Client = require('scp2');
const fs = require('fs');
const path = require('path');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


// Define a health check route
router.get('/health', (req, res) => {
    console.log("Database connection is healthy")
    res.status(200).send('Database connection is healthy');
});

module.exports = router;
