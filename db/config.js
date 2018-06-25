let mongoose = require('mongoose');
require('dotenv').config();


let connection = mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ds143191.mlab.com:43191/git-tracker`)

module.exports = connection;