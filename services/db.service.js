const { MongoClient } = require('mongodb');
const config = require('../config');
const dbName = 'digital-signature_db';

let dbConn = null;


async function getCollection(collectionName) {
    const db = await getDatabase();
    return db.collection(collectionName);
}

async function getDatabase() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        return dbConn = client.db(dbName)
    } catch (err) {
        console.log('Cannot connect to DB', err);
        throw err;
    }
}

module.exports = {
    getCollection
}