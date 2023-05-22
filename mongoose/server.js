const express = require("express");
const router = require("./routes");
const practiceCountries = require("./countriesPractice");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", router);
app.use("/practice", practiceCountries);

app.listen(port, (error) => {
	if (error) {
		return console.log(error);
	}
	return console.log(`Server listening on http://localhost:${port}`);
});
