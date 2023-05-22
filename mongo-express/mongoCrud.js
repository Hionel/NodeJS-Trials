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

const getFilteredDataWithLimit = async (
	dbParam,
	collectionParam,
	filter,
	limit
) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	let response = await collection.find(filter).limit(limit).toArray();
	return response;
};

const deleteOneDataEntry = async (dbParam, collectionParam, filter) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	return await collection.deleteOne(filter);
};

const deleteMany = async (dbParam, collectionParam, filter) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	return await collection.deleteMany(filter);
};

const updateOne = async (dbParam, collectionParam, query, newValues) => {
	const database = client.db(dbParam);
	const collection = database.collection(collectionParam);
	return await collection.updateOne(query, newValues);
};
module.exports = {
	insertOne,
	insertMany,
	getAllData,
	getFilteredData,
	getFilteredDataWithLimit,
	deleteOneDataEntry,
	deleteMany,
	updateOne,
};
