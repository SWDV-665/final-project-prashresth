const express = require('express');
const { getAll, getById, getByEmail,createUser, deleteUser } = require('../services/userService');
const { validateUser } = require('../validator/userValidator');
const app = express();
app.use(express.json());

const get = async function (req, res) {
    try {
        const docs = await getAll();
        // return an object with necessary
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).send({
            data: docs.data
        });
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getUserById = async function (req, res) {
    try {
        // get by id call to mongo
        let data = await getById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "User record not found."});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getUserByEmail = async function (req, res) {
    try {
        let email = req.query.email;
        let data = await getByEmail(decodeURIComponent(email));
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "User record not found."});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const post = async function (req, res) {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        // create call to mongo
        const created = await createUser(req.body);
        res.status(201).send(created.ops[0]);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const userDelete = async function (req, res) {
    try {
        // check to see if re exists
        const data = await getById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({ status: 404, message: 'User does not exist.' });
        }
        // delete call to mongo
        await deleteUser(req.params.id);
        res.status(200).send({
            status: 200,
            message: `User: ${data[0].name} deleted successfully!`});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

module.exports = {
    get,
    getUserById,
    getUserByEmail,
    post,
    userDelete
}
