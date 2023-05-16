const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const routers = express.Router();
app.use("/", routers);
app.use(express.json());

// Get
const getAllData = (req, res) => {
	if (!res) {
		return res.status(400).json({
			status: "Failed fetching the data",
		});
	}
	res.status(200).json({
		status: "Fetched data succesfully",
		data: data,
	});
};

// Get one user
const getSpecficData = (req, res) => {
	const itemId = Number(req.params.id);
	const specificData = data.find((el) => el.id === itemId);
	if (specificData === undefined) {
		return res.status(400).json({
			status: "Failed the get ",
			msg: "Item does not exist",
		});
	}

	res.status(200).json({
		status: "Fetched data succesfully",
		data: specificData,
	});
};

// Post
const postData = (req, res) => {
	const newId = Number(data[data.length - 1].id) + 1;
	const newData = {
		id: newId,
		...req.body,
	};
	data.push(newData);
	fs.writeFile("data.json", JSON.stringify(data), (error) => {
		if (error) {
			return res.status(400).json({
				status: "Failed posting data in the json file",
			});
		}
		res.status(200).json({
			status: "Data added succesfully",
			data: data,
		});
	});
};

// Patch
const patchData = (req, res) => {
	const itemId = Number(req.params.id);
	const editItem = data.find((el) => el.id === itemId);
	if (editItem === undefined) {
		return res.status(400).json({
			status: "Failed patching",
			msg: "Item does not exist",
		});
	}

	data[itemId] = { id: itemId, ...req.body };
	fs.writeFile("data.json", JSON.stringify(data), (error) => {
		if (error) {
			return res.status(400).json({
				status: "Patch failed",
				data: "No data modified",
			});
		}
		res.status(200).json({
			status: "Patched successfully",
			data: data,
		});
	});
};

// Delete
const deleteData = (req, res) => {
	const itemId = Number(req.params.id);
	const deleteItem = data.find((el) => el.id === itemId);
	const deleteItemIndex = data.findIndex((el) => el.id === itemId);
	if (deleteItem === undefined) {
		return res.status(400).json({
			status: "Failed patching",
			msg: "Item does not exist",
		});
	}

	data.splice(deleteItemIndex, 1);
	fs.writeFile("data.json", JSON.stringify(data), (error) => {
		if (error) {
			return res.status(400).json({
				status: "Delete failed",
				data: "No data modified",
			});
		}
		res.status(200).json({
			status: "Deleted successfully",
			data: data,
		});
	});
};

app.get("/", getAllData);
app.get("/:id", getSpecficData);
app.post("/", postData);
app.patch("/:id", patchData);
app.delete("/:id", deleteData);

// Listening on port
app.listen(port, (error) => {
	if (error) {
		return console.log("Server error:", error);
	}
	console.log("Server is listening on port:", port);
});
