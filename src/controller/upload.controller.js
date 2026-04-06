const { v4: uuidv4 } = require("uuid");
const imageModel = require("../models/image.model");
const uploadFile = require("../services/storage.service");
const removeBackground = require("../services/removeBg.service");
const replaceBackground = require("../services/replaceBg.service");

exports.uploadImageController = async (req, res) => {
  try {
    const { imageName } = req.body;
    const file = req.file;
    if (!imageName) {
      return res.status(400).json({ message: "imageName is required" });
    }
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Only PNG/JPG allowed" });
    }
    // 🔥 STEP 1: Remove background
    const bgRemovedImage = await removeBackground(file.buffer);

    // 🔥 STEP 2: Upload to ImageKit
    const result = await uploadFile(
      bgRemovedImage.toString("base64"),
      `${uuidv4()}-${file.originalname}`,
    );

    // 🔥 STEP 3: Save in DB
    const image = await imageModel.create({
      imageUrl: result.url,
      imageName,
    });

    res.status(201).json({
      message: "Background removed successfully",
      image,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.replaceBgController = async (req, res) => {
  try {
    const { imageName, prompt } = req.body;
    const file = req.file;

    if (!imageName) {
      return res.status(400).json({ message: "imageName is required" });
    }

    if (!prompt) {
      return res.status(400).json({ message: "prompt is required" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Only images allowed" });
    }

    //  STEP 1: Replace background using Clipdrop
    const replacedImage = await replaceBackground(file.buffer, prompt);

    //  STEP 2: Upload to ImageKit
    const result = await uploadFile(
      replacedImage.toString("base64"),
      `${uuidv4()}-${file.originalname}`,
    );

    //  STEP 3: Save in DB
    const image = await imageModel.create({
      imageUrl: result.url,
      imageName,
    });

    //  Response
    res.status(201).json({
      message: "Background replaced successfully",
      image,
    });
  } catch (err) {
    console.error("Replace BG Error:", err.message);

    if (err.code === 11000) {
      return res.status(400).json({ message: "Image name already exists" });
    }

    res.status(500).json({ message: err.message });
  }
};
