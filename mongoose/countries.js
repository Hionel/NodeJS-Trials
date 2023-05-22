const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CountriesSchema = new Schema({
	name: String,
	status: String,
	capital: [String],
});

module.exports = mongoose.model("Countries", CountriesSchema);
