const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.status(200).send(`<p>Darth Vader: Luke, I'am your father!</p>
  <p>Luke:NOOOOOoooooOOOOoooo....</p>
  `);
});

app.get("/users", (req, res) => {
	res.status(200).json({
		id: req.query.id,
		username: req.query.username,
	});
});

app.get("/api/name", (req, res) => {
	res.status(200).json({
		fullname: "Horia Onel",
	});
});

app.get("/students/number", (req, res) => {
	const number = Math.floor(Math.random() * 100);
	res.status(200).send(`${number}`);
});

app.post("/courses/n1ton2", (req, res) => {
	res.status(200).send(`${Math.floor(Math.random() * (2000 - 1000) + 1000)}`);
});

app.post("/", (req, res) => {
	res.status(200).send("Much Post");
});

app.listen(port, (error) => {
	if (error) {
		return console.log("Server error:", error);
	}
	console.log("Server is listening on port:", port);
});
