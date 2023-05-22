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
const getLimit = (req, res) => {
	mongoCrud
		.getFilteredDataWithLimit("newDb", "products", {}, 2)
		.then((response) => {
			res.status(200).json({
				status: "Got data with limit from mongoDB",
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

const deleteData = (req, res) => {
	const id = Number(req.params.id);
	mongoCrud
		.deleteOneDataEntry("newDb", "products", { _id: id })
		.then((response) => {
			res.status(200).json({
				status: "Deleted one data entry from mongoDB",
				data: response,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

const deleteManyData = (req, res) => {
	const productName = req.params.name;
	console.log(productName);
	mongoCrud
		.deleteMany("newDb", "products", { productName: productName })
		.then((response) => {
			res.status(200).json({
				status: "Deleted many entries from mongoDB",
				data: response,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

const patchData = (req, res) => {
	let data = req.body;
	let query = data.query;
	console.log(query);
	let newValues = { $set: { productName: data.productName } };
	mongoCrud
		.updateOne("newDb", "products", query, newValues)
		.then((response) => {
			res.status(200).json({
				status: "Updated an entry from mongoDB",
				data: response,
			});
		})
		.catch((error) => {
			console.log(error);
			res.status(500).send(error);
		});
};

router.get("/getAll", getAllData);
router.get("/getSingle", getFiltered);
router.get("/getFilterLimit", getLimit);
router.post("/", postData);
router.delete("/delete/:id", deleteData);
router.delete("/deleteMany/:name", deleteManyData);
router.patch("/update", patchData);

module.exports = router;
