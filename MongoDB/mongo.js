const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://hionel:<password>@onel.d0j2ciy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	client.connect().then((client) => {
		client
			.db("admin")
			.command({ ping: 1 })
			.then(() => {
				console.log("Logged in");
			});
	});
	const db = client.db("Onel");
	const collection = db.collection("test");
	const me = {
		fullname: "Onel Horia",
		age: 24,
	};
	collection.insertOne(me).then((data) => {
		if (data.acknowledged === true) {
			console.log("Data inserted in db", data);
		} else {
			console.log("Data failed to add to db");
		}
	});
}

run().catch((error) => {
	console.log(error);
});
