const express = require("express");
const router = express.Router();
let mongoCrud = require("./mongoCrud");

const getAllData = (req, res) => {
	mongoCrud
		.getAllData("newDb", "products")
		.then((response) => {
			res.status(200).json({
				status: "Got all data from mongoDB",
				data: response,
			});
		})
		.catch((error) => {
			res.status(500).send(error);
		});
};

const getFiltered = (req, res) => {
	mongoCrud
		.getFilteredData("newDb", "products", {}, { productName: -1 })
		.then((response) => {
			if (response.length === 1) {
				return res.status(200).json({
					status: "Got specific data from mongoDB",
					data: response,
				});
			} else if (response.length > 1) {
				return res.status(200).json({
					status: "Got data from mongoDB",
					data: response,
				});
			}
			return res.status(404).json({
				status: "No such data inside the mongoDB",
			});
		})
		.catch((error) => {
			res.status(500).send(error);
		});
};

const postData = (req, res) => {
	const data = req.body;

	if (data.length === undefined) {
		mongoCrud
			.insertOne(data, "newDb", "products")
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				console.log(error);
				res.status(500).send(error);
			});
	} else {
		mongoCrud
			.insertMany(data, "newDb", "products")
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((error) => {
				res.status(500).send(error);
			});
	}
};

const deleteData = (req, res) => {};

const patchData = (req, res) => {};

router.get("/getAll", getAllData);
router.get("/getSingle", getFiltered);
router.post("/", postData);
router.delete("/", deleteData);
router.patch("/", patchData);

module.exports = router;
