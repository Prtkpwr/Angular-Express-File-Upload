var mongoose = require("mongoose");
mongoose.connect('mongodb://test:qwerty123@ds241647.mlab.com:41647/temprature');
// create instance of Schema
var Schema = mongoose.Schema;
// create schema
var tempdata = {
    "ts": String,
    "val": String
};
var tempdata = new Schema({
    ts: String,
    val: String
}, { collection: 'tempdata' });

module.exports = mongoose.model('temprature', tempdata);