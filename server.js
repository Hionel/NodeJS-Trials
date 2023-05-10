var http = require("http");
var url = require("url");
var fs = require("fs");
http
	.createServer((req, res) => {
		const baseUrl = req.protocol + "://" + req.headers.host;
		const reqUrl = new URL(req.url, baseUrl);
		let searchParams = new URLSearchParams(reqUrl.searchParams);
		let path = reqUrl.pathname;
		let template = fs.readFileSync("index.html", "utf-8");

		// if (path == "/register") {
		// 	res.writeHead(200, { "Content-Type": "application/json" });
		// 	let userObject = {
		// 		email: searchParams.get("email"),
		// 		username: searchParams.get("username"),
		// 		password: searchParams.get("password"),
		// 	};
		// 	console.log(userObject);
		// 	fs.writeFileSync("userData.json", JSON.stringify(userObject));
		// 	res.end("Registration");
		// } else if (path == "/login") {
		// 	let loginData = {
		// 		username: searchParams.get("user"),
		// 		password: searchParams.get("password"),
		// 	};
		// 	const savedUserData = JSON.parse(
		// 		fs.readFileSync("userData.json", "utf-8")
		// 	);
		// 	if (
		// 		loginData.username === savedUserData.username &&
		// 		loginData.password === savedUserData.password
		// 	) {
		// 		res.end(loginData.username);
		// 	} else {
		// 		res.end("Login failed, no user found");
		// 	}
		// }
		if (path == "/api") {
			fs.readFile("data.json", "utf-8", (error, content) => {
				const productData = JSON.parse(content);
				const output = replaceData(template, productData);
				res.writeHead(200, { "Content-Type": "text/html" });
				res.end(output);
			});
		}

		if (req.method === "GET") {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end("Req is GET");
		} else if (req.method === "POST") {
			console.log(searchParams);
			res.writeHead(200, { "Content-Type": "application/json" });
			let player = {
				name: searchParams.get("Name"),
				email: searchParams.get("Email"),
				password: searchParams.get("Password"),
			};
			res.end(JSON.stringify(player));
		} else if (req.method === "DELETE") {
			res.writeHead(200, { "Content-Type": "text/html" });
			res.end("Req is DELETED");
		}
	})
	.listen(3000);

const replaceData = (template, data) => {
	let output = template.replace(/{%Title%}/g, data.title);
	output = output.replace(/{%Description%}/g, data.description);
	output = output.replace(/{%Image%}/g, data.image);
	return output;
};
