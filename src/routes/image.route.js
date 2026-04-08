const express = require('express');
const uploadController = require('../controller/upload.controller');
const printLayoutController = require('../controller/print.controller');
const multer = require('multer');

const router = express.Router()

const upload = multer({storage:multer.memoryStorage(),
     limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

// Remove BG
router.post('/remove-bg',
    upload.single('image'),
    uploadController.uploadImageController)

    // Replace  BG
router.post('/replace-bg',
    upload.single('image'),
    uploadController.replaceBgController)

    //outfit change
    router.post(
  "/change-outfit",
  upload.single("image"),
  uploadController.outfitChangeController
);


router.post(
  "/print-layout",
  upload.array("images", 10),
  printLayoutController.printLayoutController
);

module.exports = router

