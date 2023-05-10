const http = require("http");
const fs = require("fs");
const port = 3000;
const path = require("path");

const server = http.createServer((req, res) => {
	const indexName = "index.html";
	const baseUrl = req.protocol + "://" + req.headers.host;
	const reqUrl = new URL(req.url, baseUrl);
	let searchParams = new URLSearchParams(reqUrl.searchParams);
	if (fs.existsSync(indexName)) {
		if (req.method === "POST") {
			try {
				res.writeHead(200, { "Content-Type": "application/json" });
				const formData = {
					fullname: searchParams.get("fullname"),
					age: searchParams.get("age"),
					rating: searchParams.get("rating"),
					additionalComments: searchParams.get("additionalComments"),
				};
				addRating(formData);
				res.end(JSON.stringify({ message: "Rating added successfully" }));
			} catch (error) {
				if (error) {
					res.writeHead(400, { "Content-Type": "application/json" });
					console.error("Posting data catched an error:", error);
					res.end(JSON.stringify({ error: "Post action failed" }));
				}
			}
		} else if (req.method === "GET") {
			if (req.url.match(/.css$/)) {
				const cssFilePath = "./css/style.css";
				const cssData = fs.readFileSync(cssFilePath, "utf-8");
				res.writeHead(200, { "Content-Type": "text/css" });
				res.write(cssData);
				res.end();
			}
			if (req.url.match(/.js$/)) {
				const jsFilePath = "./form.js";
				const jsData = fs.readFileSync(jsFilePath, "utf-8");
				res.writeHead(200, { "Content-Type": "text/javascript" });
				res.write(jsData);
				res.end();
			}
			if (!req.url.match(/.css$/) || !req.url.match(/.js$/)) {
				let output;
				const ratingsDir = "./ratings";
				let template = fs.readFileSync(indexName, "utf-8");
				if (!fs.existsSync(ratingsDir)) {
					res.end(JSON.stringify({ error: "No ratings to show" }));
				} else {
					const ratingsFiles = fs.readdirSync(ratingsDir, "utf-8");
					const data = ratingsFiles.map((ratingFile) => {
						const ratingFilePath = `${ratingsDir}/${ratingFile}`;
						const ratingFileData = JSON.parse(
							fs.readFileSync(ratingFilePath, "utf-8")
						);
						return ratingFileData;
					});
					output = displayRatings(template, data);
					res.write(output);
					res.end();
				}
			}
		} else {
			res.writeHead(405, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Method not allowed" }));
		}
	} else {
		res.writeHead(404, { "Content-Type": "text/html" });
		const errorHtmlData = fs.readFileSync("404.html", "utf-8");
		res.write(errorHtmlData);
		res.end();
	}
});

server.listen(port, (error) => {
	if (error) {
		console.error("Server error: ", error);
	} else {
		console.log("Server is listening on port:", port);
	}
});

const addRating = (formData) => {
	const { fullname, age, rating, additionalComments } = formData;
	if (fullname && age && rating && additionalComments) {
		const content = JSON.stringify(formData);
		const ratingsDir = "./ratings";
		if (!fs.existsSync(ratingsDir)) {
			console.log("Ratings directory does not exist. Creating now...");
			fs.mkdirSync(ratingsDir);
		}
		const newRating = `${fullname}-rating.json`;
		const filePath = `${ratingsDir}/${newRating}`;
		const ratingsFiles = fs.readdirSync(ratingsDir, "utf-8");
		if (ratingsFiles.includes(newRating)) {
			return console.error("Rating from this person already exists!");
		} else {
			fs.writeFile(filePath, content, (error) => {
				if (error) {
					console.error("Error while creating file!");
				} else {
					console.log("File has been written!");
				}
			});
		}
	} else {
		console.error("One of the fields is missing");
	}
};

const displayRatings = (template, data) => {
	const listTemplate = `<ul>
  ${data.map((el) => {
		return `<li>${el.fullname}, ${el.rating}</li>`;
	})}
  </ul>`;
	const output = template.replace(/{%RatingsList%}/g, listTemplate);
	return output;
};
