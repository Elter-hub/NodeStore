const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
mongoose.set('useFindAndModify', false);

db.mongoose = mongoose;
db.user = require('../models/User.model');

module.exports = db;
