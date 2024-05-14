const axios = require('axios');
const _ = require('underscore');
const moment = require('moment-timezone');
moment.tz.link("Asia/Calcutta|Asia/Kolkata");
const NodeCache = require("node-cache");
//const db = require("../config/db");
const nodemailer = require("nodemailer");
const {error} = require('winston');
const shell = require("shelljs");
const crypto = require('crypto');
const fs = require('fs');


require('dotenv').config()


module.exports = {}
