const { getCollection } = require('../../services/db.service');
const collectionName = 'pdf';
const { ObjectId } = require('mongodb');


async function getById(id) {
    const collection = await getCollection(collectionName);
    try {
        const pdf = collection.findOne({ "_id": ObjectId(id) });
        return pdf;
    } catch (err) {
        console.log('ERROR: Cannot find PDF');
        throw err;
    }
}


async function save(pdf) {
    const collection = await getCollection(collectionName);
    try {
        pdf = { ...pdf, created: Date.now() };
        await collection.insertOne(pdf);
        return pdf;
    } catch (err) {
        console.log('ERROE: Cannot save PDF');
        throw err;
    }
}


// async function remove(id) {
//     const collection = await getCollection(collectionName);
//     const p
// }

module.exports = {
    getById,
    save
}