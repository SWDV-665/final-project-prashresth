const express = require('express');
const { getAll, getAllPending, getPendingById, removePending, approveReview, deletePending } = require('../services/reviewService');
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

const getPending = async function (req, res) {
    try {
        const docs = await getAllPending();
        res.status(200).send({
            data: docs.data
        });
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const pendingGetById = async function (req, res) {
    try {
        // get by id call to mongo
        let data = await getPendingById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "Item not found."});
        }
        res.status(200).send({data: data});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const pendingDelete = async function (req, res) {
    try {
        // delete call to mongo
        await deletePending(req.params.id);
        res.status(200).send({
            status: 200,
            message: `Item deleted successfully!`});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const pendingApprove = async function (req, res) {
    try {
        let date = new Date();
        // get by id call to mongo
        let data = await getPendingById(req.params.id);
        if (data.length === 0) {
            return res.status(404).send({code:404, message: "Item not found."});
        }
        let reviewToApprove = data[0];
        delete reviewToApprove.isPending;
        delete reviewToApprove._id;
        delete reviewToApprove.created;
        reviewToApprove.registered = date.toISOString();
        let created = await approveReview(reviewToApprove);
        await removePending(req.params.id);
        res.status(201).send(created.ops[0]);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

module.exports = {
    get,
    getPending,
    pendingGetById,
    pendingDelete,
    pendingApprove
}
