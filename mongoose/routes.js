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

const getAllData = (req, res) => {
	User.find().then((data) => {
		res.status(200).send(data);
	});
};

const getSpecificData = (req, res) => {
	User.find({ _id: "646e30ffdd11c440480fa096" }).then((data) => {
		res.status(200).send(data);
	});
};

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
};

const deleteData = (req, res) => {
	let id = req.params.id;
	User.findByIdAndDelete(id).then((data) => {
		res.status(200).send(data);
	});
};
const deleteManyData = (req, res) => {};
const patchData = (req, res) => {
	const id = req.params.id;
	User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).then(
		(data) => {
			res.status(200).send(data);
		}
	);
};

const getQuery = (req, res) => {
	// Normal query
	let query = { ...req.query };
	const removeFields = ["page", "limit", "fields"];
	removeFields.forEach((el) => {
		delete query[el];
	});

	// advanced query

	let queryStringified = JSON.stringify(query);
	queryStringified = queryStringified.replace(
		/\b(get|gt|lt|lte)\b/g,
		(match) => `$${match}`
	);
	query = JSON.parse(queryStringified);
	User.find(query).then((data) => {
		res.status(200).send(data);
	});
};

const paginateData = (req, res) => {
	// Get page and limit from query params
	User.paginate({}, { page: 1, limit: 2 }).then((data) => {
		res.status(200).send(data);
	});
};

const agregateFunc = (req, res) => {
	User.aggregate([
		{
			$match: { job: "Prod" },
		},
		{
			$group: {
				_id: null,
				count: { $sum: 1 },
				avgAge: { $avg: "$age" },
				minAge: { $min: "$age" },
				maxAge: { $max: "$age" },
			},
		},
	]).then((data) => {
		res.status(200).send(data);
	});
};

router.get("/getAll", getAllData);
router.get("/getSpecificData", getSpecificData);
router.post("/postData", postData);
router.delete("/delete/:id", deleteData);
router.delete("/deleteMany/:name", deleteManyData);
router.patch("/update/:id", patchData);
router.get("/query", getQuery);
router.get("/paginate", paginateData);
router.get("/aggregate", agregateFunc);

module.exports = router;
