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
let fetchCountries = fetch("	https://api.first.org/data/v1/countries").then(
	(response) => {
		console.log(response.ok);
		console.log(response.status);
		if (!response.ok) {
			console.log("Error while fetching data");
		}
		return response.json();
	}
);
const postData = async (req, res) => {
	const countriesAPI = await fetchCountries;
	for (let data of Object.values(countriesAPI.data)) {
		const formattedData = new Countries({
			country: data.country,
			region: data.region,
		});
		formattedData
			.save()
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				return res.status(400).send(error.message);
			});
	}
	res.status(200).send("Succesfully inserted all api data in mongo");
};
countriesRouter.post("/postCountries", postData);

module.exports = countriesRouter;
