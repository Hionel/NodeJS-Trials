const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
	"mongodb+srv://hionel:3iOtMMhv2AoijzFE@ngcommerce.yft8zvu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

module.exports = client;
