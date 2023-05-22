const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./user");
dotenv.config();

mongoose.connect(
	`mongodb+srv://hionel:${process.env.MONGO_PASS}@mongotrials.ocypofw.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const getAllData = (req, res) => {};
const getSpecificData = (req, res) => {};

const postData = (req, res) => {
	const bodyData = req.body;
	const newItem = new User(bodyData);
	newItem
		.save()
		.then((item) => {
			console.log(item);
			res.status(200).send("Data inserted into MongoDB");
		})
		.catch((error) => {
			res.status(400).send(error);
		});
	fetchCountries;
};

const deleteData = (req, res) => {};
const deleteManyData = (req, res) => {};
const patchData = (req, res) => {};

router.get("/getAll", getAllData);
router.get("/getSpecificData", getSpecificData);
router.post("/postData", postData);
router.delete("/delete/:id", deleteData);
router.delete("/deleteMany/:name", deleteManyData);
router.patch("/update", patchData);

module.exports = router;
