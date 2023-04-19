const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("blood");
}

function getdb() {
  if (!database) {
    throw { message: "database not conected!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getdb: getdb,
};
