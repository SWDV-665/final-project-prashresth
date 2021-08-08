const {getDb} = require('./mongo/mongoService')
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'posts'

async function getAll() {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        const data = await collection.find({}).sort({created: -1}).toArray();
        return {data: data};
    } catch (e) {
        console.log(e);
        return e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function getById(id) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        // mongo requires an ObjectID (see line 2 above)
        return await collection.find({"_id": ObjectID(id)}).toArray(); // this is for mongo created ids
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function createPost(post) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        // inset call to mongo collection
        return await collection.insertOne(post);
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

module.exports = {
    getAll,
    getById,
    createPost
};