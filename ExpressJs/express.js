const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		data: data,
	});
});

app.post("/", (req, res) => {
	const newId = data[data.length - 1].id + 1;
	const newData = Object.assign(
		{
			id: newId,
		},
		req.body
	);
	data.push(newData);
	fs.writeFile("data.json", JSON.stringify(data), (error) => {
		if (error) {
			return res.status(400).json({
				status: "failed",
				data: "no data",
			});
		}
		res.status(201).json({
			status: "success",
			data: data,
		});
	});
});

app.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const requestedData = data.find((el) => el.id === id);
	if (requestedData === undefined) {
		return res.status(400).json({
			status: "fail",
			msg: "Does not exist",
		});
	}
	res.status(200).json({
		status: "success",
		data: requestedData,
	});
});

app.patch("/:id", (req, res) => {
	const id = Number(req.params.id);
	const requestedData = data.find((el) => el.id === id);
	if (requestedData === undefined) {
		return res.status(400).json({
			status: "fail",
			msg: "Does not exist",
		});
	}
	requestedData.productName = req.body.productName;
	requestedData.from = req.body.from;
	requestedData.image = req.body.image;
	data[id] = requestedData;
	fs.writeFile("data.json", JSON.stringify(data), (error) => {
		if (error) {
			return res.status(400).json({
				status: "patch failed",
				data: "no data modified",
			});
		}
		res.status(200).json({
			status: "patched successfully",
			data: data,
		});
	});
});

app.delete("/:id", (req, res) => {
	const deleteId = Number(req.params.id);
	const deleteObject = data.find((el) => el.id === deleteId);
	const index = data.findIndex((el) => el.id === deleteId);

	if (deleteObject === undefined) {
		return res.status(400).json({
			status: "Failed deleting the item",
			data: "No valid data selected",
		});
	}
	data.splice(index, 1);
	fs.writeFile("data.json", JSON.stringify(data), (error) => {
		if (error) {
			return res.status(400).json({
				status: "deletion failed",
				data: "no data modified",
			});
		}
		res.status(200).json({
			status: "deletion successfully",
			data: data,
		});
	});
});
// app.get("/users", (req, res) => {
// 	res.status(200).json({
// 		id: req.query.id,
// 		username: req.query.username,
// 	});
// });

// app.get("/api/name", (req, res) => {
// 	res.status(200).json({
// 		fullname: "Horia Onel",
// 	});
// });

// app.get("/students/number", (req, res) => {
// 	const number = Math.floor(Math.random() * 100);
// 	res.status(200).send(`${number}`);
// });

// app.post("/courses/n1ton2", (req, res) => {
// 	res.status(200).send(`${Math.floor(Math.random() * (2000 - 1000) + 1000)}`);
// });

// app.post("/", (req, res) => {
// 	res.status(200).send("Much Post");
// });

app.listen(port, (error) => {
	if (error) {
		return console.log("Server error:", error);
	}
	console.log("Server is listening on port:", port);
});
