const express = require("express");
const countriesRouter = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Countries = require("./countries");
dotenv.config();

mongoose.connect(
	`mongodb+srv://hionel:${process.env.MONGO_PASS}@mongotrials.ocypofw.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
let fetchCountries = fetch("https://restcountries.com/v3.1/name/Romania").then(
	(response) => {
		if (!response.ok) {
			console.log("Error while fetching data");
		}
		return response.json();
	}
);
const postData = async (req, res) => {
	const data = await fetchCountries;
	console.log(data);
	const formattedData = new Countries({
		name: data[0].name.common,
		status: data[0].status,
		capital: [...data[0].capital],
	});
	formattedData
		.save()
		.then((response) => {
			res.status(200).send(response);
		})
		.catch((error) => {
			res.status(400).send(error);
		});
};
countriesRouter.post("/postCountries", postData);

module.exports = countriesRouter;
