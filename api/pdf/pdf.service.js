const { getCollection } = require('../../services/db.service');
const { ObjectId } = require('mongodb');
const collectionName = 'pdf';


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
        if (!pdf._id) {
            // await remove();
            pdf = { ...pdf, created: Date.now(), edited: false };
            await collection.insertOne(pdf);
        } else if (!pdf.edited) {
            pdf._id = ObjectId(pdf._id);
            pdf.edited = true;
            await collection.replaceOne({ "_id": pdf._id }, pdf);
        }
        return pdf;
    } catch (err) {
        console.log('ERROE: Cannot save PDF');
        throw err;
    }
}


// async function remove() {
//     const collection = await getCollection(collectionName);
//     try {
//         const weekTimestamp = 604800000;
//         const weekAGo = Date.now() - weekTimestamp;
//         await collection.deleteMany({ "created": { $lt: weekAGo } })
//     } catch (err) {
//         console.log('ERROR: Cannot remove PDFs');
//         throw err;
//     }
// }

module.exports = {
    getById,
    save
}