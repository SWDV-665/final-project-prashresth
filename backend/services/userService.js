const {getDb} = require('./mongo/mongoService')
const ObjectID = require('mongodb').ObjectID
const COLLECTION = 'users';

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

async function getByEmail(email) {
    email = email.toLowerCase()
    const clientAndDb = await getDb();
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        return await collection.find({"email": email}).toArray();
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function createUser(user) {
    // always use lowercase to make things easier!!
    user.email = user.email.toLowerCase();
    const clientAndDb = await getDb();
    console.log(user)
    try {
        const collection = clientAndDb.db.collection(COLLECTION);
        let exists = await collection.find({"email": user.email}).toArray();
        if (exists) {
            return new Error('A user exists with that email!')
        }
        // inset call to mongo collection
        return await collection.insertOne(user);
    } catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        // close conn
        await clientAndDb.client.close();
    }
}

async function deleteUser(id) {
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
    getAll, getById, getByEmail, createUser, deleteUser
};