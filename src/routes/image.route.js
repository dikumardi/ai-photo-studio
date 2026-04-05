const express = require('express');
const uploadController = require('../controller/upload.controller');
const multer = require('multer');

const router = express.Router()

const upload = multer({storage:multer.memoryStorage()})

router.post('/',
    upload.single('image'),
    uploadController.uploadImageController)


module.exports = router

