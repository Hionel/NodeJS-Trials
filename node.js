var fs = require("fs");
var path = require("path");
var http = require("http");
try {
	let data = readFileSync("a2.txt", "utf-8");
	console.log(data);
	return data;
} catch (error) {
	console.log("Nu am gasit fisierul");
	console.log(error);
}

var stats = fs.statSync(filePath);

if (stats.isFile()) {
	fs.readFile(filePath, "utf-8", (error, contents) => {
		console.log(contents);
	});
}

let content = "This is my content";
fs.writeFileSync("b.txt", content.trim());
fs.writeFile(filePath, content, (error) => {
	if (error) {
		console.log("Error!");
	} else {
		console.log("File has been written");
	}
});

fs.appendFile(filePath, "I am adding text to the file", (error) => {
	if (error) {
		console.log("Error!");
	} else {
		console.log("File has been over-written");
	}
});

let myName = "Horia";
let nameFilePath = path.join(__dirname, "name.txt");
// fs.writeFileSync("name.txt", myName);
fs.readFile(nameFilePath, "utf-8", (error, content) => {
	if (error) {
		console.log("Got an Error");
	} else {
		console.log("Great success this is the contet: ", content);
	}
});

fs.renameSync("a.txt", "x.txt");

// fs.unlinkSync("x.txt");
try {
	fs.unlink("b.txt", () => {});
} catch {}

if (!fs.existsSync("horiaDir")) {
	fs.mkdir("horiaDir", (error) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Created a directory");
		}
	});
} else {
	console.log("Dir already exists!");
}

let files = fs.readdirSync("./lib");
console.log(files);
files.forEach((file) => {
	let filePath = path.join(__dirname, "lib", file);
	fs.readFile(filePath, "utf-8", (error, content) => {
		if (error) {
			console.log("Error while reading content", error);
		} else {
			console.log(`Reading content from ${file} : ${content}`);
		}
	});
});

fs.rmdir("./horiaDir", (error) => {
	if (error) {
		console.log("Erorr deleting directory", error);
	} else {
		console.log("Deleted directory succsesfully");
	}
});

let dir = fs.readdirSync("./lib", "utf-8");
console.log(dir);
dir.forEach((file) => {
	let filePath = path.join(__dirname, "lib", `${file}`);
	fs.unlink(filePath, (error) => {
		if (error) {
			console.log("Erorr deleting files");
		} else {
			console.log(`Deleted file succssefully: ${file}`);
		}
	});
});
if (fs.readdirSync("./lib", "utf-8").length < 1) {
	fs.rmdirSync("./lib");
}

// http
// 	.createServer((req, res) => {
// 		fs.readFile("testServer.html", (err, content) => {
// 			res.writeHead(200, { "content-Type": "text/html" });
// 			res.write(content);
// 			res.end();
// 		});
// 	})
// 	.listen(3000);
