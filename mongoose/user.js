const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: {
		type: String,
		require: [true, "A user must have a name..."],
		trim: true,
		minLength: [5, "No names under 5 chars"],
		maxLength: [20, "No name over 20 chars"],
	},
	age: Number,
	job: String,
	dateHired: Date,
});

module.exports = mongoose.model("Users", UserSchema);
