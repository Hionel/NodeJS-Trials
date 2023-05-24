const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");

let UserSchema = new Schema({
	fullname: {
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
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Users", UserSchema);
