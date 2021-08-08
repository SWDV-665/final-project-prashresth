const express = require('express');
const multer = require('multer');
const dogRouter = express.Router();
const UPLOAD_PATH = './uploads';
const path = require('path');
const DogController = require('../controllers/dogController');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, UPLOAD_PATH);
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: function (req, file, cb) {
        console.log(req)
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now());
    }
});
let upload = multer({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
});

// all dog routes that call the dog controller
dogRouter.get('/', DogController.get)
dogRouter.get('/:id', DogController.getById)
dogRouter.get('/search/:id', DogController.searchDog)
// dogRouter.post('', DogController.post)
dogRouter.post('', upload.single('image'), DogController.post)
dogRouter.put('/:id', DogController.dogUpdate)
dogRouter.delete('/:id', DogController.dogDelete)

module.exports = dogRouter;
