const { v4: uuidv4 } = require("uuid");
const processAndSaveImage = require("../services/imageProcessor.service");
const changeOutfit = require("../services/outfitChange.service");
const generateBackground = require("../services/replaceBg.service");
const removeBackground = require("../services/removeBg.service");
const mergeImages = require("../services/merge.service");


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

    // Remove background (AI)
    const bgRemovedImage = await removeBackground(file.buffer);

    // Save
    const image = await processAndSaveImage(
      bgRemovedImage,
      file,
      imageName,
      "remove-bg"
    );

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

    if (!imageName || !prompt) {
      return res.status(400).json({ message: "imageName and prompt required" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Step 1: Remove BG
    const foreground = await removeBackground(file.buffer);

    // Step 2: Generate BG
    const background = await generateBackground(prompt);

    // Step 3: Merge
    const finalImage = await mergeImages(foreground, background);

    // Step 4: Save
    const image = await processAndSaveImage(
      finalImage,
      file,
      imageName,
      "replace-bg",
      prompt
    );

    res.status(201).json({
      message: "Background replaced successfully",
      image,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.outfitChangeController = async (req, res) => {
  try {
    const { imageName, prompt } = req.body;
    const file = req.file;

    if (!imageName || !prompt) {
      return res.status(400).json({ message: "imageName and prompt is required" });
    }

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Only images allowed" });
    }

    // AI Outfit Change
    const outfitImage = await changeOutfit(file.buffer, prompt);

    // Save
    const image = await processAndSaveImage(
      outfitImage,
      file,
      imageName,
      "outfit-change",
      prompt
    );

    res.status(201).json({
      message: "Outfit changed successfully",
      image,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

