let fs = require("fs");
const dataJsonPath = "./data.json";
// fs.readFile(dataJsonPath, "utf-8", (error, data) => {
// 	if (error) {
// 		return "Error while reading the data.json file", error;
// 	}
// 	jsonData = JSON.parse(data);
// 	let product = "Ball";
// 	let exist = false;
// 	jsonData.forEach((el) => {
// 		if (product === el.productName) {
// 			exist = true;
// 		}
// 	});
// 	if (exist) {
// 		fs.writeFile("exists.json", "Ball exists", (err) => {
// 			if (err) {
// 				console.log(err);
// 			}
// 		});
// 	} else {
// 		fs.writeFile("exists.json", "No ball here", (err) => {
// 			if (err) {
// 				console.log(err);
// 			}
// 		});
// 	}
// });

// Read with promise
let readFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf-8", (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
};
// Write with Promise
let writeFile = (fileName, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, data, (error) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	});
};

// Calling the read and the write inside then syntax

readFile("data.json")
	.then((data) => {
		const parsedData = JSON.parse(data);
		for (const element of parsedData) {
			if (element.productName === "Ball") {
				return element.productName;
			} else {
				return false;
			}
		}
	})
	.then((productName) => {
		if (productName != false) {
			return writeFile("data1.json", `product: ${productName}`);
		} else {
			return writeFile("data1.json", `Product does not exist`);
		}
	})
	.then(() => {
		console.log("Data was saved");
	})
	.catch((error) => {
		console.log("Error encountered", error);
	});

// Calling the read and write funcs in an async function with try and catch
// let readingDataJSON = async () => {
// 	try {
// 		let productName = false;
// 		let data = await readFile("data.json");
// 		data = JSON.parse(data);
// 		for (let element of data) {
// 			if (element.productName == "Ball") {
// 				productName = element.productName;
// 			}
// 		}
// 		let answer = "";
// 		if (productName != false) {
// 			answer = await writeFile("data1.json", "Found the ball");
// 		} else {
// 			answer = await writeFile("data1.json", "Ball not found");
// 		}
// 		return answer;
// 	} catch (error) {
// 		console.log("Async func catched an error:", error);
// 	}
// };

// readingDataJSON()
// 	.then((x) => {
// 		console.log(x);
// 		console.log("Saved the data");
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});
