const {getDb} = require('./mongo/mongoService')
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'groceryItems'

async function getAll() {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        const data = await collection.find({}).toArray();
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

async function createItem(item) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        // inset call to mongo collection
        return await collection.insertOne(item);
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function updateItem(id, item) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        // updating the whole document.
        return await collection.findOneAndUpdate(
            {"_id": ObjectID(id)},
            {$set: item},
            {returnOriginal: false});
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function deleteItem(id) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        // delete record by id
        return await collection.deleteOne({"_id": ObjectID(id)});
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
    getAll, getById, createItem, updateItem, deleteItem
};