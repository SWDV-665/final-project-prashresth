const {getDb} = require('./mongo/mongoService')
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'reviews'
const PENDING_COLLECTION = 'pendingReviews'

async function getAll() {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        const data = await collection.find({}).sort({registered: -1}).toArray();
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

async function getAllPending() {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(PENDING_COLLECTION);
        const data = await collection.find({isPending: true}).sort({created: -1}).toArray();
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

async function getPendingById(id) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(PENDING_COLLECTION);
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

async function removePending(id) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(PENDING_COLLECTION);
        // update the review to not pending
        return await collection.updateOne(
            {"_id": ObjectID(id)},
            {
                $set: {
                    isPending: false
                }
            }
        )
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function deletePending(id) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(PENDING_COLLECTION);
        // update the review to not pending
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


async function approveReview(review) {
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        // inset call to mongo collection
        return await collection.insertOne(review);
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
    getAllPending,
    getPendingById,
    removePending,
    approveReview,
    deletePending
};