const imageModel = require("../models/image.model");
const uploadFile = require("./storage.service");
const { v4: uuidv4 } = require("uuid");

async function processAndSaveImage(buffer, file, imageName, operationType, prompt = null) {
  try {
    // Upload to ImageKit
    const result = await uploadFile(
      buffer.toString("base64"),
      `${uuidv4()}-${file.originalname}`
    );

    // Save in DB
    const image = await imageModel.create({
      imageUrl: result.url,
      imageName,
      operationType,
      prompt
    });

    return image;

  } catch (error) {
    console.error("Save Error:", error.message);
    throw new Error("Image processing & saving failed");
  }
}

module.exports = processAndSaveImage;