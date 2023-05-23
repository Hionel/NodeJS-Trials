const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CountriesSchema = new Schema({
	country: String,
	region: String,
});

module.exports = mongoose.model("Countries", CountriesSchema);
