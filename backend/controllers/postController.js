const express = require('express');
const { getAll, getById, createPost } = require('../services/postService');
const { validatePost } = require('../validator/postValidator');
const app = express();
app.use(express.json());

const get = async function (req, res) {
    try {
        const docs = await getAll();
        res.status(200).send({
            data: docs.data
        });
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getItemById = async function (req, res) {
    try {
        // get by id call to mongo
        let data = await getById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "Post not found."});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const post = async function (req, res) {
    try {
        const { error } = validatePost(req.body);
        if (error) {
            console.log(error.details)
            return res.status(400).send(error.details);
        }
        // create call to mongo
        console.log(req.body)
        let date = new Date();
        req.body.created = date.toISOString();
        const created = await createPost(req.body);
        res.status(201).send(created.ops[0]);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

module.exports = {
    get,
    getItemById,
    post
}
