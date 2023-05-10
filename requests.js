var fs = require("fs");
var path = require("path");
var http = require("http");
var url = require("url");

http
	.createServer((req, res) => {
		const baseurl = req.protocol + "://" + req.headers.host;
		const reqUrl = new URL(req.url, baseurl);
		let searchParams = new URLSearchParams(reqUrl.searchParams);
		let path = reqUrl.pathname;
		let template = fs.readFileSync("test.html", "utf-8");

		if (path == "/") {
			res.writeHead(200, { Content_Type: "text/html" });
			res.end(template);
		} else if (req.url.match(/.css$/)) {
			let cssPath = "test.css";
			let css = fs.readFileSync(cssPath, "utf-8");
			res.writeHead(200, { "Content-Type": "text/css" });
			res.write(css);
			res.end();
		} else if (req.url.match(/.js$/)) {
			let jsPath = "./test.js";
			let js = fs.readFileSync(jsPath, "utf-8");
			res.writeHead(200, { "Content-Type": "text/javascript" });
			res.write(js);
			res.end();
		} else if (req.url.match(/.gif$/)) {
			let gifPath = "./ErrorHandelingHomework/assets/loadingGif.gif";
			let gif = fs.readFileSync(gifPath, null);
			res.writeHead(200, { "Content-Type": "image/*" });
			res.write(gif);
			res.end();
		}
	})
	.listen(3001);

function ReplaceData(template, data) {
	console.log(data.title);

	let output = template.replace(/{%Title%}/g, data.title);
	output = output.replace(/{%Description%}/g, data.description);
	output = output.replace(/{%Image%}/g, data.image);
	return output;
}
