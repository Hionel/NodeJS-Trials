const client = require("./mongo");

const insertOne = async (data, dbParam, collectionParam) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	let response = await collection.insertOne(data);
	return response;
};

const insertMany = async (data, dbParam, collectionParam) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	let response = await collection.insertMany(data);
	return response;
};

const getAllData = async (dbParam, collectionParam) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	let response = await collection.find().toArray();
	return response;
};

const getFilteredData = async (
	dbParam,
	collectionParam,
	filter,
	sortingFilter
) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	let response = await collection.find(filter).sort(sortingFilter).toArray();
	return response;
};
module.exports = {
	insertOne,
	insertMany,
	getAllData,
	getFilteredData,
};
